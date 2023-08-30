import { useState } from 'react';
import './styles.css';

export function sum(a, b) {
  return a + b;
}

export const handleOnClick = (isVisible, setIsVisible) => {
  setIsVisible(!isVisible);
};

export const Testing = () => {
  const [isVisible, setIsVisible] = useState(false);

  // console.log('jeden');

  // console.log('trzy');
  return (
    <div>
      <h1>Testing Jest </h1>
      <p>Funkcja sum wynik = {sum(2, 3)}</p>
      <button onClick={() => handleOnClick(isVisible, setIsVisible)}>
        Kliknij
      </button>
      <p>Visible or Not {isVisible && <span>Widać</span>}</p>
    </div>
  );
};
