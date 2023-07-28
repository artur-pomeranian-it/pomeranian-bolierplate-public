import React, { useEffect, useState } from 'react';
import './styles.css';

/* 
wyświetl przycisk, który po kliknięciu wyrenderuje nam napis.
napis powinien zniknąć po 3 sekundach od pokazania się.
zaawansowane (opcjonalne) (opacity z czasem style inline) 
*/

const textContent = 'Teraz mnie widać';

export const VanishString = () => {
  const [text, setText] = useState('');
  function handleOnClick() {
    if (text.length === 0) {
      setText(textContent);
    } else {
      setText('');
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
        {text}
      </p>
    </div>
  );
};
