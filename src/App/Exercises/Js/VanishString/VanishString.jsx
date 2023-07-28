import React, { useEffect, useState } from 'react';
import './styles.css';

/* 
wyświetl przycisk, który po kliknięciu wyrenderuje nam napis.
napis powinien zniknąć po 3 sekundach od pokazania się.
zaawansowane (opcjonalne) (opacity z czasem style inline) 
*/

const textContent = 'Teraz mnie widać';

export const VanishString = () => {
  const [textStyle, setTextStyle] = useState({
    opacity: 1,
    transition: '500ms',
  });

  function handleOnClick() {
    if (textStyle.opacity && textStyle.opacity === 1) {
      setTextStyle({ opacity: 0, transition: '500ms' });
    } else {
      setTextStyle({ opacity: 1, transition: '500ms' });
    }
  }
  function useEffectCallback() {}
  useEffect(useEffectCallback, []);
  return (
    <div>
      <h1>Ćwiczenie znikający tekst</h1>
      <button onClick={handleOnClick}>Toggle text</button>
      <p>
        <b>Result:</b>
        <span style={textStyle}>{textContent}</span>
      </p>
    </div>
  );
};
