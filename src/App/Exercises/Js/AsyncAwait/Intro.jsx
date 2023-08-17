import { PromisyExample1 } from './PromiseExample1';
import { PromisyExample2 } from './PromisyExample2';
import { PromisyExample3 } from './PromisyExample3';
import { PromisyExample4 } from './PromisyExample4';
import { TryCatchFinally } from './TryCatchFinally';
import { AsyncAwaitExample1 } from './AsyncAwaitExample1';
import { AsyncAwaitExample2 } from './AsyncAwaitExample2';
import { AsyncAwaitExample3 } from './AsyncAwaitExample3';

import './styles.css';
import { AsyncAwaitExcercise1 } from './AsyncAwaitExcercise1';
import { AsyncAwaitExcercise2 } from './AsyncAwaitExcercise2';
import { ComplexPromises } from './ComplexPromises';

export const Intro = () => {
  return (
    <section>
      <h2>Powtórka z poprzednich zajęć</h2>
      <PromisyExample1 />
      <PromisyExample2 />
      <PromisyExample3 />
      <PromisyExample4 />
      <TryCatchFinally />
      <h2>Async Await</h2>
      <p>ES6 vs ES7</p>
      <AsyncAwaitExample1 />
      <AsyncAwaitExample2 />
      <AsyncAwaitExample3 />
      <h2>Ćwiczenia</h2>
      <AsyncAwaitExcercise1 />
      <AsyncAwaitExcercise2 />
      <h2>Zarządzanie asynchronicznością</h2>
      <ComplexPromises />
    </section>
  );
};
