import './style.css';
export function Textarea({ id, value, placeholder, onChange, ...rest }) {
  return (
    <textarea
      id={id}
      className="todo-form__input todo-form__textarea"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  );
}
