import { useState } from 'react';
import { MasterHeader } from '../Components/MasterHeader/MasterHeader';
import './styles.css';

export function Settings() {
  const smallFontSize = 12;
  const defaultFontSize = 16;
  const largeFontSize = 24;
  const [rootFontSize, setRootFontSize] = useState(defaultFontSize); // Initial root font size in pixels

  const setFontSize = (font) => {
    setRootFontSize(font);
    document.documentElement.style.fontSize = `${rootFontSize}px`;
  };
  return (
    <form className="settings">
      <MasterHeader value="USTAWIENIA" />
      <p>Ustaw rozmiar fontu zgodnie z Twoimi potrzebami oraz preferencjami.</p>
      <fieldset>
        <legend>Wybierz rozmiar fontu:</legend>
        <label onClick={() => setFontSize(smallFontSize)}>
          <input type="radio" name="font-size" id="small" />
          font size - small
        </label>
        <label onClick={() => setFontSize(defaultFontSize)}>
          <input type="radio" name="font-size" id="medium" />
          font size - medium
        </label>
        <label onClick={() => setFontSize(largeFontSize)}>
          <input type="radio" name="font-size" id="large" />
          font size - large
        </label>
      </fieldset>
    </form>
  );
}
