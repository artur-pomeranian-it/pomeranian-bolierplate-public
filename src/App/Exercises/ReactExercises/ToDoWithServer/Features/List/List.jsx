import { useEffect, useState } from 'react';
import { LocalDevAPIClient } from '../../../../../ApiClients/LocalDevApiClient';
import { Card } from '../Card/Card';
import { Button, PlusButton } from '../../Components';
import './style.css';

const ZERO_TASKS_MESSAGE =
  'Brawo! Nie masz aktualnie żadnych zadań do zrealizowania.';
const GETLIST_ERROR_MESSAGE = 'Przepraszamy. Nie udało się pobrać listy zadań.';

const ERROR_FADE_DELAY = 1000; // 1s;
const BASE_URL = 'http://localhost:3333';

const localAPI = new LocalDevAPIClient({ baseURL: BASE_URL });

export function List({ addToDo, editToDo }) {
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
    <>
      <div className="toto__description">
        Tutaj znajdziesz listę swoich zadań.
        {!isGetListError && todos.length > 0 && (
          <PlusButton onClick={addToDo} />
        )}
      </div>
      <div className="todo__list">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            todo={todo}
            onEdit={() => editToDo(todo.id)}
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
            <Button onClick={addToDo}>Dodaj zadanie</Button>
          </>
        )}
        {!isGetListError && todos.length > 0 && (
          <div className="todo__bottom-add-wrapper">
            <Button onClick={addToDo}>Dodaj</Button>
          </div>
        )}
      </div>
    </>
  );
}
