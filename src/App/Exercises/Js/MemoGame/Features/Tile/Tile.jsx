import './styles.css';

export const Tile = ({ isVisible, variant = 'neutral', onClick, value }) => {
  let isVisibleClass = '';
  if (isVisible === true) isVisibleClass = 'memo__letter--is-visible';

  const variantClass = 'memo__letter--' + variant;
  return (
    <div className={`memo__tile `} onClick={onClick}>
      <div className={`memo__letter ${isVisibleClass} ${variantClass}`}>
        {value}
      </div>
    </div>
  );
};
