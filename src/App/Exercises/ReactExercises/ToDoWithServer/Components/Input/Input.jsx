import './style.css';
export function Input({ id, value, placeholder, onChange, ...rest }) {
  return (
    <input
      id={id}
      className="todo-form__input"
      type="text"
      value={value}
      autoComplete="off"
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  );
}
