import React, { useState } from 'react';

import './style.css';

export function Block9Excercise5() {
  const [random, setRandom] = useState();
  const [inputText, setInputText] = useState('');
  const [buttonText, setButtonText] = useState('Start');
  const [placeholderText, setPlaceholderText] = useState('');

  function handleChange(event) {
    const text = event.target.value;
    setInputText(text);

    if (!random) {
      setPlaceholderText('Kliknij START aby rozpocząć');
      return;
    }
    const number = parseInt(text);
    if (number === random) {
      setPlaceholderText('Gratulacje trafiłaś/eś!');
    } else {
      if (number > random) {
        setPlaceholderText('Jestem mniejsza');
      } else {
        setPlaceholderText('Jestem większa');
      }
    }
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function handleStartClick(event) {
    if (!random) {
      const randomNumber = generateRandomNumber();
      console.log('Wylosowana liczba to:', randomNumber);
      setRandom(randomNumber);
      setButtonText('Wpisz liczbę poniżej');
    }
  }

  function handleResetClick(event) {
    setRandom(undefined);
    setButtonText('Start');
    setPlaceholderText('');
  }

  return (
    <div className="block-9-excercise-5">
      <div className="wrapper">
        <h1 className="h1">Jaką jestem liczbą? (1-100)</h1>
        <button
          type="button"
          className="button button--primary"
          onClick={handleStartClick}
        >
          {buttonText}
        </button>

        <input
          className="input"
          type="number"
          name="userAnswer"
          id="userAnswer"
          min="1"
          max="100"
          onChange={handleChange}
          value={inputText}
        />

        <button
          type="button"
          className="button button--reset"
          onClick={handleResetClick}
        >
          reset
        </button>
        <div className="placeholder">{placeholderText}</div>
      </div>
    </div>
  );
}
