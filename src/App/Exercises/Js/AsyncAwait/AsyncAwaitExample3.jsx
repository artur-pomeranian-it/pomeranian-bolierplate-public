import { useEffect, useState } from 'react';
import './styles.css';

const DELAY = 500; // 0.5 sec

const getSomeResults = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) resolve('Success');
      if (!success) reject('Rejected');
    }, DELAY);
  });
};

export const AsyncAwaitExample3 = () => {
  const [results, setResults] = useState([]);
  const [reset, setReset] = useState(0);

  useEffect(() => {
    console.log('useEffect-Fist');
    const handle = async () => {
      try {
        console.log('useEffect-Second');
        const someResults = await getSomeResults();
        console.log('useEffect-Third');
        setResults(someResults);
      } catch (err) {
        setResults(err);
      }
    };
    handle();
    console.log('useEffect-Fourth');
  }, [reset]);

  return (
    <div>
      <h3>Async Await Example 2 - with useEffect</h3>
      <button
        type="button"
        onClick={() => {
          setResults();
          setReset((current) => current + 1);
        }}
      >
        Reset
      </button>
      <div>
        Result[{reset}]: {results}
      </div>
    </div>
  );
};
