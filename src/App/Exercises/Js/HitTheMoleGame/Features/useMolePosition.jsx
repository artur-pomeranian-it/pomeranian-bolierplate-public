import { useCallback, useEffect, useState } from 'react';

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

export const useMolePosition = (moleOption) => {
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
