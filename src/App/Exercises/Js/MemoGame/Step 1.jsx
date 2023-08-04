import { useEffect, useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button, Output, Label, Result, Tile } from './Components';
import { formatTime, getAlphabet, shuffle } from './Utils';
import './styles.css';

const ELEMENTS = [8, 16, 20];
// const CHARACTERS = [...'ABCDEFGHIJ'];
const characters = getAlphabet(10);

const getFinishedResult = (score, time) =>
  `Gratulacje! Twój wynik to ${score} odsłon w czasie ${formatTime(time)}!`;
const getPassedResult = (score, time, found, noOfElements) =>
  `Zgadłeś ${found / 2} na ${noOfElements / 2} par w czasie ${formatTime(
    time
  )}, w ${score} odsłonach. Powodzenia następnym razem!`;

export const MemoGame = () => {
  const [status, setStatus] = useState('notStarted'); // notStarted || started || passed || finished
  const [tiles, setTiles] = useState([]);
  const [noOfElements, setNoOfElements] = useState();
  const [prevNoOfElements, setPrevNoOfElements] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [found, setFound] = useState(0);
  const [resultMessage, setResultMessage] = useState();
  const [fisrtClick, setFirstClick] = useState();
  const [secondClick, setSecondClick] = useState();

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
  }

  useEffect(() => {
    if (status === 'finished' || status === 'passed') {
      setNoOfElements(undefined);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'finished') {
      setResultMessage(getFinishedResult(score, time));
    }
    if (status === 'passed') {
      setResultMessage(getPassedResult(score, time, found, prevNoOfElements));
    }
  }, [found, prevNoOfElements, score, status, tiles, time]);

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
    setTiles((current) => {
      const newTiles = [...current];
      const toBeUpdated = newTiles[index];
      newTiles[index] = {
        ...toBeUpdated,
        isVisible: false,
        variant: 'neutral',
      };
      return newTiles;
    });
  }

  useEffect(() => {
    let timeoutIds = [];
    tiles
      .filter(({ variant }) => variant === 'incorrect')
      .forEach(({ index }) => {
        const timeoutId = setTimeout(resetIncorrect, 1000, index);
        timeoutIds.push(timeoutId);
      });
    setFound(tiles.filter(({ variant }) => variant === 'correct').length);
    if (
      tiles.length > 0 &&
      tiles.filter(({ variant }) => variant === 'correct').length ===
        tiles.length
    ) {
      setStatus('finished');
    }
    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [tiles]);

  useEffect(() => {
    if (fisrtClick !== undefined && secondClick !== undefined) {
      // console.log(fisrtClick, secondClick);
      setScore((current) => current + 1);
      setTiles((currentTiles) => {
        const newTiles = [...currentTiles];
        const first = newTiles[fisrtClick];
        const second = newTiles[secondClick];
        let variant = 'incorrect';
        if (first.value === second.value) {
          variant = 'correct';
        }
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

    if (fisrtClick !== undefined && secondClick !== undefined) {
      console.log(
        'Error, both first and scond click are defined',
        fisrtClick,
        secondClick
      );
    } else if (fisrtClick !== undefined) {
      if (fisrtClick === index) return;
      setSecondClick(index);
    } else {
      setFirstClick(index);
    }

    setTiles((currentTiles) => {
      const newTiles = [...currentTiles];
      const toBeUpdated = newTiles[index];

      newTiles[index] = {
        ...toBeUpdated,
        isVisible: true,
      };
      // console.log(JSON.stringify(newTiles[index]), fisrtClick, secondClick);
      return newTiles;
    });
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
      {(status === 'finished' || status === 'passed') && (
        <Result value={resultMessage} />
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
            <Output value={formatTime(time)} />
          </div>
          <div className="memo__row-container">
            <Label>Liczba ruchów</Label>
            <Output value={score} />
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
