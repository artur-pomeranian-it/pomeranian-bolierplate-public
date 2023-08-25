//npm run test -- --coverage --watchAll

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { ToDoList } from './ToDoList';
import { getAllTodos, handleAddRandom, handleDelete } from './toDoHelpers';
jest.mock('./toDoHelpers');

const TODOS = [
  {
    id: 71,
    title: 'Clean House',
    note: 'Clean House',
    author: 'Anonymous',
    isDone: true,
    createdAt: '2023-08-24T13:16:57.345Z',
  },
  {
    id: 72,
    title: 'Exercise Routine',
    note: 'Exercise Routine',
    author: 'Anonymous',
    isDone: false,
    createdAt: '2023-08-24T13:16:57.760Z',
  },
];

beforeAll(() => {});

describe('ToDoList - empty', () => {
  beforeEach(() => {
    render(<ToDoList />);
  });
  it('has proper header', () => {
    // screen.logTestingPlaygroundURL();
    const heading = screen.getByRole('heading', {
      name: /todo list/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it('has refresh button', () => {
    const button = screen.getByRole('button', {
      name: /refresh/i,
    });
    expect(button).toBeInTheDocument();
  });
  it('it calls handle function when refresh button pressed', () => {
    const button = screen.getByRole('button', {
      name: /refresh/i,
    });
    fireEvent.click(button);
    expect(getAllTodos).toHaveBeenCalled();
  });
  it('it shows error when refresh fails', () => {
    const errorMessage = 'cos poszlo nie tak';
    getAllTodos.mockImplementation((_, onFailure) => {
      onFailure(Error(errorMessage));
    });
    const button = screen.getByRole('button', {
      name: /refresh/i,
    });
    fireEvent.click(button);
    const message = screen.getByTestId('todo-error-message');
    expect(message).toHaveTextContent(errorMessage);
  });
  it('it hides error after 2 seconds', async () => {
    const errorMessage = 'cos poszlo nie tak';
    getAllTodos.mockImplementation((_, onFailure) => {
      onFailure(Error(errorMessage));
    });
    const button = screen.getByRole('button', {
      name: /refresh/i,
    });
    fireEvent.click(button);
    const message = screen.getByTestId('todo-error-message');
    await waitFor(() => expect(message).toBeEmptyDOMElement(), {
      timeout: 2500,
    });
  });
  it('it renders list with results', async () => {
    getAllTodos.mockImplementation((onSuccess, _) => {
      onSuccess(TODOS);
    });
    const button = screen.getByRole('button', {
      name: /refresh/i,
    });
    fireEvent.click(button);
    const row = await screen.findByRole('row', {
      name: /exercise routine delete/i,
    });
    expect(row).toBeInTheDocument();
  });
  it('calls delete function', async () => {
    getAllTodos.mockImplementation((onSuccess, _) => {
      onSuccess(TODOS);
    });
    const button = screen.getByRole('button', {
      name: /refresh/i,
    });
    fireEvent.click(button);
    const row = await screen.findByRole('row', {
      name: /exercise routine delete/i,
    });
    const deleteButton = within(row).getByRole('button', {
      name: /delete/i,
    });

    fireEvent.click(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
  });
  it('calls add random function', async () => {
    const addButton = screen.getByRole('button', {
      name: /add random/i,
    });
    fireEvent.click(addButton);
    expect(handleAddRandom).toHaveBeenCalled();

    // screen.logTestingPlaygroundURL();
  });
});

// describe('ToDoList mocked functions', () => {
//   beforeEach(() => {
//     render(<ToDoList />);
//   });
//   it('has proper header', () => {
//     const heading = screen.getByRole('heading', {
//       name: /todo list/i,
//     });
//     expect(heading).toBeInTheDocument();
//   });
// });
