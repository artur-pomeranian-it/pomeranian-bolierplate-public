import './styles.css';

export const Tile = ({ hasMole, variant = 'neutral', onClick }) => {
  let moleClass = '';
  if (hasMole) moleClass = 'mole__tile--is-mole';
  const backgroundClass = 'mole__tile--' + variant;
  return (
    <div
      className={`mole__tile ${moleClass} ${backgroundClass}`}
      onClick={onClick}
    />
  );
};
