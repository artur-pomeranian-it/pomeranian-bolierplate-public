import React, { useState } from 'react';

import './style.css';

export function Block9Excercise3() {
  const [inputText, setInputText] = useState('A');
  const [answer, setAnswer] = useState('Tak / Nie');

  function handleChange(event) {
    const text = event.target.value;
    setInputText(text);
    const number = parseInt(text, 10);
    const response = number > 10 ? 'Tak' : 'Nie';

    setAnswer(response);
  }

  return (
    <div className="block-9-excercise-3">
      <div className="wrapper">
        <h1 className="h1">Czy {inputText} jest większe od 10?</h1>
        <input
          className="input"
          type="text"
          name="text1"
          id="text1_id"
          placeholder="tekst do wpisania"
          onChange={handleChange}
          value={inputText}
        />
        <div className="placeholder">Odpowiedź: {answer}</div>
      </div>
    </div>
  );
}
