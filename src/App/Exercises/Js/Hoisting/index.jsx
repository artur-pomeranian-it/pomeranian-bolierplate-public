import { useState } from 'react';

import './styles.css';

let number = 1;

function multiplyBy(factor = 1, ...rest) {
  const result = [];

  for (const number of rest) {
    result.push(number * factor);
  }

  console.log(number);

  return result.join(',');
}

function add(a) {
  let score = a;

  const addMore = (b) => {
    score = score + b;

    return addMore;
  };

  addMore.result = () => score;

  return addMore;
}

const addNumbersFrom1ToValue = (value, result) => {
  if (!result) return addNumbersFrom1ToValue(value - 1, ['random value']);
  const newResult = [...result, 'new random'];
  return value === 1 ? newResult : addNumbersFrom1ToValue(value - 1, newResult);
};
const addFrom1ToValue = (value) => {
  return new Array(value - 1)
    .fill(0)
    .reduce((prev) => [...prev, 'new random'], ['random value']);
};
console.time('rec');
addNumbersFrom1ToValue(2000);
console.timeEnd('rec');
console.time('no-rec');
addFrom1ToValue(2000);
console.timeEnd('no-rec');

export function Exercise() {
  const [numb, setNumb] = useState(0);

  const changeNumber = (number) => (event) => {
    setNumb(number);
  };

  return (
    <>
      <div>{multiplyBy(3, 1, 1, 1, 1)}</div>
      <div>Rec {addNumbersFrom1ToValue(5)}</div>
      <div>No Rec {addFrom1ToValue(5)}</div>
      <div>{add(3)(4)(5)(2)(1).result()}</div>

      {numb}

      {[1, 2, 3, 4, 5].map((number) => (
        <div key={number} onClick={changeNumber(number)}>
          {number}
        </div>
      ))}
    </>
  );
}
