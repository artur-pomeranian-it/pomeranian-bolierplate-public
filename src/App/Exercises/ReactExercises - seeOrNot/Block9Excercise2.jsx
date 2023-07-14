import React, { useState } from 'react';

import './style.css';

export function Block9Excercise2() {
  const [display, setDisplay] = useState(false);
  const [buttonText, setButtonText] = useState('Pokaż');

  function handleClick(event) {
    if (!display) {
      setButtonText('ukryj');
    } else {
      setButtonText('Pokaż');
    }
    setDisplay(!display);
  }

  return (
    <div className="block-9-excercise-1">
      <div className="wrapper">
        <h1 className="h1">Cześć!</h1>
        <button type="submit" className="button" onClick={handleClick}>
          {buttonText}
        </button>
        <div className="placeholder">{display && <p>now you see me</p>}</div>
      </div>
    </div>
  );
}
