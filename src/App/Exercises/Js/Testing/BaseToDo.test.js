import { rest } from 'msw';
import { ToDoList } from './BaseToDo';
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

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('BaseToDo', () => {
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
    server.use(
      rest.get(basePath, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<ToDoList />);
    // await waitFor(() => screen.getByText(/Invalid response/i));
    const message = await screen.findByText(/Invalid response/i);
    expect(message).toHaveTextContent('500');
  });

  it('it hides error after 2 seconds', async () => {
    server.use(
      rest.get(basePath, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
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
    server.use(
      rest.delete(`${basePath}/:id`, (_req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
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
    server.use(
      rest.post(basePath, (_req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<ToDoList />);
    const addButton = screen.getByRole('button', {
      name: /add random/i,
    });
    fireEvent.click(addButton);
    const message = await screen.findByText(/Invalid response/i);
    expect(message).toHaveTextContent('500');
  });
});
