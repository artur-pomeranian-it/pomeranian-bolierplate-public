import React, { useState } from 'react';

import './style.css';

export function Block9Excercise1() {
  const [clicks, setClicks] = useState(0);
  const [text, setText] = useState('start');

  function handleClick(event) {
    if (clicks < 5) {
      setClicks(clicks + 1);
      setText(`kliknięto ${clicks}`);
    } else {
      setText(`gratulacje wyklikałeś przycisk`);
    }
  }

  return (
    <div className="block-9-excercise-1">
      <div className="wrapper">
        <h1 className="h1">Cześć!</h1>
        <button type="submit" className="button" onClick={handleClick}>
          {text}
        </button>
      </div>
    </div>
  );
}
