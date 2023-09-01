import { calculate, sum } from './testing';

describe('having fun with testing', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('dwa równe 3', () => {
    const obj = {};
    const obj2 = {};
    // obj === obj2 => false
    expect(obj).not.toBe(obj2);
  });

  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    //       This won't work because of rounding error

    expect(value).toBeCloseTo(0.3); // This works.
  });

  test('calculate', () => {
    // const mockF = jest.fn().mockReturnValue(2);
    const mockF = jest.fn(() => 2);
    expect(calculate(mockF)).toBe(3);
  });
});
