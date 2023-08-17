import { useEffect, useState } from 'react';
import './styles.css';

const DELAY = 500; // 0.5 sec
/*

napisać useEffect'a oraz stworzyć Promise'a,
który zostanie spełniony i wyświetli nam 
"I'm resolved :)"  używamy async/await
użyjmy useState do zapisania odpowiedzi z promisa.

 */
const getSomeResults = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("I'm resolved :)");
    }, DELAY);
  });
};

export const AsyncAwaitExcercise1 = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handle = async () => {
      try {
        const someResults = await getSomeResults();
        setResults(someResults);
      } catch (err) {
        setResults(err);
      }
    };
    handle();
  }, []);

  return (
    <div>
      <h3>Async Await Ćwiczenie - with useEffect</h3>
      <div>Result: {results}</div>
    </div>
  );
};
