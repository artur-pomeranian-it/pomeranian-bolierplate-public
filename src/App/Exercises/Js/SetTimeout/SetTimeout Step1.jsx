import { useState, useEffect } from 'react';
import './styles.css';

/*
  StrictMode renders components twice (on dev but not production)
  in order to detect any problems with your code
  and warn you about them (which can be quite useful).
*/

export const SetTimeout = () => {
  const [value, setValue] = useState(0);

  function toJestUseEffectCallback() {
    console.log('Będę drugi');
    console.log('Wartość value zmieniła się?', value);
  }

  function handleOnClick() {
    setValue(value + 1);
  }

  useEffect(toJestUseEffectCallback, []);

  console.log('Będę pierwszy');
  return (
    <div>
      <h1>useEffect, setTimeout, setInterval</h1>
      <p>value = {value}</p>
      <button type="button" onClick={handleOnClick}>
        SetValue
      </button>
    </div>
  );
};
