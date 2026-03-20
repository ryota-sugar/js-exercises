import { useState } from 'react';
import PermissionDialog from './PermissionDialog';

type Props = {
  onStart: () => void;
};

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

function hasRequestPermission(
  obj: typeof DeviceOrientationEvent,
): obj is DeviceOrientationEventWithPermission {
  return (
    typeof (obj as DeviceOrientationEventWithPermission).requestPermission ===
    'function'
  );
}

export default function StartARButton({ onStart }: Props) {
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const handleStartAR = async () => {
    // iOS向けのセンサー許可リクエスト
    const hasPermissionRequest = hasRequestPermission(DeviceOrientationEvent);

    if (hasPermissionRequest) {
      try {
        const requestPermission = (
          DeviceOrientationEvent as DeviceOrientationEventWithPermission
        ).requestPermission;
        if (!requestPermission) {
          onStart();
          return;
        }
        const permissionState = await requestPermission();
        if (permissionState === 'granted') {
          onStart();
          return;
        }
        setShowPermissionDialog(true);
      } catch (error) {
        console.error('センサー許可エラー:', error);
        setShowPermissionDialog(true);
      }
    } else {
      // Androidではリクエストがないため直接開始
      onStart();
    }
  };
  return (
    <>
      <button
        onClick={handleStartAR}
        className="px-8 py-4 text-lg font-bold text-white bg-orange-500 rounded-full shadow-md hover:bg-orange-600 transition-colors"
      >
        カメラを起動して確認
      </button>
      {showPermissionDialog && (
        <PermissionDialog onClose={() => setShowPermissionDialog(false)} />
      )}
    </>
  );
}
