import { useEffect, useState } from 'react';

const getSomeResults = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) resolve('Success');
      if (!success) reject('Rejected');
    }, 1000);
  });
};

export function AsyncAwaitExample3() {
  const [promiseResult, setPromiseResult] = useState('empty');
  const [reset, setReset] = useState(0);

  useEffect(() => {
    async function handle() {
      try {
        const data = await getSomeResults();
        setPromiseResult(data);
      } catch (error) {
        setPromiseResult(error);
      } finally {
        // console.log('Zakończono');
      }
    }

    handle();
  }, [reset]);

  return (
    <div className="promise-excercise">
      <h3>Async Await Example 3 - with useEffect</h3>
      <button type="button" onClick={() => setReset((val) => val + 1)}>
        Start
      </button>
      <button type="button" onClick={() => setPromiseResult('cleared')}>
        Clear
      </button>
      <div>result: {promiseResult}</div>
    </div>
  );
}
