type Props = {
  message: string;
};

export default function Loading({ message = '読み込み中...' }: Props) {
  return (
    <div className="absolute inset-0 z-50 bg-black/60 flex flex-col items-center justify-center backdrop-blur-sm pointer-events-auto">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-white font-bold text-sm drop-shadow-md">{message}</p>
    </div>
  );
}
