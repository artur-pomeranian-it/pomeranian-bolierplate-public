import { useEffect } from 'react';
import { useState } from 'react';
import './styles.css';

export const TODOS = [
  'Grocery Shopping',
  'Dentist Appointment',
  'Exercise Routine',
  'Project Deadline',
  'Laundry Day',
  'Call Friend',
  'Pay Bills',
  'Research Topic',
  'Clean House',
  'Plan Vacation',
];

const TIMEOUT = 2000; // 2s

export const getRandomInt = (id) => {
  return Math.floor(Math.random() * id);
};

export const getRandomTaskName = (randomFunction) => {
  return TODOS.at(randomFunction(TODOS.length));
};

export const formatDate = (text) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  if (!dateRegex.test(text)) return 'Invalid Date';
  const date = new Date(text);
  const formatter = new Intl.DateTimeFormat('pl', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  return formatter.format(date);
};

export const getNumberOfTasks = (todos) => {
  if (!todos) throw Error('missing todos parameter');
  if (!(todos instanceof Array)) return undefined;
  return todos.length;
};

export async function getAllTodos(onSuccess, onFailure) {
  const path = 'http://localhost:3333/api/todo';
  const headers = { accept: 'application/json' };
  const method = 'GET';
  try {
    const resp = await fetch(path, { headers, method });
    if (!resp.ok) throw new Error('Invalid response code: ' + resp.status);
    const data = await resp.json();
    onSuccess(data);
  } catch (error) {
    onFailure(error);
  }
}

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

  const handleMarkAsCompleted = async (id) => {
    const path = `http://localhost:3333/api/todo/${id}/markAsDone`;
    const headers = { accept: 'application/json' };
    const method = 'PUT';
    try {
      const resp = await fetch(path, { headers, method });
      if (!resp.ok) throw new Error('Invalid response code:' + resp.status);
      loadToDoList();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    const path = `http://localhost:3333/api/todo/${id}`;
    const headers = { accept: 'application/json' };
    const method = 'DELETE';
    try {
      const resp = await fetch(path, { headers, method });
      if (!resp.ok) throw new Error('Invalid response code:' + resp.status);
      loadToDoList();
      setMessage('Usunięto zadanie: ' + id);
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    let id;
    if (message.length > 0) {
      id = setTimeout(() => {
        setMessage('');
      }, TIMEOUT);
    }
    return () => clearTimeout(id);
  }, [message]);

  const handleAddRandom = async () => {
    const path = `http://localhost:3333/api/todo`;
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const method = 'POST';
    const randomValue = getRandomTaskName(getRandomInt);
    const body = JSON.stringify({
      title: randomValue,
      note: randomValue,
    });
    try {
      const resp = await fetch(path, { headers, method, body });
      if (!resp.ok) throw new Error('Invalid response code: ' + resp.status);
      const { title } = await resp.json();
      setMessage('Dodano zadanie - ' + title);
      loadToDoList();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section>
      <h1>Todo List</h1>
      <div>
        Liczba zadań:<span data-testId>{getNumberOfTasks}</span>
      </div>
      <p>
        <button onClick={handleAddRandom}>Add random</button>
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
                  <button onClick={() => handleMarkAsCompleted(id)}>
                    Mark as Completed
                  </button>
                )}
                <button onClick={() => handleDelete(id)}>Delete</button>
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
