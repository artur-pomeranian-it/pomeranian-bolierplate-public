import React, { useState } from 'react';

import './style.css';

export function Block9Excercise4() {
  const [inputText, setInputText] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');

  function handleChange(event) {
    setInputText(event.target.value);
  }

  function handleClick(event) {
    setPlaceholderText(placeholderText + ' ' + inputText);
    setInputText('');
  }

  return (
    <div className="block-9-excercise-1">
      <div className="wrapper">
        <h1 className="h1">Cześć!</h1>
        <div className="form" action="">
          <label className="label" htmlFor="text1_id">
            Wpisz tekst
          </label>
          <input
            className="input"
            type="text"
            name="text1"
            id="text1_id"
            placeholder="tekst do wpisania"
            onChange={handleChange}
            value={inputText}
          />
        </div>
        <button type="submit" className="button" onClick={handleClick}>
          kliknij
        </button>
      </div>
      <div className="placeholder">{placeholderText}</div>
    </div>
  );
}
