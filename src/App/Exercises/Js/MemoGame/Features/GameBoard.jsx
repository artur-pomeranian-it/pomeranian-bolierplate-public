import { useEffect, useState } from 'react';
import { Tile } from '../Features';

export const GameBoard = ({
  initialTiles,
  setScore,
  setFinished,
  setFound,
}) => {
  const [tiles, setTiles] = useState(initialTiles);
  const [fisrtClick, setFirstClick] = useState();
  const [secondClick, setSecondClick] = useState();
  // console.log('Game Board rendered');
  function resetIncorrect(index) {
    setTiles((current) => {
      const newTiles = [...current];
      const toBeUpdated = newTiles[index];
      newTiles[index] = {
        ...toBeUpdated,
        isVisible: false,
        variant: 'neutral',
      };
      return newTiles;
    });
  }

  useEffect(() => {
    setTiles(initialTiles);
  }, [initialTiles]);

  useEffect(() => {
    if (fisrtClick !== undefined && secondClick !== undefined) {
      // console.log(fisrtClick, secondClick);
      setScore((current) => current + 1);
      setTiles((currentTiles) => {
        const newTiles = [...currentTiles];
        const first = newTiles[fisrtClick];
        const second = newTiles[secondClick];
        let variant = 'incorrect';
        if (first.value === second.value) {
          variant = 'correct';
        }
        newTiles[fisrtClick] = { ...first, variant };
        newTiles[secondClick] = { ...second, variant };
        return newTiles;
      });
      setFirstClick(undefined);
      setSecondClick(undefined);
    }
  }, [fisrtClick, secondClick, setScore]);

  useEffect(() => {
    let timeoutIds = [];
    tiles
      .filter(({ variant }) => variant === 'incorrect')
      .forEach(({ index }) => {
        const timeoutId = setTimeout(resetIncorrect, 500, index);
        timeoutIds.push(timeoutId);
      });

    setFound(tiles.filter(({ variant }) => variant === 'correct').length);
    if (
      tiles.length > 0 &&
      tiles.filter(({ variant }) => variant === 'correct').length ===
        tiles.length
    ) {
      setFinished();
    }
    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [setFinished, setFound, tiles]);

  function handleTileClicked(index) {
    if (tiles.some((tile) => tile.index === index && tile.isVisible)) {
      return;
    }

    if (fisrtClick !== undefined && secondClick !== undefined) {
      console.log(
        'Error, both first and scond click are defined',
        fisrtClick,
        secondClick
      );
    } else if (fisrtClick !== undefined) {
      if (fisrtClick === index) return;
      setSecondClick(index);
    } else {
      setFirstClick(index);
    }

    setTiles((currentTiles) => {
      const newTiles = [...currentTiles];
      const toBeUpdated = newTiles[index];

      newTiles[index] = {
        ...toBeUpdated,
        isVisible: true,
      };
      // console.log(JSON.stringify(newTiles[index]), fisrtClick, secondClick);
      return newTiles;
    });
  }

  return (
    <div className="memo-board">
      {tiles.map(({ index, value, variant, isVisible }) => (
        <Tile
          key={index}
          value={value}
          isVisible={isVisible}
          variant={variant}
          onClick={() => handleTileClicked(index)}
        />
      ))}
    </div>
  );
};
