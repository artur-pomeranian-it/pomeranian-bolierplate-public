import { useCallback, useEffect, useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button, Output, Label, Result } from './Components';
import { formatTime, getAlphabet, shuffle } from './Utils';
import './styles.css';
import { GameBoard } from './Features/GameBoard';
import { Timer } from './Features/Timer';
import { HighScoreMessage } from './Features/HighScoreMessage';
import { ShowHighScore } from './Features/ShowHighScore';

const ELEMENTS = [2, 16, 20];
// const CHARACTERS = [...'ABCDEFGHIJ'];
const characters = getAlphabet(10);

const getFinishedResult = (score, time) =>
  `Gratulacje! Twój wynik to ${score} odsłon w czasie ${formatTime(time)}!`;
const getPassedResult = (score, time, found, noOfElements) =>
  `Zgadłeś ${found / 2} na ${noOfElements / 2} par w czasie ${formatTime(
    time
  )}, w ${score} odsłonach. Powodzenia następnym razem!`;

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
  const [shouldUpdateTime, setShouldUpdateTime] = useState(false);
  const [score, setScore] = useState(0);
  const [found, setFound] = useState(0);
  const [resultMessage, setResultMessage] = useState();

  function handleStart() {
    if (noOfElements !== undefined) {
      setStatus('started');
      setTiles(getInitialTiles(noOfElements));
      setShowWarning(false);
      setTime(0);
      setScore(0);
    } else {
      setShowWarning(true);
    }
  }
  function handlePassed() {
    setStatus('passed');
    setPrevNoOfElements(noOfElements);
    setShouldUpdateTime(true);
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

  const setFinished = useCallback(() => {
    setStatus('finished');
    setShouldUpdateTime(true);
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
      {(status === 'finished' || status === 'passed') && (
        <Result value={resultMessage} />
      )}

      {status === 'finished' && (
        <HighScoreMessage
          initialNoOfElements={noOfElements}
          initialScore={score}
          initialTime={time}
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

      <Timer
        inheritedTime={time}
        updateTime={updateTime}
        status={status}
        shouldUpdateTime={shouldUpdateTime}
      />
      {status === 'started' && (
        <>
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
        <GameBoard
          initialTiles={tiles}
          setScore={setScore}
          setFinished={setFinished}
          setFound={setFound}
        />
      )}
      {status === 'finished' && <ShowHighScore elements={ELEMENTS} />}
    </div>
  );
};
