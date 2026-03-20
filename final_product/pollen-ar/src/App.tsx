import { useState } from 'react';
import TitleScreen from './components/screen/TitleScreen';
import ARScreen from './components/screen/ARScreen';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <>
      {!isStarted ? (
        <TitleScreen onStart={() => setIsStarted(true)} />
      ) : (
        <ARScreen onBack={() => setIsStarted(false)} />
      )}
    </>
  );
}
