import React from 'react';

import './style.css';

export function Excercise3() {
  return (
    <div className="excercise-3">
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
          />
        </div>
        <button type="submit" className="button">
          kliknij
        </button>
      </div>
      <div className="placeholder">Placeholder</div>
    </div>
  );
}
