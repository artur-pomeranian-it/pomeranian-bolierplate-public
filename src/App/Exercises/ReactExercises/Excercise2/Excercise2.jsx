import React, { useState } from 'react';

import './style.css';

export function Excercise2() {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  function handleClick(event) {
    setCount(count + 1);
  }

  return (
    <div className="excercise-2">
      <h1 className="h1">Cześć!</h1>
      <button className="button" onClick={handleClick}>
        kliknięto we mnie {count} razy
      </button>
    </div>
  );
}
