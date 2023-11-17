import { rest } from 'msw';
import {
  TODO_NAMES,
  ToDoList,
  formatDate,
  getNumberOfTasks,
  getRandomInt,
  getRandomTaskName,
} from './ToDoList';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { setupServer } from 'msw/lib/node';
// import { server } from '../../../../setupTests';
// import { basePath } from '../../../Mocks/ToDo/handlers';
// import { testData } from '../../../Mocks/ToDo/testData';

const baseURL = 'http://localhost:3333';
const basePath = `${baseURL}/api/todo`;

const testData = [
  {
    id: 105,
    title: 'Research Topic',
    note: 'Research Topic',
    author: 'Anonymous',
    isDone: false,
    createdAt: '2023-08-25T10:36:22.070Z',
  },
  {
    id: 106,
    title: 'Grocery Shopping',
    note: 'Grocery Shopping',
    author: 'Anonymous',
    isDone: false,
    createdAt: '2023-08-25T10:36:34.700Z',
  },
];

const DELAY = 0;

const mockGet = rest.get(basePath, (_req, res, ctx) => {
  return res(ctx.delay(DELAY), ctx.json(testData));
});
const mockPost = rest.post(basePath, (req, res, ctx) => {
  return res(ctx.delay(DELAY), ctx.json({ title: 'TEST' }));
});
const mockDelete = rest.delete(`${basePath}/:id`, (req, res, ctx) => {
  const { id } = req.params;
  return res(ctx.delay(DELAY), ctx.json({ id }));
});

const server = setupServer(mockGet, mockPost, mockDelete);

// additional mocks
const failedGet = rest.get(basePath, (req, res, ctx) => {
  return res(ctx.status(500));
});
const failedDelete = rest.delete(`${basePath}/:id`, (req, res, ctx) => {
  return res(ctx.status(500));
});
const failedPost = rest.post(basePath, (_req, res, ctx) => {
  return res(ctx.status(500));
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('getNumberOfTasks', () => {
  test('returns 0 for empty array', () => {
    const size = getNumberOfTasks([]);
    expect(size).toBe(0);
  });

  it('returns undefined if parameter is not an array obj', () => {
    expect(getNumberOfTasks({ first: 1 })).toBeUndefined();
    expect(getNumberOfTasks(1)).toBeUndefined();
    expect(getNumberOfTasks('Alfa')).toBeUndefined();
  });

  it('returns number equal to array length', () => {
    expect(getNumberOfTasks([1, 2])).toBe(2);
  });

  it('throws Error if parameter is undefined', () => {
    expect(() => getNumberOfTasks()).toThrow(/missing/);
  });
});

// Exercise testy dla formatDate
describe('formatDate', () => {
  it('formats a valid date string', () => {
    const inputDate = '2023-08-24T12:34:56.789Z';
    const formattedDate = formatDate(inputDate);
    expect(formattedDate).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
  });

  it('returns "formatDate missing pram" if parameter undefined', () => {
    const invalidDate = undefined;
    const formattedDate = formatDate(invalidDate);
    expect(formattedDate).toBe('formatDate missing pram');
  });
});

describe('getRandomTaskName', () => {
  it('returns first element from test data', () => {
    const getRandomMock = jest.fn().mockReturnValue(0);
    expect(getRandomTaskName(getRandomMock)).toEqual(TODO_NAMES.at(0));
  });

  it('returns last element from test data', () => {
    const lastIndex = TODO_NAMES.length - 1;
    const getRandomMock = jest.fn().mockImplementation((number) => number - 1);
    expect(getRandomTaskName(getRandomMock)).toEqual(TODO_NAMES.at(lastIndex));
  });
});

describe('getRandomInt', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random');
  });
  afterAll(() => {
    //  !important
    // Math.random.mockRestore();
    jest.restoreAllMocks();
  });
  beforeEach(() => Math.random.mockClear());

  it('returns (param -1) when random is close to one', () => {
    Math.random.mockImplementation(() => 0.999);
    expect(getRandomInt(8)).toBe(7);
  });
  it('returns 0 when random is close to zero', () => {
    Math.random.mockImplementation(() => 0.0001);
    expect(getRandomInt(8)).toBe(0);
  });
  it('returns 0 when random is zero', () => {
    Math.random.mockReturnValue(0);
    expect(getRandomInt(8)).toBe(0);
  });
});

describe('ToDoList component', () => {
  it('has proper header', () => {
    render(<ToDoList />);
    const heading = screen.getByRole('heading', {
      name: /todo list/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('has refresh button', () => {
    render(<ToDoList />);
    const button = screen.getByRole('button', {
      name: /refresh/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('returns list with elements on load', async () => {
    render(<ToDoList />);
    await waitFor(() =>
      expect(screen.getByText(new RegExp(testData[0]?.title, 'i')))
    );
    await waitFor(() =>
      expect(screen.getByText(new RegExp(testData[1]?.title, 'i')))
    );
    expect(screen.getByTestId('number-of-tasks')).toHaveTextContent(
      testData.length
    );
  });

  it('it returns new results after refresh button pressed', async () => {
    render(<ToDoList />);
    const refreshButton = screen.getByRole('button', {
      name: /refresh/i,
    });
    fireEvent.click(refreshButton);
    const firstElement = await screen.findAllByText(
      new RegExp(testData[0]?.title, 'i')
    );
    expect(firstElement).toHaveLength(1);
  });

  it('it shows error when GET todo fails', async () => {
    server.use(failedGet);
    render(<ToDoList />);
    // await waitFor(() => screen.getByText(/Invalid response/i));
    const message = await screen.findByText(/Invalid response/i);
    expect(message).toHaveTextContent('500');
  });

  it('it hides error after 2 seconds', async () => {
    server.use(failedGet);
    render(<ToDoList />);
    const message = await screen.findByText(/Invalid response/i);
    await waitFor(() => expect(message).toBeEmptyDOMElement(), {
      timeout: 2500,
    });
  });

  it('it calls delete function with proper id', async () => {
    render(<ToDoList />);
    const row = await screen.findByRole('row', {
      name: /grocery shopping 25\.08\.2023, 12:36 delete/i,
    });

    const deleteButton = within(row).getByRole('button', {
      name: /delete/i,
    });
    fireEvent.click(deleteButton);
    await waitFor(() =>
      expect(screen.getByText(/usunięto zadanie/i)).toBeInTheDocument()
    );
    const message = screen.getByText(/usunięto zadanie/i);
    expect(message).toHaveTextContent(testData[1].id);
  });

  it('it shows error when DELETE todo fails', async () => {
    // in this case mock can be define at the top of the test
    server.use(failedDelete);
    render(<ToDoList />);
    const row = await screen.findByRole('row', {
      name: /grocery shopping 25\.08\.2023, 12:36 delete/i,
    });
    const deleteButton = within(row).getByRole('button', {
      name: /delete/i,
    });
    fireEvent.click(deleteButton);
    const message = await screen.findByText(/Invalid response/i);
    expect(message).toHaveTextContent('500');
  });

  it('sends POST after add is clicked using TODOs array', async () => {
    render(<ToDoList />);
    const addButton = screen.getByRole('button', {
      name: /add random/i,
    });
    fireEvent.click(addButton);
    const message = await screen.findByText(/dodano zadanie/i);
    expect(message).toHaveTextContent('TEST');
  });
  it('it shows error when POST todo fails', async () => {
    server.use(failedPost);
    render(<ToDoList />);
    const addButton = screen.getByRole('button', {
      name: /add random/i,
    });
    fireEvent.click(addButton);
    const message = await screen.findByText(/Invalid response/i);
    expect(message).toHaveTextContent('500');
  });
});
