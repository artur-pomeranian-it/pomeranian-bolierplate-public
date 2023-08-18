import { useEffect, useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button } from './Components';
import { Card } from './Features/Card/Card';
import { LocalDevAPIClient } from '../../../ApiClients/LocalDevApiClient';
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

const localAPI = new LocalDevAPIClient({ baseURL: BASE_URL });

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

  async function handleOnComplete(id) {
    const [newTodo, error] = await localAPI.markAsDone(id);
    if (!error) {
      setTodos((oldToDos) =>
        oldToDos.map((todo) => (todo.id === id ? newTodo : todo))
      );
    } else {
      console.error(error.message);
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
    const [, error] = await localAPI.deleteToDo(id);
    if (!error) {
      setTodos((oldToDos) => {
        return oldToDos.filter((todo) => todo.id !== id);
      });
    } else {
      console.error(error.message);
      setDeleteErrors((errs) => [...errs, id]);
    }
  }

  async function getAllToDos() {
    const [data, error] = await localAPI.getAllToDos();
    if (!error) {
      setTodos(data);
      setIsGetListError(false);
    } else {
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
          <>
            <div className="todo_message">{GETLIST_ERROR_MESSAGE}</div>
            <Button onClick={handleRefresh}>Odśwież widok</Button>
          </>
        )}
        {!isGetListError && todos.length === 0 && (
          <div className="todo_message">{ZERO_TASKS_MESSAGE}</div>
        )}
      </div>
      <br />
    </div>
  );
}
