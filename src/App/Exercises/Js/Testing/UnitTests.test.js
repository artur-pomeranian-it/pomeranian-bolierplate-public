/* 
    Co to są testy? 
    Rodzaje Testów: 
    >    jednostkowe(Unit Testy),
    >    integracyjne (Integration),
        e2e,
        manualne,
    >    User Interface (Selenium, Cypres),
        UAT,
        testy regresyjne
        smoke testy,
        wydajnościowe,
        security,
        disaster recovery,
*/

/* 
    V-model 
    Piramida Testów (Testing pyramid)
    Puchar Testów (Testing trophy)
*/

/* 
    TDD - Test Driven Development
    BDD - Business Driven Development - BDD is a development technique that focuses on the system’s behavior
    ATDD - Acceptance Test-Driven Devlopment - ATDD is a technique similar to BDD, focusing more on capturing the requirements
    (Cucamber)
*/

//  Testy uczą / wymuszają pisanie lepszego kodu

/* 
    Zależności:

    więcej testów -
        + więcej pewności co do zachowania kodu, 
        + mniejsze ryzyko wprowadzania zmian
        - trzeba pisać testy
        - zmiana w kodzie może wymagać zmiany testów
        - false positives, false negatives (czyli gdzie jest błąd)            

    im mniej testów:
        + mniej pracy (nie trzeba pisać testów)
        + nie trzeba zmieniać testów w przypadku zmian
        - pełna regresja przy każdej zmianie (ogrom pracy)
        - wydłużony czas pomiędzy wdrożeniami
        - ryzyko że jakakolwiek zmiana zepsuje wydania
        - code freeze
        - dużo czasu poświęcane na obsługę błędów mniej na kodowanie
        - zakaz kodowania
        
    
    Po co testować, skoro domyślasz się że powinno działać?
    Ja płacę za nowe funkcjonalności, róbcie więcej featcherów, a nie testy będziecie pisać!
    Testy nie mają żadnej wartości dla klienta, a  jedynie gotowa funkcjonalność!
    Nie po to zatrudniam programistów żeby pisali testy, od tego są testerzy/UAT!
    Przecież po to zatrudniam doświadczonych programistów żeby pisali szybki kod, więc po co testy wydajnościowe?
    Testy wydajnościowe, security zrobi się przed wdrożeniem bo takie są wymagania!
*/

// https://jestjs.io/docs/getting-started

import {
  getNumberOfTasks,
  formatDate,
  getRandomTaskName,
  getRandomInt,
  getAllTodos,
  TODOS,
} from './ToDoList';

// Matchers
// https://jestjs.io/docs/using-matchers

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

// ćwiczenie napisać testy dla formatDate
describe('formatDate', () => {
  it('formats a valid date string', () => {
    const inputDate = '2023-08-24T12:34:56.789Z';
    const formattedDate = formatDate(inputDate);
    expect(formattedDate).toMatch(/^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}$/);
  });

  it('returns "Invalid Date" for an invalid date string', () => {
    const invalidDate = 'invalid-date';
    const formattedDate = formatDate(invalidDate);
    expect(formattedDate).toBe('Invalid Date');
  });
});

describe('tutorial examples', () => {
  test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    // This won't work because of rounding error
    //   expect(value).toBe(0.3);
    // This works.
    expect(value).toBeCloseTo(0.3);
  });

  // Testing Asynchronous Code
  // https://jestjs.io/docs/asynchronous

  it('promise resolves with data from server', async () => {
    const successMessage = 'fetch data';
    const data = await Promise.resolve(successMessage);
    expect(data).toBe(successMessage);
    expect(Promise.resolve('123')).resolves.toBe('123');
  });

  it('promise fails with error messsage', async () => {
    const failureMessage = 'connection error';
    try {
      await new Promise((_, reject) => {
        reject(failureMessage);
      });
    } catch (error) {
      expect(error).toMatch(failureMessage);
      expect(Promise.reject('321')).rejects.toMatch('321');
    }
  });
});

describe('getRandomTaskName', () => {
  it('returns lement from examples list', () => {
    const randomFunction = jest.fn(() => 2);
    expect(getRandomTaskName(randomFunction)).toBe(TODOS.at(2));
  });
  it('calls random function with array size - 1', () => {
    const randomFunction = jest.fn(() => 2);
    getRandomTaskName(randomFunction);
    expect(randomFunction).toHaveBeenCalledWith(TODOS.length);
  });
});

describe('getRandomInt', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random');
  });
  beforeEach(() => Math.random.mockClear());
  it('returns (param -1) when random is close to one', () => {
    Math.random.mockImplementation(() => 0.999);
    expect(getRandomInt(8)).toBe(7);
    expect(Math.random).toHaveBeenCalledTimes(1);
  });
  it('returns 0 when random is close to zero', () => {
    Math.random.mockImplementation(() => 0.0001);
    expect(getRandomInt(8)).toBe(0);
    expect(Math.random).toHaveBeenCalledTimes(1);
  });
  it('returns 0 when random is zero', () => {
    Math.random.mockReturnValue(0);
    expect(getRandomInt(8)).toBe(0);
  });
});

describe('getAllTodos', () => {
  const onSuccess = jest.fn();
  const onFailure = jest.fn();

  beforeEach(() => {
    onFailure.mockClear();
    onSuccess.mockClear();
    console.log('testing - before');
  });

  it('returns data on success', async () => {
    jest
      .spyOn(window, 'fetch')
      .mockImplementation(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve('some data') })
      );

    await getAllTodos(onSuccess, onFailure);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith('some data');
    expect(onFailure).not.toHaveBeenCalled();
  });
  it('returns data on success', async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve('some data') })
    );
    await getAllTodos(onSuccess, onFailure);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith('some data');
    expect(onFailure).not.toHaveBeenCalled();
  });

  it('returns data on success', async () => {
    window.fetch.mockRejectedValue('error message');
    await getAllTodos(onSuccess, onFailure);
    expect(onFailure).toHaveBeenCalled();
    expect(onFailure).toHaveBeenCalledWith('error message');
  });
});
