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

  function handleOnClickToggle() {
    const intId = setInterval(() => {
      console.log('Dodaję używając setInterval', otherValue);
      // setOtherValue(otherValue + 1);
      setOtherValue((currentValue) => currentValue + 1);
    }, 1000);
    setIntervalId(intId);
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    console.log('Wartość value zmieniła się?', value);
    const timeoutId = setTimeout(() => {
      console.log('Zwiększam rozmiar Power Bar');
      setProgress(value);
    }, 3000);

    return () => {
      console.log('Sprzątać, ale jak?');
      clearTimeout(timeoutId);
    };
  }, [value, setProgress]);

  console.log('Będę pierwszy', value);
  return (
    <div>
      <h1>useEffect, setTimeout, setInterval</h1>
      <p>value = {value}</p>

      <button type="button" onClick={() => setValue(value + 5)}>
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
