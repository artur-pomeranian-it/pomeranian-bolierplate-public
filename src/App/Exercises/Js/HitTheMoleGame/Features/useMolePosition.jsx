import { useCallback, useEffect, useState } from 'react';
import { getNewMolePosition } from '../Utils';

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
