import { render, screen } from '@testing-library/react';
import { getRandomInt, ToDoList } from './TodoList';

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
  it('has header = todo list', () => {
    render(<ToDoList />);
    const heading = screen.getByRole('heading', { name: /todo list/i });
    expect(heading).toBeInTheDocument();
  });
});
