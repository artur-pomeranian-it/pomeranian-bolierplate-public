import React, { useState } from 'react';

import './style.css';

export function Block9Excercise4() {
  const [inputTextA, setInputTextA] = useState('A');
  const [inputTextB, setInputTextB] = useState('B');
  const [answer, setAnswer] = useState('XX');

  function handleChangeA(event) {
    const text = event.target.value;
    setInputTextA(text);
    setABAnswer(text, inputTextB);
  }

  function handleChangeB(event) {
    const text = event.target.value;
    setInputTextB(text);
    setABAnswer(inputTextA, text);
  }

  function setABAnswer(textA, textB) {
    const numberA = parseInt(textA, 10);
    const numberB = parseInt(textB, 10);
    const response = numberA > numberB ? numberA : numberB;
    if (isNaN(response)) {
      setAnswer('Niepoprawne dane');
    } else {
      setAnswer(response + ' jest większe');
    }
  }

  return (
    <div className="block-9-excercise-3">
      <div className="wrapper">
        <h1 className="h1">
          Czy {inputTextA} jest większe od {inputTextB}?
        </h1>
        <input
          className="input"
          type="text"
          name="inputTextA"
          id="inputTextA"
          placeholder="tekst do wpisania"
          onChange={handleChangeA}
          value={inputTextA}
        />
        <input
          className="input"
          type="text"
          name="inputTextB"
          id="inputTextB"
          placeholder="tekst do wpisania"
          onChange={handleChangeB}
          value={inputTextB}
        />
        <div className="placeholder">Odpowiedź: {answer}</div>
      </div>
    </div>
  );
}
