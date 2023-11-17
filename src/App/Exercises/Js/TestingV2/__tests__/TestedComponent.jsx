import { render, screen, waitFor } from '@testing-library/react';
import { TestedComponent } from '../TestedComponent';

const DELAY = 0;

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

const successfulFetch = () =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(testData),
      });
    }, DELAY); //  setTimeout even with 0 is important!
  });

const failedToFetch = () =>
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Failed to fetch')), DELAY);
  });

const failedFetch = () =>
  new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({
        ok: false,
        status: 500,
      });
    }, DELAY); //  setTimeout even with 0 is important!
  });

describe('TestedComponent', () => {
  beforeAll(() => {
    jest.spyOn(window, 'fetch');
  });
  beforeEach(() => {
    fetch.mockImplementation(successfulFetch);
  });
  afterAll(() => {
    fetch.mockRestore();
  });
  it('has proper header', async () => {
    render(<TestedComponent />);
    const heading = await screen.findByRole('heading', {
      name: /testing header/i,
    });
    expect(heading).toBeInTheDocument();
    // screen.logTestingPlaygroundURL();
  });
  it('has renders list of tasks', async () => {
    render(<TestedComponent />);
    const listItem = await screen.findByRole('cell', {
      name: /grocery shopping/i,
    });
    // screen.logTestingPlaygroundURL();
    expect(listItem).toBeInTheDocument();
  });
  it('it shows error when GET todo fails', async () => {
    fetch.mockImplementation(failedToFetch);
    render(<TestedComponent />);
    const message = await screen.findByText(/status: failed to fetch/i);
    expect(message).toBeInTheDocument();
  });
  it('it shows error when GET todo receives 500 from server', async () => {
    fetch.mockImplementation(failedFetch);
    render(<TestedComponent />);
    const message = await screen.findByText(/status: server error/i);
    expect(message).toBeInTheDocument();
  });
});
