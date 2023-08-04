import { useEffect, useState } from 'react';
import { formatTime, getHighScore, getPoints, setHighScore } from '../Utils';

export const HighScoreMessage = ({
  initialNoOfElements,
  initialScore,
  initialTime,
}) => {
  const [noOfElements] = useState(initialNoOfElements);
  const [score] = useState(initialScore);
  const [time, setTime] = useState(initialTime);
  const [prevHighScore, setPrevHighScore] = useState();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (time === 0 && initialTime > 0) {
      setTime(initialTime);
    }
  }, [initialTime, time]);

  useEffect(() => {
    if (time > 0 && score > 0 && noOfElements > 0) {
      const prev = getHighScore(noOfElements);
      const points = getPoints(score, time);
      if (prev === null) {
        setHighScore(noOfElements, {
          score,
          time,
          points,
        });
        console.log(score, time, noOfElements, points);
      } else {
        setPrevHighScore(prev);
        if (prev.points > getPoints(score, time)) {
          setShowMessage(true);
          setHighScore(noOfElements, {
            score,
            time,
            points,
          });
        }
      }
    }
  }, [noOfElements, score, time]);

  return showMessage ? (
    <p className="memo__result">
      Gratulacje pobiłeś rekord twoje punkty to (60 x {score} /{' '}
      {formatTime(time)}) = {getPoints(score, time)} poprzedni rekord{' '}
      {JSON.stringify(prevHighScore)}
    </p>
  ) : null;
};
