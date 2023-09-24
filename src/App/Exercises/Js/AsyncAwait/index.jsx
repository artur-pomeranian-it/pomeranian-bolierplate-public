import { AsyncAwaitExample1 } from './AsyncAwaitExample1';
import { AsyncAwaitExample2 } from './AsyncAwaitExample2';
import { AsyncAwaitExample3 } from './AsyncAwaitExample3';
import { ComplexPromises } from './ComplexPromises';
import { PromisyExample1 } from './PromisyExample1';
import { PromisyExample2 } from './PromisyExample2';
import { PromisyExample3 } from './PromisyExample3';
import { PromisyExample4 } from './PromisyExample4';
import './styles.css';

export const AsyncAwait = () => {
  return (
    <div>
      <h1>Async, Await, Promise methods</h1>
      <h2>Powtórka z poprzednich zajęć</h2>
      <PromisyExample1 />
      <PromisyExample2 />
      <PromisyExample3 />
      <PromisyExample4 />
      <h2>Async Await</h2>
      <p>ES6 vs ES7</p>
      <AsyncAwaitExample1 />
      <AsyncAwaitExample2 />
      <AsyncAwaitExample3 />
      <h2>Zarządzanie asynchronicznością</h2>
      <ComplexPromises />
    </div>
  );
};
