import { useCallback, useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button, Output, Label, Result } from './Components';
import { formatTime, getAlphabet, shuffle } from './Utils';
import './styles.css';
import { GameBoard } from './Features/GameBoard';
import { Timer } from './Features/Timer';
import { HighScore } from './Features/HighScore/HighScore';

const ELEMENTS = [2, 16, 20];
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
  // notStarted || started || passed || finished
  const [status, setStatus] = useState('notStarted');
  const [tiles, setTiles] = useState([]);
  const [noOfElements, setNoOfElements] = useState();
  const [prevNoOfElements, setPrevNoOfElements] = useState();
  const [showWarning, setShowWarning] = useState(false);
  const [time, setTime] = useState(0);
  const [shouldUpdateTime, setShouldUpdateTime] = useState(false);
  const [score, setScore] = useState(0);
  const [found, setFound] = useState(0);

  function handleStart() {
    if (noOfElements !== undefined) {
      setStatus('started');
      setTiles(getInitialTiles(noOfElements));
      setShowWarning(false);
      setPrevNoOfElements(noOfElements);
      setTime(0);
      setScore(0);
    } else {
      setShowWarning(true);
    }
  }

  function handlePassed() {
    setStatus('passed');
    setShouldUpdateTime(true);
    setNoOfElements(undefined);
  }

  const setFinished = useCallback(() => {
    setStatus('finished');
    setShouldUpdateTime(true);
    setNoOfElements(undefined);
  }, []);

  const updateTime = useCallback((time) => {
    setTime(time);
    setShouldUpdateTime(false);
  }, []);

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

      {status === 'finished' && (
        <HighScore
          noOfElements={prevNoOfElements}
          gameScore={score}
          gameTime={time}
          elements={ELEMENTS}
        />
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

      <div className="memo__row-container">
        <Timer
          inheritedTime={time}
          updateTime={updateTime}
          status={status}
          shouldUpdateTime={shouldUpdateTime}
        />
      </div>
      {status === 'started' && (
        <>
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
        <GameBoard
          initialTiles={tiles}
          setScore={setScore}
          setFinished={setFinished}
          setFound={setFound}
        />
      )}
    </div>
  );
};
