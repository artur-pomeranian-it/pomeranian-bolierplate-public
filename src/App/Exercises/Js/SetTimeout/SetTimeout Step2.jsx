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
    // don't do this at home
    // setValue(value + 1);
    setProgress(value);
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
        Dodaj + 5
      </button>
      <div style={{ backgroundColor: 'red', width: progress }}>Power bar</div>
    </div>
  );
};
