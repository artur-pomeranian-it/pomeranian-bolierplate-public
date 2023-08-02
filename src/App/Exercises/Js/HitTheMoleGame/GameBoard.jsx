/* eslint-disable no-fallthrough */
import { useCallback, useEffect, useMemo, useState } from 'react';
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
    // console.timeEnd(`mole-position`);
    // console.time(`mole-position`);
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
  console.log('dfsfsdfsdf', Date.now());
  const [molePosition1, moveRandomly1] = useMolePosition(moleOption);
  const [molePosition2, moveRandomly2] = useMolePosition(moleOption);
  const [molePosition3, moveRandomly3] = useMolePosition(moleOption);

  const sharedPositions = useMemo(() => {
    switch (moleOption.molesNo) {
      case 1:
        return [molePosition1];
      case 2:
        return [molePosition1, molePosition2];
      default:
        return [molePosition1, molePosition2, molePosition3];
    }
  }, [moleOption.molesNo, molePosition1, molePosition2, molePosition3]);

  const moveRandomly = useCallback(
    (positionToMove) => {
      if (molePosition1 === positionToMove) moveRandomly1(positionToMove);
      if (molePosition2 === positionToMove) moveRandomly2(positionToMove);
      if (molePosition3 === positionToMove) moveRandomly3(positionToMove);
    },
    [
      molePosition1,
      molePosition2,
      molePosition3,
      moveRandomly1,
      moveRandomly2,
      moveRandomly3,
    ]
  );

  return [sharedPositions, moveRandomly];
};

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
