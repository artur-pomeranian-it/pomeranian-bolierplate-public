import { useState } from 'react';
import './styles.css';

const DELAY = 500; // 0.5 sec

export const AsyncAwaitExample2 = () => {
  const [results, setResults] = useState();
  const handleOnClick = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) resolve('Success');
        if (!success) reject('Rejected');
      }, DELAY);
    });

    try {
      promise.then((res) => setResults(res));

      // .then(
      //   () => {},
      //   (error) => {
      //     console.log('New', error);
      //   }
      // );

      // await promise.then((res) => setResults(res));
    } catch (error) {
      setResults(error);
    } finally {
      setResults((current) => current + '|Finally');
    }
  };
  return (
    <div>
      <h3>Async Await Example 2 - mixing with .then .catch</h3>
      <button type="button" onClick={handleOnClick}>
        Start
      </button>
      <button type="button" onClick={() => setResults('')}>
        Reset
      </button>
      <div>Result: {results}</div>
    </div>
  );
};
