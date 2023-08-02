import { useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button, Output, Label, GameResults } from './Components';
import { GameBoard } from './Features/GameBoard';
import { formatTime } from './Utils';
import { MoleTimer } from './Features/MoleTimer';
import './styles.css';

const MINUTA = 10000;
const DURATIONS = [
  { label: '1 minuta', duration: MINUTA },
  { label: '2 minuty', duration: MINUTA * 2 },
  { label: '3 minuty', duration: MINUTA * 3 },
];

const MOLES = [
  { label: '1 kret', molesNo: 1, tiles: 10, timeVisible: 2000 },
  { label: '2 krety', molesNo: 2, tiles: 15, timeVisible: 1000 },
  { label: '3 krety', molesNo: 3, tiles: 20, timeVisible: 1000 },
];

function getInitialTiles(tilesNo) {
  return new Array(tilesNo).fill(0).map((_, index) => ({ index }));
}

export const HitTheMoleGame = () => {
  const [status, setStatus] = useState('notStarted');
  const [duration, setDuration] = useState();
  const [moleOption, setMoleOption] = useState();

  const [score, setScore] = useState();
  const [tiles, setTiles] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  function startGame() {
    if (duration && moleOption) {
      setStatus('started');
      setShowWarning(false);
      setTiles(getInitialTiles(moleOption.tiles));
      setScore(0);
    } else {
      setShowWarning(true);
    }
  }

  function finish() {
    setStatus('finished');
  }

  return (
    <div>
      <MasterHeader value="Kret" />
      <p>
        Gra polegająca na podążaniu za krecikiem i trafieniu na kwadrat, w
        którym się pojawił.
      </p>
      {showWarning && (
        <p className="mole__warning">
          Wybierz czas gry oraz liczbę kretów, żeby zacząć grę{' '}
        </p>
      )}
      {status === 'finished' && (
        <GameResults score={score} duration={formatTime(duration)} />
      )}

      {status !== 'started' && (
        <>
          <div className="mole__row-container">
            <Label>CZAS GRY</Label>
            {DURATIONS.map((item) => (
              <Button
                key={item.label}
                value={item.label}
                variant={item.duration === duration ? 'secondary' : 'primary'}
                onClick={() => setDuration(item.duration)}
              />
            ))}
          </div>

          <div className="mole__row-container">
            <Label>LICZBA KRETÓW</Label>
            {MOLES.map((item) => (
              <Button
                key={item.label}
                value={item.label}
                variant={
                  moleOption && item.molesNo === moleOption.molesNo
                    ? 'secondary'
                    : 'primary'
                }
                onClick={() => setMoleOption(item)}
              />
            ))}
          </div>

          <div className="mole__row-container">
            <Label>PRZYCISKI STERUJĄCE</Label>
            <Button value="START" variant="primary" onClick={startGame} />
          </div>
        </>
      )}

      {status === 'started' && (
        <>
          <MoleTimer duration={duration} finish={finish} />
          <div className="mole__row-container">
            <Label>WYNIK</Label>
            <Output value={score} />
          </div>
          <div className="mole__row-container">
            <Label>PRZYCISKI STERUJĄCE</Label>
            <Button
              value="STOP"
              variant="tertiary"
              onClick={() => setStatus('notStarted')}
            />
          </div>
        </>
      )}

      {status === 'started' && (
        <GameBoard setScore={setScore} tiles={tiles} moleOption={moleOption} />
      )}
    </div>
  );
};
