import { useEffect, useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button } from './Components';
import { Card } from './Features/Card/Card';
import './style.css';

/* 
  Step 1 
  na podstawie makiet 1A-1C zrobić wygląd listy
  NIE pobierajmy jeszcze danych w tym ćwiczeniu
  dodajmy 1-2 rekordy testowe na podstawie ww
  struktury i je po prostu wyświetlmy
*/

const ERROR_FADE_DELAY = 1000; // 1s;
const ZERO_TASKS_MESSAGE =
  'Brawo! Nie masz aktualnie żadnych zadań do zrealizowania.';
const GETLIST_ERROR_MESSAGE = 'Przepraszamy. Nie udało się pobrać listy zadań.';

const BASE_URL = 'http://localhost:3333';

export function ToDoWithServer() {
  const [message, setMessage] = useState('');
  const [todos, setTodos] = useState([]);
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

  useEffect(() => {
    if (todos.length === 0 && message !== GETLIST_ERROR_MESSAGE) {
      setMessage(ZERO_TASKS_MESSAGE);
    } else {
      if (message === ZERO_TASKS_MESSAGE) {
        setMessage('');
      }
    }
  }, [todos, message]);

  function handleRefresh() {
    const requestPath = '/api/todo';
    fetch(BASE_URL + requestPath)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        setMessage('');
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        setMessage(GETLIST_ERROR_MESSAGE);
      });
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
        <div className="todo_message">{message}</div>
        <Button onClick={handleRefresh}>Odśwież widok</Button>
      </div>
      <br />
    </div>
  );
}
