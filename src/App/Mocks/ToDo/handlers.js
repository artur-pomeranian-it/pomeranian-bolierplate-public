import { rest } from 'msw';
import { testData } from './testData';

export const baseURL = 'http://localhost:3333';
export const basePath = `${baseURL}/api/todo`;
export const DELAY = 10;

const localStorageName = 'todo-api';

const getFromLocalStorage = () => {
  const storedData = localStorage.getItem('localStorageName');
  return storedData ? JSON.parse(storedData) : testData;
};

const saveToLocalStorage = (data) => {
  localStorage.setItem(localStorageName, JSON.stringify(data));
};

const addToDoToLocalStorage = (todo) => {
  const data = getFromLocalStorage();
  data.push(todo);
  saveToLocalStorage(data);
};

const deleteToDoFromLocalStorage = (id) => {
  const data = getFromLocalStorage();
  saveToLocalStorage(data.filter((todo) => todo.id !== id));
};

const markToDoAsDone = (id) => {
  const data = getFromLocalStorage();
  const newData = data.map((todo) =>
    todo.id !== id
      ? todo
      : { ...todo, isDone: true, doneDate: new Date().toISOString() }
  );
  console.log(
    'newData',
    newData,
    id,
    data.find((todo) => todo.id === id)
  );
  saveToLocalStorage(newData);
  return newData.find((todo) => todo.id === id);
};

const mockGet = rest.get(basePath, (_req, res, ctx) => {
  const data = getFromLocalStorage();
  return res(ctx.delay(DELAY), ctx.json(data));
});
const mockPost = rest.post(basePath, (req, res, ctx) => {
  const newToDo = JSON.parse(req.bodyUsed);
  addToDoToLocalStorage(newToDo);
  return res(ctx.delay(DELAY), ctx.json(newToDo));
});
const mockDelete = rest.delete(`${basePath}/:id`, (req, res, ctx) => {
  const { id } = req.params;
  const intId = JSON.parse(id);
  deleteToDoFromLocalStorage(intId);
  return res(ctx.delay(DELAY), ctx.json({ id }));
});

const mockMarkAsDone = rest.put(
  `${basePath}/:id/markAsDone`,
  (req, res, ctx) => {
    const { id } = req.params;
    const intId = JSON.parse(id);
    const newToDo = markToDoAsDone(intId);
    return res(ctx.delay(DELAY), ctx.json(newToDo));
  }
);

const handlers = [mockGet, mockPost, mockDelete, mockMarkAsDone];
export default handlers;
