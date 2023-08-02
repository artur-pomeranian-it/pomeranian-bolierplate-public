import { useCallback, useMemo } from 'react';
import { useMolePosition } from './useMolePosition';

export const useMolePositions = (moleOption) => {
  // console.log('dfsfsdfsdf', Date.now());
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
