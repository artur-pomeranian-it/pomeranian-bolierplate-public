import { useEffect } from 'react';
import { useState } from 'react';
import {
  formatDate,
  getAllTodos,
  handleMarkAsCompleted,
  handleDelete,
  handleAddRandom,
  getNumberOfTasks,
} from './toDoHelpers';
import './styles.css';

const TIMEOUT = 2000; // 2s

export const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');

  const loadToDoList = getAllTodos(
    (data) => setTodos(data),
    (error) => {
      setTodos([]);
      setMessage(error.message);
    }
  );

  useEffect(() => {
    loadToDoList();
  }, [loadToDoList]);

  useEffect(() => {
    let id;
    if (message.length > 0) {
      id = setTimeout(() => {
        setMessage('');
      }, TIMEOUT);
    }
    return () => clearTimeout(id);
  }, [message]);

  return (
    <section>
      <h1>Todo List</h1>
      <div>
        Liczba zadań:<span data-testId>{getNumberOfTasks}</span>
      </div>
      <p>
        <button onClick={() => handleAddRandom(loadToDoList, setMessage)}>
          Add random
        </button>
        <button onClick={loadToDoList}>Refresh</button>
      </p>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Creation date</th>
            <th>Task Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(({ id, title, createdAt, isDone }) => (
            <tr
              key={id}
              className={`todo-task-row ${isDone && 'todo-task-row--done'}`}
            >
              <td>{title}</td>
              <td>{formatDate(createdAt)}</td>
              <td>
                {!isDone && (
                  <button
                    onClick={() =>
                      handleMarkAsCompleted(id, loadToDoList, setMessage)
                    }
                  >
                    Mark as Completed
                  </button>
                )}
                <button
                  onClick={() => handleDelete(id, loadToDoList, setMessage)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="message">{message}</div>
    </section>
  );
};
