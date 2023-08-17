import { useState } from 'react';
import './styles.css';

const DELAY = 100; // 0.5 sec

const getSomething = (max = 10000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Array(max)
        .fill(0)
        .map((_, index) => ({ index }));

      resolve('Success' + result.length);
    }, DELAY);
  });
};

export const ComplexPromises = () => {
  const [results, setResults] = useState();

  const handleOneByOne = async () => {
    const times = 10000;
    console.time('primise-one-by-one');
    const p1 = await getSomething(times);
    const p2 = await getSomething(times);
    const p3 = await getSomething(times);
    console.timeEnd('primise-one-by-one');
    setResults([p1, p2, p3].join(','));
  };

  const handleAll = async () => {
    const times = 10000;
    console.time('primise-one-by-one');
    const p1 = getSomething(times);
    const p2 = getSomething(times);
    const p3 = getSomething(times);
    const allDone = await Promise.all([p1, p2, p3]);
    // rejected, when any of the promises
    // in the given iterable rejects.
    // The rejection reason is the rejection reason
    // of the first promise that was rejected
    console.timeEnd('primise-one-by-one');
    setResults(allDone.join(','));
  };

  const handleAllSettled = async () => {
    const times = 10000;
    console.time('primise-one-by-one');
    const p1 = getSomething(times);
    const p2 = getSomething(times);
    const p3 = Promise.reject('Failed :(');
    const allSettled = await Promise.allSettled([p1, p2, p3]);
    console.timeEnd('primise-one-by-one');
    // setResults(allSettled.join(',')); => Object
    setResults(
      allSettled
        .map(({ status, value, reason }) => `${status},${value},${reason}`)
        .join()
    );
  };

  return (
    <div>
      <h3>Async Await Example 1</h3>
      <button type="button" onClick={handleOneByOne}>
        Handle One by One
      </button>
      <button type="button" onClick={handleAll}>
        Hanlde All
      </button>
      <button type="button" onClick={handleAllSettled}>
        Hanlde All Settled
      </button>
      <button type="button" onClick={() => setResults('')}>
        Reset
      </button>
      <div>Result: {results}</div>
    </div>
  );
};
