/* 

Co to są testy? 
  -> Anslysis, Design, Build, Test
  -> Od wymagań do akceptacji wymagań
    -> Test Case

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
  // handleAddRandom,
} from './toDoHelpers';

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

describe('getAllTodos', () => {
  const onSuccess = jest.fn();
  const onFailure = jest.fn();

  beforeAll(() => {
    jest.spyOn(window, 'fetch');
  });

  beforeEach(() => {
    onFailure.mockClear();
    onSuccess.mockClear();
  });

  it('returns data on success', async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve('some data') })
    );

    await getAllTodos(onSuccess, onFailure);
    // expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith('some data');
    expect(onFailure).not.toHaveBeenCalled();
  });
  it('returns some data again on success', async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve('some data') })
    );
    await getAllTodos(onSuccess, onFailure);
    // expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledWith('some data');
    expect(onFailure).not.toHaveBeenCalled();
  });

  it('returns error message on failure', async () => {
    fetch.mockRejectedValue('error message');
    await getAllTodos(onSuccess, onFailure);
    expect(onFailure).toHaveBeenCalledWith('error message');
  });
  it('throws Error when response NOK', async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: Promise.resolve('Client Error'),
      })
    );
    await getAllTodos(onSuccess, onFailure);
    expect(onFailure).toHaveBeenCalledWith(Error('Invalid response code: 500'));
  });
});

afterAll(() => {
  //  !important
  // fetch.mockRestore();
  jest.restoreAllMocks();
});

// describe('what happened to fetch', () => {
//   it('fetch works', async () => {
//     try {
//       const resp = fetch('http://localhost:3333/api/todo');
//       // console.log('WHAT IS THIS?', JSON.stringify(resp), resp);
//       //   if (!resp.ok) throw new Error('Invalid response code: ' + resp.status);
//     } catch (error) {
//       console.log('Error', error);
//     }
//   });
// });

/*
  this is from chat 
  describe('handleAddRandom', () => {
  let mockFetch;
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('successfully adds a random task', async () => {
    const loadToDoList = jest.fn();
    const setMessage = jest.fn();

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ title: 'New Task' }),
    });

    await handleAddRandom(loadToDoList, setMessage);

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3333/api/todo', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        title: 'mocked-random-task-name',
        note: 'mocked-random-task-name',
      }),
    });

    expect(setMessage).toHaveBeenCalledWith('Dodano zadanie - New Task');
    expect(loadToDoList).toHaveBeenCalled();
  });

  it('handles errors', async () => {
    const loadToDoList = jest.fn();
    const setMessage = jest.fn();

    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await handleAddRandom(loadToDoList, setMessage);

    expect(setMessage).toHaveBeenCalledWith('Network error');
  });
}); */
