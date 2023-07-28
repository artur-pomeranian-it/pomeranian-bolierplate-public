import { useEffect, useState } from 'react';
import './styles.css';

/* 
> stwórz baner, który będzie wyświetlał dowolny tekst.
> tekst powinien zmieniać swój stan (przykładowo 5 razy na sekundę)
   - a efektem zmiany stanu powinno być przesuwanie się napisu w lewo.
> dodajemy button który zatrzymuje oraz uruchamia animację
*/

const defaultText = 'I love JavaScript.   ';

export const SlidingBanner = () => {
  const [timer, setTimer] = useState(defaultText);
  const [isRunning, setIsRunning] = useState(false);

  function handleOnClick() {
    setIsRunning(!isRunning);
  }

  function handleReset() {
    setTimer(defaultText);
    // optional
    setIsRunning(false);
  }

  function useEffectCallback() {
    if (!isRunning) return;
    function increment() {
      setTimer(function (currentText) {
        const tablica = [...currentText];
        const firstCharacter = tablica.shift();
        tablica.push(firstCharacter);
        return tablica.join('');
      });
    }
    const intervalId = setInterval(increment, 200);
    return function () {
      clearInterval(intervalId);
    };
  }

  useEffect(useEffectCallback, [isRunning]);

  return (
    <div>
      <h1>Przesuwany baner</h1>
      <pre>{timer}</pre>
      <button onClick={handleOnClick}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button>
      <p>
        <img
          src="https://i.postimg.cc/vHFNx9MC/2023-05-11-16-
48-30.gif"
          alt="przykład"
          width={400}
        />
      </p>
    </div>
  );
};
