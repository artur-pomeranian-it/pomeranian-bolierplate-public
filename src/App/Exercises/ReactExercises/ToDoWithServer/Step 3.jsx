import { useEffect, useState } from 'react';
import { MasterHeader } from '../../../Components/MasterHeader/MasterHeader';
import { Button } from './Components';
import { Card } from './Features/Card/Card';
import { LocalDevAPIClient } from '../../../ApiClients/LocalDevApiClient';
import './style.css';

/* 
  Step 3
  Dodaj ApiClient
  i refactoring  
  + abort
  + przycisk dodaj
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
  const [markAsDoneErrors, setMarkAsDoneErrors] = useState([]);

  useEffect(() => {
    let timeoutId;
    if (markAsDoneErrors.length > 0) {
      timeoutId = setTimeout(() => setMarkAsDoneErrors([]), ERROR_FADE_DELAY);
    }
    return () => clearTimeout(timeoutId);
  }, [markAsDoneErrors]);

  async function handleOnMarkAsDone(id) {
    const [newTodo, error] = await localAPI.markAsDone(id);
    if (!error) {
      setTodos((oldToDos) =>
        oldToDos.map((todo) => (todo.id === id ? newTodo : todo))
      );
    } else {
      console.error(error.message);
      setMarkAsDoneErrors((errs) => [...errs, id]);
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

  function updateToDos(data, error) {
    if (!error) {
      setTodos(data);
      setIsGetListError(false);
    } else {
      console.error(error.message);
      setIsGetListError(true);
    }
  }

  async function getAllToDos() {
    const [data, error] = await localAPI.getAllToDos();
    updateToDos(data, error);
  }

  useEffect(() => {
    let controller = new AbortController();
    const getAllToDosAsync = async () => {
      const [data, error] = await localAPI.getAllToDos(controller.signal);
      updateToDos(data, error);
    };
    getAllToDosAsync();
    return () => controller.abort();
  }, []);

  function handleRefresh() {
    getAllToDos();
  }

  return (
    <div className="todo">
      <MasterHeader value="TODO" />
      <div className="toto__description">
        Tutaj znajdziesz listę swoich zadań.
        {!isGetListError && todos.length > 0 && (
          <button
            type="button"
            className="todo__plus-button"
            onClick={handleRefresh}
          >
            <span className="sr-only">Dodaj zadanie</span>
          </button>
        )}
      </div>
      <div className="todo__list">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            todo={todo}
            onMarkAsDone={() => handleOnMarkAsDone(todo.id)}
            onDelete={() => handleOnDelete(todo.id)}
            isMarkAsDoneError={markAsDoneErrors.some(
              (errId) => errId === todo.id
            )}
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
          <>
            <div className="todo_message">{ZERO_TASKS_MESSAGE}</div>
            <Button onClick={handleRefresh}>Dodaj zadanie</Button>
          </>
        )}
        {!isGetListError && todos.length > 0 && (
          <div className="todo__bottom-add-wrapper">
            <Button onClick={handleRefresh}>Dodaj</Button>
          </div>
        )}
      </div>
    </div>
  );
}
