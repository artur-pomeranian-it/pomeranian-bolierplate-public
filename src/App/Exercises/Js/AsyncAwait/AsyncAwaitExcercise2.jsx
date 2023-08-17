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

async function loadAllUserData(setValue) {
  try {
    const user = await loadUser();
    const userData = await loadUserDetails(user.id);
    setValue(`name: ${user.name}, ${JSON.stringify(userData)}`);
  } catch (err) {
    setValue(err);
  }
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
