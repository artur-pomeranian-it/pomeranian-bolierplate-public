import { useEffect, useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button, Output, Label, Result } from './Components';
import { Tile } from './Features';
import { formatTime, getAlphabet, shuffle } from './Utils';
import './styles.css';

const ELEMENTS = [8, 16, 20];
// const CHARACTERS = [...'ABCDEFGHIJ'];
const characters = getAlphabet(10);

function getInitialTiles(size) {
  const charactersSubSet = characters.slice(0, size / 2);
  const shuffled = shuffle([...charactersSubSet, ...charactersSubSet]);
  return shuffled.map((character, index) => ({
    index,
    value: character,
    variant: 'neutral',
    isVisible: false,
  }));
}

export const MemoGame = () => {
  const [status, setStatus] = useState('notStarted'); // notStarted || started || passed || finished
  const [tiles, setTiles] = useState([]);
  const [noOfElements, setNoOfElements] = useState();
  const [prevNoOfElements, setPrevNoOfElements] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [found, setFound] = useState(0);
  const [fisrtClick, setFirstClick] = useState();
  const [secondClick, setSecondClick] = useState();

  function handleStart() {
    if (noOfElements !== undefined) {
      setStatus('started');
      setTiles(getInitialTiles(noOfElements));
      setShowWarning(false);
      setTime(0);
      setScore(0);
      setFound(0);
      setFirstClick(undefined);
      setSecondClick(undefined);
    } else {
      setShowWarning(true);
    }
  }
  function handlePassed() {
    setStatus('passed');
    setPrevNoOfElements(noOfElements);
    setNoOfElements(undefined);
  }

  const handleFinished = () => {
    setStatus('finished');
    setNoOfElements(undefined);
  };

  useEffect(() => {
    if (status === 'finished' || status === 'passed') {
      setNoOfElements(undefined);
    }
  }, [status]);

  useEffect(() => {
    let intervalId;
    if (status === 'started') {
      intervalId = setInterval(
        () => setTime((currentTime) => currentTime + 100),
        100
      );
    }
    return () => clearInterval(intervalId);
  }, [status]);

  function resetIncorrect(index) {
    setTiles((oldTiles) =>
      oldTiles.map((tile) =>
        tile.index === index
          ? { ...tile, isVisible: false, variant: 'neutral' }
          : tile
      )
    );
  }

  useEffect(() => {
    const noOfCorrectElements = tiles.filter(
      ({ variant }) => variant === 'correct'
    ).length;

    setFound(noOfCorrectElements / 2);

    if (tiles.length > 0 && noOfCorrectElements === tiles.length) {
      handleFinished();
    }

    let timeoutIds = [];
    tiles
      .filter(({ variant }) => variant === 'incorrect')
      .forEach(({ index }) => {
        const timeoutId = setTimeout(resetIncorrect, 500, index);
        timeoutIds.push(timeoutId);
      });
    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [tiles]);

  useEffect(() => {
    if (fisrtClick !== undefined && secondClick !== undefined) {
      setScore((current) => current + 1);

      setTiles((olfTiles) => {
        const newTiles = [...olfTiles];
        const first = newTiles[fisrtClick];
        const second = newTiles[secondClick];
        let variant = first.value === second.value ? 'correct' : 'incorrect';
        newTiles[fisrtClick] = { ...first, variant };
        newTiles[secondClick] = { ...second, variant };
        return newTiles;
      });

      setFirstClick(undefined);
      setSecondClick(undefined);
    }
  }, [fisrtClick, secondClick]);

  function handleTileClicked(index) {
    if (tiles.some((tile) => tile.index === index && tile.isVisible)) {
      return;
    }

    setTiles((oldTiles) =>
      oldTiles.map((tile) =>
        tile.index === index ? { ...tile, isVisible: true } : tile
      )
    );

    if (fisrtClick !== undefined) {
      setSecondClick(index);
    } else {
      setFirstClick(index);
    }
  }

  return (
    <div>
      <MasterHeader value="Memo" />
      <p>
        Gra polegająca na zapamiętywaniu odkrytych kafli i łączeniu ich w pary
      </p>
      {showWarning && (
        <p className="memo__warning">
          Wybierz liczbę elementów, żeby zacząć grę
        </p>
      )}

      {status === 'finished' && (
        <Result>
          Gratulacje! Twój wynik to {score} odsłon w czasie {formatTime(time)}!
        </Result>
      )}

      {status === 'passed' && (
        <Result>
          Zgadłeś {found / 2} na {prevNoOfElements / 2} par w czasie{' '}
          {formatTime(time)}, w {score} odsłonach. Powodzenia następnym razem!
        </Result>
      )}

      {status !== 'started' && (
        <>
          <div className="memo__row-container">
            <Label>Liczba elementów</Label>
            {ELEMENTS.map((element) => (
              <Button
                key={element}
                value={`${element} elementów`}
                variant={element === noOfElements ? 'secondary' : 'primary'}
                onClick={() => setNoOfElements(element)}
              />
            ))}
          </div>
          <div className="memo__row-container">
            <Label>Przyciski sterujące</Label>
            <Button value="START" variant="primary" onClick={handleStart} />
          </div>
        </>
      )}

      {status === 'started' && (
        <>
          <div className="memo__row-container">
            <Label>Czas gry</Label>
            <Output>{formatTime(time)}</Output>
          </div>
          <div className="memo__row-container">
            <Label>Liczba ruchów</Label>
            <Output>{score}</Output>
          </div>
          <div className="memo__row-container">
            <Label>Przyciski sterujące</Label>
            <Button value="PASS" variant="tertiary" onClick={handlePassed} />
          </div>
        </>
      )}
      {(status === 'started' || status === 'finished') && (
        <div className="memo-board">
          {tiles.map(({ index, value, variant, isVisible }) => (
            <Tile
              key={index}
              value={value}
              isVisible={isVisible}
              variant={variant}
              onClick={() => handleTileClicked(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
