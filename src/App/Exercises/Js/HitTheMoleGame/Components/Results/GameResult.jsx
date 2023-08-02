import './styles.css';

export const GameResults = ({ score = 0, duration = 0 }) => {
  return (
    <div className="mole__results">
      Gratulację! Twój wynik to {score} złapane krety w czasie {duration} minut!
    </div>
  );
};
