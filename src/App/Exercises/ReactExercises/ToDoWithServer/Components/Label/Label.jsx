import './style.css';
export function Label({ htmlFor, children, ...rest }) {
  return (
    <label htmlFor={htmlFor} className="todo-form__label" type="text" {...rest}>
      {children}
    </label>
  );
}
