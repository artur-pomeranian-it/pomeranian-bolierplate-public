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

export const handleMarkAsCompleted = async (id, loadToDoList, setMessage) => {
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

export const handleDelete = async (id, loadToDoList, setMessage) => {
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

export const handleAddRandom = async (loadToDoList, setMessage) => {
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
