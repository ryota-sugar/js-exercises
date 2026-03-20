type Props = {
  onClose: () => void;
};

export default function PermissionDialog({ onClose }: Props) {
  return (
    <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm pointer-events-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-left">
        <h2 className="text-xl font-bold text-black mb-3 text-center">
          センサーの許可が必要です
        </h2>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">
          AR機能を利用して花粉の空間を見るには、端末のモーションセンサーへのアクセスが必要です。
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-sm text-gray-700">
          <p className="font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            Safariでの解決手順
          </p>
          <p className="text-xs mb-2 text-red-500 font-bold">
            ※一度キャンセルすると、データを消去するまで許可画面が再表示されません。
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs leading-relaxed">
            <li>
              iPhoneの<strong>「設定」</strong>アプリを開き、
              <strong>「アプリ」</strong> ＞<strong>「Safari」</strong>
              を選択します。
            </li>
            <li>
              画面下の<strong>「履歴とWebサイトデータ」</strong>項目の{' '}
              <strong>「履歴とWebサイトデータを消去」</strong>をタップします。
            </li>
            <li>
              削除期間を選択し、
              <strong>「履歴を消去」</strong>をタップします。
            </li>
            <li>
              再度このページを開き直し、開始時のポップアップで必ず
              <strong>「許可」</strong>を選択してください。
            </li>
          </ol>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
