import { useState } from 'react';
import './styles.css';

const SECOND = 1000;
const DELAY = SECOND * 1;

function loadUser() {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'John Doe' });
    }, DELAY);
  });
}

function loadUserDetails(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) resolve({ id: userId, age: 30, country: 'Poland' });
      reject('błąd server: nieudane wyszukanie dla userId: ' + userId);
    }, DELAY);
  });
}

function loadAllUserData(setValue) {
  loadUser()
    .then((user) => [user.name, loadUserDetails(user.id)])
    .then(([name, detailsPromise]) =>
      detailsPromise
        .then((details) =>
          setValue(`name: ${name}, ${JSON.stringify(details)}`)
        )
        .catch(setValue)
    );
}
export const AsyncAwaitExcercise2 = () => {
  const [promiseResult, setPromiseResult] = useState('empty');

  return (
    <div className="promise-excercise">
      <h3>Zadanie useEffect i Promise</h3>
      <button type="button" onClick={() => loadAllUserData(setPromiseResult)}>
        {(2 * DELAY) / SECOND} seconds delay
      </button>
      <button type="button" onClick={() => setPromiseResult('cleared')}>
        Clear
      </button>
      <div>result: {promiseResult}</div>
    </div>
  );
};
