import './style.css';

export function Button({ variant = 'primary', children, onClick }) {
  return (
    <button
      className={`todo__button todo__button--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
