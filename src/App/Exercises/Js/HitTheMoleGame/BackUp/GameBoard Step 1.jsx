/* eslint-disable no-fallthrough */
import { useCallback, useEffect, useState } from 'react';
import { Tile } from './Components';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getNewMolePosition(currentPosition, tilesNo) {
  while (true) {
    const newPosition = getRandomInt(tilesNo - 1);
    if (currentPosition !== newPosition) {
      return newPosition;
    }
  }
}

const HIGHLIGHT_TIME = 300;

const useMolePosition = (moleOption) => {
  const [molePosition, setMolePosition] = useState();

  useEffect(() => {
    setMolePosition(() => getNewMolePosition(undefined, moleOption.tiles));
  }, [moleOption]);

  const moveRandomly = useCallback(
    (currentPosition) => {
      setMolePosition(getNewMolePosition(currentPosition, moleOption.tiles));
    },
    [moleOption.tiles]
  );

  useEffect(() => {
    let timeoutId;
    console.timeEnd(`mole-position`);
    console.time(`mole-position`);
    if (molePosition !== undefined) {
      timeoutId = setTimeout(
        moveRandomly,
        moleOption.timeVisible,
        molePosition
      );
    }
    return () => clearTimeout(timeoutId);
  }, [moleOption, molePosition, moveRandomly]);

  return [molePosition, moveRandomly];
};

const useMolePositions = (moleOption) => {
  const [postions] = useState([
    useMolePosition(moleOption),
    useMolePosition(moleOption),
    useMolePosition(moleOption),
  ]);

  const sharedPositions = postions
    .map((pos) => pos[0])
    .filter((_, index) => index <= moleOption.molesNo);

  const moveRandomly = useCallback(
    (positionToMove) => {
      const toChange = postions.find((pos) => pos[0] === positionToMove);
      toChange[1](positionToMove);
    },
    [postions]
  );

  return [sharedPositions, moveRandomly];
};

export const GameBoard = ({ tiles, setScore, moleOption }) => {
  const [correct, setCorrect] = useState();
  const [incorrect, setIncorrect] = useState();
  const [molePosition, moveRandomly] = useMolePosition(moleOption);

  function getTileVariant(index) {
    if (index === correct) return 'correct';
    if (index === incorrect) return 'incorrect';
    return 'neutral';
  }

  const handleClickOnTile = (index) => {
    if (molePosition === index) {
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
          hasMole={molePosition === tile.index ? true : false}
          variant={getTileVariant(tile.index)}
        />
      ))}
    </div>
  );
};
