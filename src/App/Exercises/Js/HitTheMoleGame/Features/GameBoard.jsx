import { useEffect, useState } from 'react';
import { Tile } from '../Components';
import { useMolePositions } from './useMolePositions';

const HIGHLIGHT_TIME = 300;

export const GameBoard = ({ tiles, setScore, moleOption }) => {
  const [correct, setCorrect] = useState();
  const [incorrect, setIncorrect] = useState();
  const [molePositions, moveRandomly] = useMolePositions(moleOption);

  function getTileVariant(index) {
    if (index === correct) return 'correct';
    if (index === incorrect) return 'incorrect';
    return 'neutral';
  }

  const handleClickOnTile = (index) => {
    if (molePositions && molePositions.some((position) => position === index)) {
      setScore((currentScore) => currentScore + 1);
      setCorrect(index);
      moveRandomly(index);
    } else {
      setScore((currentScore) => currentScore - 1);
      setIncorrect(index);
    }
  };

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

  return (
    <div className="mole-board">
      {tiles.map((tile) => (
        <Tile
          key={tile.index}
          onClick={() => handleClickOnTile(tile.index)}
          hasMole={
            molePositions &&
            molePositions.some((position) => position === tile.index)
              ? true
              : false
          }
          variant={getTileVariant(tile.index)}
        />
      ))}
    </div>
  );
};
