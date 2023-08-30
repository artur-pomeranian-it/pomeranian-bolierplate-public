import { sum, handleOnClick } from './Testing';

describe('Testing Kompent with examples', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('adds 1 + 2 not to equal 7', () => {
    expect(sum(1, 2)).not.toBe(7);
  });

  it('adds 5 + 2 to equal 7', () => {
    expect(sum(5, 2)).toBe(7);
  });
});

test('handleOnClick calls set state function', () => {
  const setIsVisibleMock = jest.fn();
  handleOnClick(true, setIsVisibleMock);
  expect(setIsVisibleMock).toHaveBeenCalled();
});
test('handleOnClick calls set state function with argument', () => {
  const setIsVisibleMock = jest.fn();
  handleOnClick(true, setIsVisibleMock);
  expect(setIsVisibleMock).toHaveBeenCalledWith(false);
});

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  // This won't work because of rounding error
  //   expect(value).toBe(0.3);
  // This works.
  expect(value).toBeCloseTo(0.3);
});

test('the data is peanut butter', async () => {
  const result = 'peanut butter';
  const data = await Promise.resolve(result);
  expect(data).toBe(result);
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await await Promise.reject('error');
  } catch (e) {
    expect(e).toMatch('error');
  }
});
