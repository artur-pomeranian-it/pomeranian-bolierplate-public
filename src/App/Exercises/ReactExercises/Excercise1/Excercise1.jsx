import React, { useState } from 'react';

import './style.css';

export function Excercise1() {
  const defaultText = 'nie kliknięto we mnie';
  const [buttonText, setButtonText] = useState(defaultText);

  function handleClicked(event) {
    console.log('kliknieto', event);
    setButtonText('kliknięto we mnie');
  }

  return (
    <div className="excercise-1">
      <h1 className="h1">Cześć!</h1>
      <button className="button" onClick={handleClicked}>
        {buttonText}
      </button>
    </div>
  );
}
