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
  const [otherValue, setOtherValue] = useState(0);
  const [intervalId, setIntervalId] = useState();

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

  function handleOnClickToggle() {
    function toggleVisiblity() {
      console.log('Dodaję używając setInterval', otherValue);
      // setOtherValue(otherValue + 1);
      setOtherValue((currentValue) => currentValue + 1);
    }
    const intId = setInterval(toggleVisiblity, 1000);
    setIntervalId(intId);
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(toJestUseEffectCallback, [value, setProgress]);

  console.log('Będę pierwszy', value);
  return (
    <div>
      <h1>useEffect, setTimeout, setInterval</h1>
      <p>value = {value}</p>

      <button type="button" onClick={handleOnClick}>
        Dodaj
      </button>
      <br />
      <div style={{ backgroundColor: 'red', width: progress }}>Power bar</div>
      <button type="button" onClick={handleOnClickToggle}>
        Dodawaj
      </button>
      <div>Inkrementacja: {otherValue}</div>
    </div>
  );
};
