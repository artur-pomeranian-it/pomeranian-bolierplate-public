import { useEffect, useState } from 'react';
import './styles.css';

/* 
wyświetl timer na stronie (np. "0 sec"), którego początkowym stanem będzie 0.
stwórz przycisk stop/start i restart (żeby timer wrócił do 0).
*/

const defaultTime = 0;

export const Timer = () => {
  const [timer, setTimer] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);

  function handleOnClick() {
    setIsRunning(!isRunning);
  }

  function handleReset() {
    setTimer(defaultTime);
    // optional
    setIsRunning(false);
  }

  function useEffectCallback() {
    if (!isRunning) return;
    function increment() {
      setTimer(function (currentTimer) {
        return currentTimer + 1;
      });
    }
    const intervalId = setInterval(increment, 1000);
    return function () {
      clearInterval(intervalId);
    };
  }

  useEffect(useEffectCallback, [isRunning]);

  return (
    <div>
      <h1>Licznik</h1>
      <p>{timer} sec</p>
      <button onClick={handleOnClick}>{isRunning ? 'Stop' : 'Start'}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};
