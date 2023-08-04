import './styles.css';

export const Output = ({ value = 'empty' }) => {
  return <span className="memo__output">{value}</span>;
};
