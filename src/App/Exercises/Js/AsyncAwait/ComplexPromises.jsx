import { useState } from 'react';
import './styles.css';

const DELAY = 100; // 0.5 sec
let sharedTimestamt = Date.now();
function getElapsed() {
  const newTimestamp = Date.now();
  const result = newTimestamp - sharedTimestamt;
  sharedTimestamt = newTimestamp;
  return result;
}

const getSomething = (max = 10000, delay = DELAY) => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      console.time('inner-' + max);
      console.log(`inner-start-now[${max}]: ${getElapsed()}`);
      const result = Array(max)
        .fill(0)
        .map((_, index) => ({ index }));
      console.timeEnd('inner-' + max);
      resolve('Success: ' + result.length);
    }, delay);
  });
};

export const ComplexPromises = () => {
  const [results, setResults] = useState();

  const handleOneByOne = async () => {
    const times = 10000000; // 1e7
    console.time('primise-one-by-one');
    const p1 = await getSomething(times * 1);
    const p2 = await getSomething(times * 2);
    const p3 = await getSomething(times * 3);
    console.timeEnd('primise-one-by-one');
    setResults([p1, p2, p3].join(','));
  };

  const handleAll = async () => {
    const times = 10000000;
    console.time('primise-all');
    const p1 = getSomething(times * 1);
    const p2 = getSomething(times * 2);
    const p3 = getSomething(times * 3);
    const allDone = await Promise.all([p1, p2, p3]);
    // rejected, when any of the promises
    // in the given iterable rejects.
    // The rejection reason is the rejection reason
    // of the first promise that was rejected
    console.timeEnd('primise-all');
    setResults(allDone.join(','));
  };

  const handleAllSettled = async () => {
    const times = 10000000;
    console.time('primise-all-settled');
    const p1 = getSomething(times * 1);
    const p2 = getSomething(times * 2);
    const p3 = Promise.reject('Failed :(');
    const allSettled = await Promise.allSettled([p1, p2, p3]);
    console.timeEnd('primise-all-settled');
    // setResults(allSettled.join(',')); => Object
    setResults(
      allSettled
        .map(({ status, value, reason }) => `${status},${value},${reason}`)
        .join()
    );
  };

  // returns first Fulfilled promise or Rejects
  const handleAny = async () => {
    const times = 10000000;
    console.time('primise-any');
    const p3 = getSomething(times * 3, 1);
    const p2 = getSomething(times * 2, 2);
    const p1 = getSomething(times * 1, 3);
    // const p1 = Promise.reject('Failed :(');
    // const p2 = Promise.reject('Failed :(');
    // const p3 = Promise.reject('Failed :(');
    const anyFulfilled = await Promise.any([p1, p2, p3]);
    /* 
      promise fulfills when any of the input's promises fulfills,
      with this first fulfillment value. 
      It rejects when all of the input's promises reject.
      const p3 = Promise.reject('Failed :(');
      Uncaught (in promise) AggregateError: All promises were rejected
     */
    console.log(anyFulfilled);
    console.timeEnd('primise-any');
    setResults(anyFulfilled);
  };

  // returns first SETTLED promise
  const handleRace = async () => {
    const times = 10000000;
    console.time('primise-race');
    // const p3 = getSomething(times * 3, 1);
    const p2 = getSomething(times * 2, 2);
    const p1 = getSomething(times * 1, 3);
    const p3 = Promise.reject('Failed :(');
    const raceFirst = await Promise.race([p1, p2, p3]);
    console.log(raceFirst);
    console.timeEnd('primise-race');
    setResults(raceFirst);
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
      <button type="button" onClick={handleAny}>
        Hanlde Any
      </button>
      <button type="button" onClick={handleRace}>
        Hanlde Race
      </button>
      <button type="button" onClick={() => setResults('')}>
        Reset
      </button>
      <div>Result: {results}</div>
    </div>
  );
};
