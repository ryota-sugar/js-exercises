import { useState, Suspense, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Canvas } from '@react-three/fiber';
import { DeviceOrientationControls } from '@react-three/drei';
import PollenParticles from '../parts/PollenParticles';
import DigitalClock from '../parts/DigitalClock';
import { POLLEN_TYPES } from '../../constants/PollenInfo';
import type { Settings } from '../../types/Type';
import SettingDialog from '../parts/SettingDialog';
import { usePollenCount } from '../../hooks/usePollenCount';
import usePollenData from '../../hooks/usePollenData';
import PollenIcon from '../parts/PollenIcon';
import FullScreenErrorDialog from '../parts/FullScreenErrorDialog';
import Loading from '../parts/Loading';

type Props = { onBack: () => void };

export default function ARScreen({ onBack }: Props) {
  const [showSettings, setShowSettings] = useState(false);
  const { apiData, isLoading, error: apiError } = usePollenData();
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({
    isDemo: false,
    demoLevelSugi: 3,
    demoLevelHinoki: 2,
    pollenType: POLLEN_TYPES.BOTH,
  });
  const { displaySugi, displayHinoki } = usePollenCount({ settings, apiData });
  const handleCameraError = useCallback((err: string | DOMException) => {
    console.error('camera error:', err);
    setCameraError(
      'カメラへのアクセスが拒否されました。ページを再読み込みしてください。',
    );
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {cameraError && (
        <FullScreenErrorDialog
          title="カメラの許可が必要です"
          message={cameraError}
          onBack={onBack}
        />
      )}
      {apiError && !cameraError && (
        <FullScreenErrorDialog
          title={apiError.type === 'location' ? '位置情報エラー' : '通信エラー'}
          message={apiError.message}
          onBack={onBack}
        />
      )}
      {isLoading && !apiError && !cameraError && (
        <Loading message="現在地の花粉データを取得中..." />
      )}
      <div className="absolute top-0 left-0 w-full h-full p-6 z-40 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start pointer-events-auto w-full">
          <button
            onClick={onBack}
            className="bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur shadow-md hover:bg-white/30 transition"
          >
            ← 戻る
          </button>
          <DigitalClock />
          <button
            onClick={() => setShowSettings(true)}
            className="bg-gray-800/80 text-white px-4 py-2 rounded-full backdrop-blur shadow-md border border-gray-600 hover:bg-gray-700 transition"
          >
            ⚙️ 設定
          </button>
        </div>

        <div className="flex justify-start items-end pointer-events-none w-full">
          <div className="bg-white/60 backdrop-blur-md border border-white/50 shadow-lg px-4 py-3 rounded-lg flex flex-col gap-2 pointer-events-none">
            {(settings.pollenType === POLLEN_TYPES.BOTH ||
              settings.pollenType === POLLEN_TYPES.SUGI) && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 -ml-1">
                  <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[2, 2, 2]} intensity={1} />
                    <PollenIcon modelPath="/sugi.glb" color="#eab308" />
                  </Canvas>
                </div>
                <span className="text-sm font-bold text-slate-800">スギ</span>
              </div>
            )}
            {(settings.pollenType === POLLEN_TYPES.BOTH ||
              settings.pollenType === POLLEN_TYPES.HINOKI) && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 -ml-1">
                  <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[2, 2, 2]} intensity={1} />
                    <PollenIcon modelPath="/hinoki.glb" color="#f97316" />
                  </Canvas>
                </div>
                <span className="text-sm font-bold text-slate-800">ヒノキ</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {showSettings && (
        <SettingDialog
          apiData={apiData}
          settings={settings}
          setSettings={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <Webcam
        videoConstraints={{ facingMode: 'environment' }}
        onUserMediaError={handleCameraError}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 0] }} gl={{ alpha: true }}>
          {/* スマホの向きに合わせて3Dのカメラ視点も動かすためのコントロール */}
          <DeviceOrientationControls />
          {/* 全体を均等に照らす環境光 */}
          <ambientLight intensity={1} />
          {/* ライトの配置を調整して、花粉のモデルがより立体的に見えるようにする(右上方向からの光にした) */}
          <directionalLight position={[10, 10, 10]} intensity={1.5} />

          <Suspense fallback={null}>
            <PollenParticles
              key={`${displaySugi}-${displayHinoki}`}
              sugiCount={displaySugi}
              hinokiCount={displayHinoki}
              windSpeed={apiData.speed}
              windDirection={apiData.direction}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
