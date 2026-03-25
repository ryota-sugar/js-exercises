import DigitalClock from '../parts/DigitalClock';
import StartARButton from '../parts/StartARButton';

type Props = {
  onStart: () => void;
};

export default function TitleScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-blue-50 p-5 text-center">
      <div className="absolute top-10">
        <DigitalClock />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        🤧 花粉チェッカー 🤧 <br />
      </h1>
      <p className="text-base text-gray-600 mb-8 leading-relaxed">
        スマホをかざして、
        <br />
        目の前の花粉を可視化します。
      </p>
      <StartARButton onStart={onStart} />
    </div>
  );
}
