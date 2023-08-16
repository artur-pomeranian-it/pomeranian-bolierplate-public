import { useEffect, useState } from 'react';
import { Tile } from '../';

export const GameBoard = ({
  initialTiles,
  setScore,
  handleFinished,
  setFound,
}) => {
  const [tiles, setTiles] = useState(initialTiles);
  const [firstClick, setFirstClick] = useState();
  const [secondClick, setSecondClick] = useState();

  function resetIncorrect(index) {
    setTiles((oldTiles) =>
      oldTiles.map((tile) =>
        tile.index === index
          ? { ...tile, isVisible: false, variant: 'neutral' }
          : tile
      )
    );
  }

  useEffect(() => {
    setTiles(initialTiles);
  }, [initialTiles]);

  useEffect(() => {
    if (firstClick !== undefined && secondClick !== undefined) {
      setScore((current) => current + 1);

      setTiles((olfTiles) => {
        const newTiles = [...olfTiles];
        const first = newTiles[firstClick];
        const second = newTiles[secondClick];
        let variant = first.value === second.value ? 'correct' : 'incorrect';
        newTiles[firstClick] = { ...first, variant };
        newTiles[secondClick] = { ...second, variant };
        return newTiles;
      });

      setFirstClick(undefined);
      setSecondClick(undefined);
    }
  }, [firstClick, secondClick, setScore]);

  useEffect(() => {
    const noOfCorrectElements = tiles.filter(
      ({ variant }) => variant === 'correct'
    ).length;

    setFound(noOfCorrectElements / 2);

    if (tiles.length > 0 && noOfCorrectElements === tiles.length) {
      handleFinished();
    }

    let timeoutIds = [];
    tiles
      .filter(({ variant }) => variant === 'incorrect')
      .forEach(({ index }) => {
        const timeoutId = setTimeout(resetIncorrect, 500, index);
        timeoutIds.push(timeoutId);
      });
    return () => timeoutIds.forEach((id) => clearTimeout(id));
  }, [handleFinished, setFound, tiles]);

  function handleTileClicked(index) {
    if (tiles.some((tile) => tile.index === index && tile.isVisible)) {
      return;
    }

    setTiles((oldTiles) =>
      oldTiles.map((tile) =>
        tile.index === index ? { ...tile, isVisible: true } : tile
      )
    );

    if (firstClick !== undefined) {
      setSecondClick(index);
    } else {
      setFirstClick(index);
    }
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
