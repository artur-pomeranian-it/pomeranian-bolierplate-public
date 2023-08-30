import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { getRandomInt, ToDoList } from './TodoList';
import { act } from 'react-dom/test-utils';

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

const baseURL = 'http://localhost:3333';
const basePath = `${baseURL}/api/todo`;
const DELAY = 100;
const server = setupServer(
  rest.get(basePath, (_req, res, ctx) => {
    return res(ctx.delay(DELAY), ctx.json(testData));
  }),
  rest.post(basePath, (req, res, ctx) => {
    return res(ctx.delay(DELAY), ctx.json({ title: 'TEST' }));
  }),
  rest.delete(`${basePath}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(ctx.delay(DELAY), ctx.json({ id }));
  })
);

describe('getRandomIng', () => {
  // 5  => random = 0.9999 => 4
  beforeAll(() => {
    jest.spyOn(Math, 'random');
  });
  it('returns (param -1) when random is close to one', () => {
    // jest.fn().mockImplementation;
    Math.random.mockImplementation(() => 0.999);
    expect(getRandomInt(8)).toBe(7);
  });
  it('returns 0 when random is close to 0', () => {
    Math.random.mockImplementation(() => 0.0001);
    expect(getRandomInt(8)).toBe(0);
  });
  it('returns 0 when random is 0', () => {
    Math.random.mockReturnValue(0);
    expect(getRandomInt(8)).toBe(0);
  });
});

describe('ToDoList', () => {
  beforeAll(() => {
    // jest.spyOn(window, 'fetch');
    server.listen();
  });
  afterAll(() => {
    server.close();
    // jest.restoreAllMocks();
  });
  afterEach(() => {
    server.resetHandlers();
  });

  it('has header = todo list', async () => {
    // fetch.mockImplementation(() =>
    //   Promise.resolve({ ok: true, json: () => Promise.resolve(testData) })
    // );
    render(<ToDoList />);
    // await act(async () => {
    const heading = await screen.findByRole('heading', {
      name: /todo list/i,
    });
    expect(heading).toBeInTheDocument();
    // });
  });
  it('has refresh button', async () => {
    // fetch.mockImplementation(() =>
    //   Promise.resolve({ ok: true, json: () => Promise.resolve(testData) })
    // );
    render(<ToDoList />);
    // await act(async () => {
    const refreshButton = screen.getByRole('button', {
      name: /refresh/i,
    });
    expect(refreshButton).toBeInTheDocument();
    // });
  });
  it('returns list with elements on load', async () => {
    // fetch.mockImplementation(() =>
    //   Promise.resolve({ ok: true, json: () => Promise.resolve(testData) })
    // );
    render(<ToDoList />);
    // await act(async () => {
    const refreshButton = screen.getByRole('button', {
      name: /refresh/i,
    });
    expect(refreshButton).toBeInTheDocument();
    // });
    const row = await screen.findByRole('row', {
      name: /grocery shopping 25\.08\.2023, 12:36 delete/i,
    });

    const deleteButton = within(row).getByRole('button', {
      name: /delete/i,
    });

    // expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    await waitFor(() =>
      expect(screen.getByText(/usunięto zadanie/i)).toBeInTheDocument()
    );
    screen.logTestingPlaygroundURL();
  });
});
