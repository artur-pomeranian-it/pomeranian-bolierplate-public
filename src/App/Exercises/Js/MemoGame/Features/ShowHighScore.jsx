import { useState } from 'react';
import { Button } from '../Components';
import { formatTime, getHighScore } from '../Utils';

export const ShowHighScore = ({ elements }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <Button
        value="Pokaż High Score"
        variant="primary"
        onClick={() => setIsVisible((current) => !current)}
      />
      {isVisible &&
        elements
          .map((el) => {
            const highScore = getHighScore(el);
            if (highScore === null) return null;
            return { ...highScore, el };
          })
          .filter((item) => item !== null)
          .map(({ score, time, points, el }) => {
            console.log('sthing');
            return (
              <div>
                Elements: {el}, Score: {score}, Time: {formatTime(time)}.
                Points: {points}{' '}
              </div>
            );
          })}
    </>
  );
};
