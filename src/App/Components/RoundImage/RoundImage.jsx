import './styles.css';

export const RoundImage = ({ size }) => {
  return (
    <div
      className="round-image-wolf"
      // style={{ borderRadius: '100%', height: '150px', width: '150px' }}
      style={{ borderRadius: '100%', height: `${size}px`, width: `${size}px` }}
      alt="wolf"
    />
  );
};
