import './styles.css';

// Fibonacci
function fib(n) {
  if (n <= 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

// sort Immune
const originalArr = [1, 3, 2, 100, 99];
const sortImmute = (originalArr) => {
  const sortedArr = [...originalArr];
  return sortedArr.sort((a, b) => a - b);
};

// sum of array elements
const sumArr = (...arr) => {
  let sumAnswer = 0;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'number') sumAnswer += arr[i];
    else return 'coś poszło nie tak';
  }
  return sumAnswer;
};

// average
const tablicaPierwotna = [
  { id: 0, name: 'Eve', grades: [4, 2, 4, 6, 1, 2, 3] },
  { id: 2, name: 'Eve2', grades: [4, 2, 4, 6, 1, 2, 5] },
];

const averageGrade = (tablicaPierwotna) => {
  let grade = 0;
  let zmienionaTablica = tablicaPierwotna.map((element) => ({ ...element }));
  for (let j = 0; j < zmienionaTablica.length; j++) {
    let gradesuser = zmienionaTablica[j].grades;
    for (let i = 0; i < gradesuser.length; i++) grade += gradesuser[i];
    grade = Math.round((grade / gradesuser.length) * 100) / 100;
    zmienionaTablica[j].grades = [grade];
    grade = 0;
  }
  return zmienionaTablica;
};
const nowaTablicaOcen = averageGrade(tablicaPierwotna);

export function Exercise() {
  return (
    <div>
      <ol>
        <li>
          napisz funkcje sortImmute, ktora przyjmuje jako parametr tablice cyfr
          i zwraca ją posortowana
          <div>oryginalna tablica: {originalArr.join(', ')}</div>
          <div>posortowana tablica: {sortImmute(originalArr).join(', ')}</div>
        </li>
        <li>
          napisz funkcję która jako parametr przyjmuje obiekt przechodzi po
          wszystkich jego polach i kapitalizuje im pierwszą literę
        </li>
        <li>
          napisz funkcję która jako parametr przyjmuje tablicę obiektów
          natomiast zwraca tablicę z wyliczoną wartością średnią zamiast ocen
          <div>{JSON.stringify(tablicaPierwotna)}</div>
          <div>{JSON.stringify(nowaTablicaOcen)}</div>
        </li>
        <li>
          stwórz funkcję, która przyjmuje dowolną liczbę argumentów za pomocą
          "...args" i zwraca ich sumę
          <div>Args sum: {sumArr(1, 2, 3, 4, 5)}</div>
        </li>
        <li>
          funkcja zwraca podany w argumencie element ciągu Fibonacciego -
          rekurencyjnie
          <div> fib: {fib(5)}</div>
          <div> fib: {fib(6)}</div>
          <div> fib: {fib(7)}</div>
          <div> fib: {fib(-5)}</div>
        </li>
      </ol>
    </div>
  );
}
