import { useState } from 'react';
import './styles.css';

export const PromisesAndMe = () => {
  const [sum, setSum] = useState(0);
  const [lista, setLista] = useState([]);

  // kod synchroniczny
  // jedna linijka po linijce
  // łatwiejsze zrozumienie
  function test1() {
    console.log('test1');
  }
  function test2() {
    console.log('test2');
  }

  console.log(1);
  console.log(2);
  test1();
  test2();
  // kod asynchroniczny
  // nie jest wykonywany po koei
  // oczekuje na COŚ, co zakończy się w czasie późniejszym
  console.log('before timeout');
  setTimeout(() => console.log('timeout 1'), 0);
  console.log('after timeout');
  // przykłady operacji asynchronicznych:
  // setTimout, setInterval
  // oczekiwanie na odpowiedź serwera z treścią strony, plikiem, itp.

  // kod synchroniczy blokuje przeglądarkę
  // ASYNCHRONICZNOŚĆ -> wydajniejsze, bardziej płynne działanie strony i interakcje użytkownika ze stroną/aplikacją
  const freeze = () =>
    Array(1000000)
      .fill(0)
      .map((_, index) => <li key={index}>{index}</li>);

  // problemy/wyzwania z obługą błedów w kodzie asynchronicznym
  try {
    console.log('trying something');
    setTimeout(() => {
      try {
        throw new Error('coś poszło nie tak');
      } catch (error) {
        console.log('błąd set Timeout', error.message);
      }
    }, 10);
  } catch (error) {
    console.log('złapałem błąd', error);
  }

  // Asynchroniczność pozwala na równoległe wykonanie operacji

  // programowanie asynchroniczne problem wyścigów (RACE CONDITION)
  // tam gdzie wiele operacji może być wykonywanych jednocześnie
  // pojawia się problem nieoczekiwynaych błędów

  // funkcja callback
  function jestemCallbackiem(num) {
    console.log('jestem callbackiem, wywoałana z paramentrem: ', num);
  }

  // funcja z callbackiem
  function handleOnClick(callback) {
    console.log('wykorzystuję callback');
    callback(10);
  }

  const raceCondition = () => {
    let counter = 0;
    const delay = 2000;
    setInterval(() => {
      const newValue = counter + 10;
      console.log('dodano, wynik =', newValue);
      setTimeout(() => (counter = newValue), 0);
    }, delay);
    setInterval(() => {
      const newValue = counter - 10;
      console.log('minus, wynik =', newValue);
      setTimeout(() => (counter = newValue), 0);
    }, delay);
  };

  //Promise first example
  // fetchData funkcja do generowania promisów
  const fetchData = () => {
    // zwracymy naszą obietnicę (Promise)
    return new Promise((resolve, reject) => {
      // resolve -> funkcja którą wywołamy gdy sukces
      // reject -> funkcja którą wywołamy, gdy jakiś błąd
      setTimeout(() => {
        // w przykładanie symulujemy zachowanie serwera
        const data = { id: 1, name: 'Jan' };
        const err = Math.random() > 0.5 ? 'błąd serwera' : null;
        if (err) {
          // jeżeli błąd to odrzucamy obietnicę
          reject(err);
        }

        // jeżeli ok, to rozwiązujemy obietnicę
        resolve(data);
      }, 1000);
    });
  };

  const handleFetchData = () => {
    fetchData().then(
      (data) => {
        console.log('Dane użytkownika: ', JSON.stringify(data));
      },
      (error) => {
        console.log('wystąpił błąd: ', error);
      }
    );
  };

  // inny sposób wykorzystania promisów
  const handleFetchData2 = () => {
    fetchData()
      .then((data) => {
        console.log('Dane użytkownika: ', JSON.stringify(data));
      })
      .catch((error) => {
        console.log('wystąpił błąd: ', error);
      });
  };

  const resolvedPromise = Promise.resolve('Sukces');
  resolvedPromise
    .then((response) => console.log('Resolved value =', response))
    .catch((error) => console.log('Rejected with error = ', error));

  const rejectedPromise = Promise.reject('Failure');
  rejectedPromise
    .then((response) => console.log('Example2: Resolved value =', response))
    .catch((error) => console.log('Example2: Rejected with error = ', error));

  // PRomises - states
  // PENDING - stan początkowy, w którym Promise nie został jeszcze rozwiązany ani odrzucony
  // w tym stanie możemy zarówno rozwiązać lub odrzucić Promise
  const handlePending = () => {
    const pendingPromise = new Promise((resolve, reject) => {});
    console.log('pendingPromise:', pendingPromise);
  };

  // FULFILLED - stan w którym obietnica została rozwiązana
  // w tym stanie NIE możemy rozwiązać lub odrzucić Promise
  const handleFulfilled = () => {
    const fulfilledPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('sukces');
      }, 500);
    });
    fulfilledPromise.then(() =>
      console.log('fulfilledPromise:', fulfilledPromise)
    );
    // console.log('fulfilledPromise:', fulfilledPromise)
  };

  // REJECTED - stan w którym obietnica została odrzucona
  // w tym stanie NIE możemy rozwiązać lub odrzucić Promise
  const handleRejected = () => {
    const rejectedPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('sukces'));
      }, 500);
    });
    rejectedPromise
      .then(() => console.log('rejectedPromise:', rejectedPromise))
      .catch((errr) =>
        console.log('rejectedPromise', rejectedPromise, errr.message)
      );
  };

  const promiseFunction = (size, delay) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (size > 20) {
          reject('Size too large, max 20');
        } else {
          const tablica = Array(size)
            .fill(0)
            .map((_, index) => index)
            .map((id) => <li key={id}>{id}</li>);
          resolve(tablica);
        }
      }, delay);
    });

  const handleGetList = () => {
    promiseFunction(10, 1000)
      .then((result) => {
        setLista(result);
        // throw new Error('coś poszło nie tak!!!!!!!!!!!!!!!!!!!!!1');
        return 'udało się pobrać';
      })
      .then((message) => console.log('!!!!!!!!chained promise', message))
      .catch((error) => console.log('Błąd pobrania listy: ', error))
      .finally(() => console.log('zapisz logi'));
  };

  return (
    <div>
      <h1>Promisy w JavaScript</h1>
      <h2>Intro</h2>
      <button onClick={freeze}>Freez</button>
      <button onClick={() => handleOnClick(setSum)}>
        Przycisk z callbackiem
      </button>
      <p>sum = {sum}</p>
      <button onClick={() => handleOnClick(jestemCallbackiem)}>
        Przycisk z callbackiem 2
      </button>
      <button onClick={raceCondition}>race condition</button>
      <h2>Promise</h2>
      <p>
        Obiekt który pozwala połączyć wykonanie asynchronicznej operacji z kodem
        oczekujący na jej zakończenie (wynik)
      </p>
      <button onClick={handleFetchData}>Fetch data</button>
      <button onClick={handleFetchData2}>Fetch data 2</button>
      <h3>Stany promisów</h3>
      <button onClick={handlePending}>Pending</button>
      <button onClick={handleFulfilled}>Fulfilled</button>
      <button onClick={handleRejected}>Rejected</button>
      <h2>Praktyka/Ćwiczenia</h2>
      <button onClick={handleGetList}>Pobierz listę</button>
      <p>lista elementów:</p>
      <ul>{lista}</ul>
    </div>
  );
};
