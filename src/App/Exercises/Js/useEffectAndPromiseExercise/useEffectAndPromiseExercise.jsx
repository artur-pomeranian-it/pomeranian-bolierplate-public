import { useEffect, useState } from 'react';
import './styles.css';

const SECOND = 1000;
const DELAY = SECOND * 5;

const promiseFunction = (abort) => (resolve, reject) => {
  setTimeout(
    (abort) => {
      console.log('Running after timeout with abort:', abort.shouldAbort);
      abort.shouldAbort ? reject('aborted') : resolve('sukces');
    },
    DELAY,
    abort
  );
};

export const UseEffectAndPromiseExercise = () => {
  const [promiseResult, setPromiseResult] = useState('empty');

  useEffect(() => {
    let abort = { shouldAbort: false };
    const promise = new Promise(promiseFunction(abort));
    promise.then((message) => setPromiseResult(message)).catch(console.warn);

    return () => (abort.shouldAbort = true);
  }, []);

  return (
    <div>
      <h1>Zadanie useEffect i Promise</h1>
      <div>5 seconds delay</div>
      <div>result:{promiseResult}</div>
    </div>
  );
};
