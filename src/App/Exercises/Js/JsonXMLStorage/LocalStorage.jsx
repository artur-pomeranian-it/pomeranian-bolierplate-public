import { useState } from 'react';

export function LocalStorage() {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleReset = () => {
    setCounter(0);
  };

  return (
    <div>
      <h3>Local Storage example</h3>
      <button onClick={handleIncrement}>Increment</button>
      <br></br> <br></br>
      <button onClick={handleReset}>Reset</button>
      <p>count: {counter}</p>
    </div>
  );
}
