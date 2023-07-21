import { useState, useEffect } from 'react';
import './styles.css';

/*
  StrictMode renders components twice (on dev but not production)
  in order to detect any problems with your code
  and warn you about them (which can be quite useful).
*/

export const SetTimeout = () => {
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(0);

  function toJestUseEffectCallback() {
    console.log('Wartość value zmieniła się?', value);
    function toJestTimeoutCallback() {
      // to do
      console.log('Zwiększam rozmiar Power Bar');
      setProgress(value);
    }
    const timeoutId = setTimeout(toJestTimeoutCallback, 3000);
    function cleanup() {
      console.log('Sprzątać, ale jak?');
      clearTimeout(timeoutId);
    }
    return cleanup;
  }

  function handleOnClick() {
    setValue(value + 5);
  }

  useEffect(toJestUseEffectCallback, [value]);

  console.log('Będę pierwszy', value);
  return (
    <div>
      <h1>useEffect, setTimeout, setInterval</h1>
      <p>value = {value}</p>

      <button type="button" onClick={handleOnClick}>
        Dodaj
      </button>
      <div style={{ backgroundColor: 'red', width: progress }}>Power bar</div>
    </div>
  );
};
