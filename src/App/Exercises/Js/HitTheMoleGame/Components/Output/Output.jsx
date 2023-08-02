import './styles.css';

export const Output = ({ value = 'empty' }) => {
  return <span className="mole__output">{value}</span>;
};
