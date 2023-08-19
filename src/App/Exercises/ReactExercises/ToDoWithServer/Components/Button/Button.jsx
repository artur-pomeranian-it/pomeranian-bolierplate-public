import './style.css';

export function Button({ variant = 'primary', children, onClick, ...rest }) {
  return (
    <button
      className={`todo__button todo__button--${variant}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
