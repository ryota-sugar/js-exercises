import { POLLEN_TYPES } from '../../constants/PollenInfo';
import type { ApiData, Settings } from '../../types/Type';

type Props = {
  apiData: ApiData;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  onClose: () => void;
};
export default function SettingDialog({
  apiData,
  settings,
  setSettings,
  onClose,
}: Props) {
  return (
    <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center pointer-events-auto p-4">
      <div className="bg-gray-900 border border-gray-700 p-6 rounded-2xl w-full max-w-sm text-white shadow-2xl">
        <h2 className="text-xl font-bold mb-4">表示設定</h2>

        <div className="bg-gray-800 p-3 rounded-lg text-sm mb-6 text-gray-300">
          {apiData.status}
        </div>
        <div className="mb-6">
          <div className="mb-2 text-sm text-gray-400">表示する花粉</div>
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() =>
                setSettings({ ...settings, pollenType: POLLEN_TYPES.SUGI })
              }
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${settings.pollenType === POLLEN_TYPES.SUGI ? 'bg-yellow-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              スギのみ
            </button>
            <button
              onClick={() =>
                setSettings({ ...settings, pollenType: POLLEN_TYPES.BOTH })
              }
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${settings.pollenType === POLLEN_TYPES.BOTH ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              両方
            </button>
            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  pollenType: POLLEN_TYPES.HINOKI,
                })
              }
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${settings.pollenType === POLLEN_TYPES.HINOKI ? 'bg-orange-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
            >
              ヒノキのみ
            </button>
          </div>
        </div>

        <label className="flex items-center space-x-3 mb-4 cursor-pointer border-t border-gray-700 pt-4">
          <input
            type="checkbox"
            checked={settings.isDemo}
            onChange={(e) =>
              setSettings({
                ...settings,
                isDemo: e.target.checked,
              })
            }
            className="w-5 h-5 rounded text-blue-500"
          />
          <span className="font-bold">デモモードを有効にする</span>
        </label>

        <div
          className={`mb-6 transition-opacity ${
            settings.isDemo ? 'opacity-100' : 'opacity-50 pointer-events-none'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">スギ花粉レベル</span>
            <span className="font-bold text-yellow-400">
              Lv {settings.demoLevelSugi}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={settings.demoLevelSugi}
            onChange={(e) =>
              setSettings({
                ...settings,
                demoLevelSugi: parseInt(e.target.value),
              })
            }
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
        </div>

        <div
          className={`mb-6 transition-opacity ${
            settings.isDemo ? 'opacity-100' : 'opacity-50 pointer-events-none'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">ヒノキ花粉レベル</span>
            <span className="font-bold text-orange-400">
              Lv {settings.demoLevelHinoki}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={settings.demoLevelHinoki}
            onChange={(e) =>
              setSettings({
                ...settings,
                demoLevelHinoki: parseInt(e.target.value),
              })
            }
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-bold"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
