import './styles.css';

export const RoundImage = ({ size }) => {
  // const { size } = props;
  // props.size
  return (
    <div
      className="round-image"
      style={{ borderRadius: '100%', height: '150px', width: '150px' }}
    />
  );
};
