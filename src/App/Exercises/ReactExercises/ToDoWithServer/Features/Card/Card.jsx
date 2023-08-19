import { CompleteIcon } from '../../Images/CompleteIcon';
import { DeleteIcon } from '../../Images/DeleteIcon';
import { formatDate } from '../../Utils/formatDate';
import './style.css';

const ERROR_MESSAGE = 'nie udało się ukończyć';

export function Card({
  todo,
  onMarkAsDone,
  onDelete,
  isMarkAsDoneError,
  isDeleteError,
}) {
  const { title, createdAt, doneDate, author, isDone, note } = todo;
  const isError = isMarkAsDoneError || isDeleteError;
  return (
    <section className={`todo__card ${isDone ? 'todo__card--completed' : ''}`}>
      <div className="todo_card-details">
        <h2 className="todo__card-header">{title}</h2>
        <p className="todo_card-author">{author}</p>
        <p className="todo_card-created">{createdAt}</p>
        <p className="todo_card-note">{note}</p>
      </div>
      <div className="todo__card-aside">
        <div className="todo__card-controls">
          {!isDone && (
            <CompleteIcon
              className={`todo__complete todo__complete--${
                isMarkAsDoneError ? 'error' : 'neutral'
              }`}
              onClick={onMarkAsDone}
            />
          )}
          <DeleteIcon
            className={`todo__delete todo__delete--${
              isDeleteError ? 'error' : 'neutral'
            }`}
            onClick={onDelete}
          />
        </div>
        <div className="todo__card-message">{isError ? ERROR_MESSAGE : ''}</div>
        <div className="todo__card-status">
          {isDone && (
            <CompleteIcon className="todo__complete todo__complete--completed" />
          )}
          {isDone && <div>{formatDate(doneDate)}</div>}
        </div>
      </div>
    </section>
  );
}
