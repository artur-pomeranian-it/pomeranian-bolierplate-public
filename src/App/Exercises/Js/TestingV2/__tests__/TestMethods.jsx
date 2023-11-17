import {
  TODO_NAMES,
  getNumberOfTasks,
  getRandomInt,
  getRandomTaskName,
  sum,
} from '../TestedComponent';

describe('sum', () => {
  test('returns sum of numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
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
