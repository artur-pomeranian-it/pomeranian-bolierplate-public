import { useEffect, useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button } from './Components';
import { Card } from './Features/Card/Card';
import './style.css';

/* 
  Step 2
  Dodaj GET list
  Dodaj DELETE item
*/

const ERROR_FADE_DELAY = 1000; // 1s;
const ZERO_TASKS_MESSAGE =
  'Brawo! Nie masz aktualnie żadnych zadań do zrealizowania.';
const GETLIST_ERROR_MESSAGE = 'Przepraszamy. Nie udało się pobrać listy zadań.';
const BASE_URL = 'http://localhost:3333';

export function ToDoWithServer() {
  const [todos, setTodos] = useState([]);
  const [isGetListError, setIsGetListError] = useState(false);
  const [deleteErrors, setDeleteErrors] = useState([]);
  const [completeErrors, setCompleteErrors] = useState([]);

  useEffect(() => {
    let timeoutId;
    if (completeErrors.length > 0) {
      timeoutId = setTimeout(() => setCompleteErrors([]), ERROR_FADE_DELAY);
    }
    return () => clearTimeout(timeoutId);
  }, [completeErrors]);

  function handleOnComplete(id) {
    const success = true || Math.random() > 0.5;
    if (success) {
      setTodos((oldToDos) => {
        return oldToDos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: true,
              doneDate: new Date().toISOString(),
            };
          } else {
            return todo;
          }
        });
      });
    } else {
      setCompleteErrors((errs) => [...errs, id]);
    }
  }

  useEffect(() => {
    let timeoutId;
    if (deleteErrors.length > 0) {
      timeoutId = setTimeout(() => setDeleteErrors([]), ERROR_FADE_DELAY);
    }
    return () => clearTimeout(timeoutId);
  }, [deleteErrors]);

  async function handleOnDelete(id) {
    const requestPath = '/api/todo/' + id;
    const headers = {
      'Content-Type': 'application/json',
    };
    const options = { method: 'DELETE', headers };
    try {
      const response = await fetch(BASE_URL + requestPath, options);
      if (!response.ok) throw new Error(response.status);
      setTodos((oldToDos) => {
        return oldToDos.filter((todo) => todo.id !== id);
      });
    } catch (err) {
      setDeleteErrors((errs) => [...errs, id]);
    }
  }

  async function getAllToDos() {
    const requestPath = '/api/todo';
    try {
      const response = await fetch(BASE_URL + requestPath);
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      setTodos(data);
      setIsGetListError(false);
    } catch (err) {
      setIsGetListError(true);
    }
  }

  useEffect(() => {
    getAllToDos();
  }, []);

  function handleRefresh() {
    getAllToDos();
  }

  return (
    <div className="todo">
      <MasterHeader value="TODO" />
      <p>Tutaj znajdziesz listę swoich zadań.</p>
      <div className="todo__list">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            todo={todo}
            onComplete={() => handleOnComplete(todo.id)}
            onDelete={() => handleOnDelete(todo.id)}
            isCompleteError={completeErrors.some((errId) => errId === todo.id)}
            isDeleteError={deleteErrors.some((errId) => errId === todo.id)}
          />
        ))}
      </div>
      <div className="todo__controls">
        {isGetListError && (
          <div className="todo_message">{GETLIST_ERROR_MESSAGE}</div>
        )}
        {!isGetListError && todos.length === 0 && (
          <div className="todo_message">{ZERO_TASKS_MESSAGE}</div>
        )}
        <Button onClick={handleRefresh}>Odśwież widok</Button>
      </div>
      <br />
    </div>
  );
}
