import { useState } from 'react';

export function AsyncAwaitExcercise1() {
  const [result, setResult] = useState();
  return (
    <div>
      <h3>Async Await Ćwiczenie - with useEffect</h3>
      <div>Result: I'm resolved!</div>
    </div>
  );
}
