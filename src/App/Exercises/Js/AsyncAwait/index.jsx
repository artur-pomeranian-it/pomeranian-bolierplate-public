import { AsyncAwaitExample1 } from './AsyncAwaitExample1';
import { AsyncAwaitExample2 } from './AsyncAwaitExample2';
import { AsyncAwaitExample3 } from './AsyncAwaitExample3';
import { AsyncAwaitExcercise1 } from './AsyncAwaitExcercise1';
import { AsyncAwaitExcercise2 } from './AsyncAwaitExcercise2';
import { PromiseExcercise } from './PromiseExcercise';
import { PromiseMethods } from './PromiseMethods';
import { PromisyExample1 } from './PromisyExample1';
import { PromisyExample2 } from './PromisyExample2';
import { PromisyExample3 } from './PromisyExample3';
import { TryCatchFinally } from './TryCatchFinally';

import './styles.css';

export const AsyncAwait = () => {
  return (
    <div>
      <h1>Async, Await, Promise methods</h1>
      <h2>Powtórka z poprzednich zajęć</h2>
      <PromisyExample1 />
      <PromisyExample2 />
      <PromisyExample3 />
      <TryCatchFinally />
      <PromiseExcercise />
      <h2>Async Await - Teoria</h2>
      <AsyncAwaitExample1 />
      <AsyncAwaitExample2 />
      <AsyncAwaitExample3 />
      <h2>Async Await - Ćwiczenia</h2>
      <AsyncAwaitExcercise1 />
      <AsyncAwaitExcercise2 />
      <h2>Promise methods</h2>
      <PromiseMethods />
    </div>
  );
};
