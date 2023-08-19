import './style.css';

export function PlusButton({ onClick }) {
  return (
    <button type="button" className="todo__plus-button" onClick={onClick}>
      <span className="sr-only">Dodaj zadanie</span>
    </button>
  );
}
