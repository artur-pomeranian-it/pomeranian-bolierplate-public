import { useEffect, useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button, Output, Label, GameResults, Tile } from './Components';
import './styles.css';

const MINUTA = 10000;
const DURATIONS = [
  { label: '1 minuta', duration: MINUTA },
  { label: '2 minuty', duration: MINUTA * 2 },
  { label: '3 minuty', duration: MINUTA * 3 },
];

const MOLES = [
  { label: '1 kret', molesNo: 1, tiles: 10, timeVisible: 1000 },
  { label: '2 krety', molesNo: 2, tiles: 15, timeVisible: 500 },
  { label: '3 krety', molesNo: 3, tiles: 20, timeVisible: 350 },
];

const HIGHLIGHT_TIME = 300;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function formatTime(time) {
  const timeInSeconds = Math.ceil(time / 1000);

  const m = Math.round(timeInSeconds / 60)
    .toString()
    .padStart(2, '0');

  const s = Math.round(timeInSeconds % 60)
    .toString()
    .padStart(2, '0');

  return `${m}:${s}`;
}

function getInitialTiles(tilesNo) {
  return new Array(tilesNo).fill(0).map((_, index) => ({ index }));
}

function getNewMolePosition(currentPosition, tilesNo) {
  while (true) {
    const newPosition = getRandomInt(tilesNo - 1);
    if (currentPosition !== newPosition) {
      return newPosition;
    }
  }
}

export const HitTheMoleGame = () => {
  const [status, setStatus] = useState('notStarted');
  const [duration, setDuration] = useState();
  const [prevDuration, setPrevDuration] = useState();
  const [moleOption, setMoleOption] = useState();
  const [timeLeft, setTimeLeft] = useState();
  const [score, setScore] = useState();
  const [tiles, setTiles] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [molePosition, setMolePosition] = useState();
  const [correct, setCorrect] = useState();
  const [incorrect, setIncorrect] = useState();

  function startGame() {
    if (duration && moleOption) {
      setStatus('started');
      setTimeLeft(duration);
      setShowWarning(false);
      setTiles(getInitialTiles(moleOption.tiles));
      setMolePosition(getNewMolePosition(molePosition, moleOption.tiles));
      setPrevDuration(duration);
      setScore(0);
    } else {
      setShowWarning(true);
    }
  }

  function decrementTimeBy(miliseconds) {
    setTimeLeft((prevTime) => prevTime - miliseconds);
  }

  useEffect(() => {
    let timeLeftIntervalId;
    if (status === 'started') {
      timeLeftIntervalId = setInterval(decrementTimeBy, 100, 100);
    } else {
      setMolePosition(undefined);
    }
    return () => {
      clearInterval(timeLeftIntervalId);
    };
  }, [status]);

  const handleClickOnTile = (index) => {
    if (molePosition === index) {
      setScore((currentScore) => currentScore + 1);
      setCorrect(index);
      setMolePosition(getNewMolePosition(index, moleOption.tiles));
    } else {
      setScore((currentScore) => currentScore - 1);
      setIncorrect(index);
    }
  };

  useEffect(() => {
    if (status === 'started' && timeLeft <= 0) {
      setStatus('finished');
      setDuration(undefined);
      setMoleOption(undefined);
    }
  }, [timeLeft, status]);

  useEffect(() => {
    let timeoutId;
    if (correct !== undefined) {
      timeoutId = setTimeout(() => setCorrect(undefined), HIGHLIGHT_TIME);
    }
    return () => clearTimeout(timeoutId);
  }, [correct]);

  useEffect(() => {
    let timeoutId;
    if (incorrect !== undefined) {
      timeoutId = setTimeout(() => setIncorrect(undefined), HIGHLIGHT_TIME);
    }
    return () => clearTimeout(timeoutId);
  }, [incorrect]);

  useEffect(() => {
    if (moleOption === undefined) return;
    let timeoutId;
    console.timeEnd(`mole-position`);
    console.time(`mole-position`);
    if (molePosition !== undefined) {
      timeoutId = setTimeout(() => {
        setMolePosition(getNewMolePosition(molePosition, moleOption.tiles));
      }, moleOption.timeVisible);
    }
    return () => clearTimeout(timeoutId);
  }, [molePosition, moleOption]);

  function getTileVariant(index) {
    if (index === correct) return 'correct';
    if (index === incorrect) return 'incorrect';
    return 'neutral';
  }

  function handleStopped() {
    setStatus('notStarted');
    setDuration(undefined);
    setMoleOption(undefined);
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
      <div>
        Status: {status}, duration: {duration}, molesNo{' '}
        {JSON.stringify(moleOption)}, tiles: timeLeft: {timeLeft}, molePosition:{' '}
        {molePosition}
      </div>
      {status === 'finished' && (
        <GameResults score={score} duration={formatTime(prevDuration)} />
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
          <div className="mole__row-container">
            <Label>CZAS DO KOŃCA</Label>
            <Output value={formatTime(timeLeft)} />
          </div>
          <div className="mole__row-container">
            <Label>WYNIK</Label>
            <Output value={score} />
          </div>
          <div className="mole__row-container">
            <Label>PRZYCISKI STERUJĄCE</Label>
            <Button value="STOP" variant="tertiary" onClick={handleStopped} />
          </div>
        </>
      )}

      {status === 'started' && (
        <div className="mole-board">
          {tiles.map((tile) => (
            <Tile
              key={tile.index}
              onClick={() => handleClickOnTile(tile.index)}
              hasMole={tile.index === molePosition ? true : false}
              variant={getTileVariant(tile.index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
