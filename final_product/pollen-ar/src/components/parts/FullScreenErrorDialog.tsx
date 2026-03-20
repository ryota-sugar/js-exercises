type Props = {
  title: string;
  message: string;
  onBack: () => void;
};

export default function FullScreenErrorDialog({
  title,
  message,
  onBack,
}: Props) {
  return (
    <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm pointer-events-auto">
      <div className="bg-white p-6 rounded-2xl max-w-sm shadow-2xl w-full">
        <h2 className="text-xl font-bold text-black-600 mb-3">{title}</h2>
        <p className="text-gray-700 text-sm mb-6 leading-relaxed">{message}</p>
        <button
          onClick={onBack}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-700 w-full transition-colors"
        >
          トップ画面へ戻る
        </button>
      </div>
    </div>
  );
}
