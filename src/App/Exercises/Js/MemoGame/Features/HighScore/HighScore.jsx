import { useEffect, useState } from 'react';
import { formatTime, getHighScore, getPoints, setHighScore } from '../../Utils';
import './styles.css';
import { Button } from '../../Components';
import { HighScoreTable } from './HighScoreTable';

export const HighScore = ({
  noOfElements,
  gameScore,
  gameTime: time,
  elements,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [score] = useState(gameScore);
  const [prevHighScore, setPrevHighScore] = useState();
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    if (time > 0 && score > 0 && noOfElements > 0) {
      const prev = getHighScore(noOfElements);
      const points = getPoints(score, time);
      setPrevHighScore(prev);
      if (
        prev === null ||
        (prev !== null && prev.points > getPoints(score, time))
      ) {
        setHighScore(noOfElements, {
          score,
          time,
          points,
        });
        setIsNewHighScore(true);
      }
    }
  }, [noOfElements, score, time]);

  return (
    <div className="memo__high-score">
      <Button
        value={isVisible ? 'Hide High Score' : 'Show High Score'}
        variant={isVisible ? 'secondary' : 'primary'}
        onClick={() => setIsVisible((current) => !current)}
      />

      {isVisible && (
        <HighScoreTable
          values={elements.map((el) => {
            const highScore = getHighScore(el);
            if (highScore === null) return { el };
            return { ...highScore, el };
          })}
          elements={elements}
        />
      )}

      {isNewHighScore && (
        <p className="memo__result">
          Gratulacje pobiłeś rekord twoje punkty to (60 x {score} /{' '}
          {formatTime(time)}) = {getPoints(score, time)} poprzedni rekord{' '}
          {prevHighScore === null ? (
            'Brak'
          ) : (
            <span>
              liczba ruchów: {prevHighScore.score}, czas: {formatTime(time)}{' '}
            </span>
          )}
        </p>
      )}
    </div>
  );
};
