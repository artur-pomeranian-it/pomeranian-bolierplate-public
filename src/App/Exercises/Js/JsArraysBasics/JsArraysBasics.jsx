import './styles.css';

export const JsArraysBasics = () => {
  function exampleArraySyntax() {
    const tablica1 = [
      1,
      2,
      'Hello',
      [true, false],
      { firstName: 'Donald', lastName: 'Duck' },
    ];
    return tablica1;
  }

  function exampleAddingValuesToArrays() {
    const tablica1 = [1, 2];
    tablica1.push(3); // modyfikuje tablicę
    tablica1.push('Mexico');
    const tablica2 = new Array(4); // z new
    tablica2.fill(1234);
    const tablica3 = Array(3); // bez użycia new też można
    tablica3[0] = 'index 0'; // ustawia wartość pierwszego elementu tablicy
    tablica3[1] = 'index 0';
    tablica3[2] = 'index 2'; // ustawia wartość otatniego elementu tablicy
    tablica3[3] = 'index 3'; // rozszerzanie tablicy
    tablica3[7] = 'index 7'; // rozszerzanie tablicy i wypełnia null
    const tablica4 = [...tablica1, 'Kanada', 'USA'];
    const wynik = [tablica1, tablica2, tablica3, tablica4];
    // const tablica6 = tablica1 // tak nie robimy
    return wynik;
  }

  function exampleReadingFromArrays() {
    const tablica = ['Poland', 'Mexico', 'USA', 'Kanada', 'Italy'];
    const jeden = tablica.pop(); // modyfikuje tablicę
    const dwa = tablica[3];
    const dwaInaczej = tablica.at(3);
    const [trzy, cztery] = tablica;
    const [pierwszy, ...pozostale] = tablica;
    // const [head, ...rest] = tablica; // tak to by było po angielsku
    const piec = pozostale;
    const wynik = {
      jeden,
      tablica,
      dwa,
      dwaInaczej,
      trzy,
      cztery,
      pierwszy,
      pozostale,
      piec,
    };
    return wynik;
  }

  function exampleArrayCopy() {
    const tablica = ['Poland', 'Mexico', 'USA'];
    const kopia = [...tablica];
    const tablica1 = [...tablica];
    const tablica2 = new Array(...tablica);
    const tablica3 = structuredClone(tablica1);
    // const tablica4 = tablica.slice(1);
    // const tablica4 = tablica.slice(1, 2);
    const tablica4 = tablica.slice(-1);
    const tablica5 = tablica.splice(-1); // modyfikuje źródłową tablicę
    const wynik = {
      tablica1,
      tablica2,
      tablica3,
      tablica4,
      tablica5,
      tablica,
      kopia,
    };
    return wynik;
  }

  function exampleArrayConcatenation() {
    const tablica = ['Poland', 'Mexico', 'USA', 'Kanada', 'Italy'];
    const jeden = tablica.slice(0, 3);
    const dwa = tablica.slice(-3);
    const jedenDwa = [...jeden, ...dwa];
    const dwaJeden = dwa.concat(jeden);
    const jedenDwaFlat = [jeden, dwa].flat();
    const coTuSieStalo = 'Co tu się stało';
    const uwagaNa = [...jeden, ...[coTuSieStalo]];
    const wynik = { jeden, dwa, jedenDwa, dwaJeden, jedenDwaFlat, uwagaNa };
    return wynik;
  }

  function exampleIndexOfLength() {
    const tablica = ['Poland', 'Mexico', 'USA', 'Kanada', 'Italy'];
    const indexOfJeden = tablica.indexOf('USA');
    const indexOfDwa = tablica[indexOfJeden];
    const indexOfTrzy = tablica.slice(indexOfJeden, indexOfJeden + 1);
    const lengthJeden = tablica.length;
    tablica[tablica.length - 3] = 'Egipt'; // zmienia zawartość tablicy
    const wynik = {
      indexOfJeden,
      indexOfDwa,
      indexOfTrzy,
      lengthJeden,
      tablica,
    };
    return wynik;
  }

  function examplePerformance() {
    const times = new Array(2000).fill(0);

    // test array push
    console.time('array-push');
    const test = new Array(1000).fill('Test');
    times.forEach(() => test.push('Hello'));
    console.timeEnd('array-push');

    // test array add using destructuring
    console.time('array-add-destruct');
    let test2 = new Array(1000).fill('Test');
    times.forEach(() => (test2 = [...test2, 'Hello']));
    console.timeEnd('array-add-destruct');

    let dodaj = new Array(10).fill('Test');
    // test array concat
    console.time('array-concat');
    let test3 = new Array(1000).fill('Test');
    times.forEach(() => (test3 = test3.concat(dodaj)));
    console.timeEnd('array-concat');

    // test array concat using destructuring
    console.time('array-concat-destr');
    let test4 = new Array(1000).fill('Test');
    times.forEach(() => (test4 = [...test4, ...dodaj]));
    console.timeEnd('array-concat-destr');

    // test array concat using flat
    console.time('array-concat-flat');
    let test5 = new Array(1000).fill('Test');
    times.forEach(() => (test5 = [test5, dodaj].flat()));
    console.timeEnd('array-concat-flat');
  }

  // function exampleArraySyntax() {}
  // function exampleAddingValuesToArrays() {
  //   const wynik = [];
  //   return wynik;
  // }
  // function exampleReadingFromArrays() {
  // const tablica = ['Poland', 'Mexico', 'USA', 'Kanada', 'Italy'];
  //   const wynik = {};
  //   return wynik;
  // }
  // function exampleArrayCopy() {
  // const tablica = ['Poland', 'Mexico', 'USA', 'Kanada', 'Italy'];
  //   const wynik = {};
  //   return wynik;
  // }
  // function exampleArrayCopy() {
  // const tablica = ['Poland', 'Mexico', 'USA', 'Kanada', 'Italy'];
  //   const wynik = {};
  //   return wynik;
  // }
  // function exampleArrayConcatenation() {
  // const tablica = ['Poland', 'Mexico', 'USA', 'Kanada', 'Italy'];
  //   const wynik = {};
  //   return wynik;
  // }
  // function exampleIndexOfLength() {
  // const tablica = ['Poland', 'Mexico', 'USA', 'Kanada', 'Italy'];
  //   const wynik = {};
  //   return wynik;
  // }
  // function examplePerformance() {
  // }

  return (
    <article>
      <h1>Tablice (Arrays)</h1>
      <section>
        <h2>jak definiujemy tablicę</h2>
        <p>
          <code>const array_name = [item1, item2, ...]; </code>
        </p>
        <ul>
          <li>
            przyjmuje się, że tablice definiujemy zwykle używając{' '}
            <code>const</code>
          </li>
          <li>item1,... może być dowolnego typy, również inną tablicą</li>
        </ul>
        <p>
          Zobacz zawartość <code>function exampleArraySyntax()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(exampleArraySyntax())}</code>
        </p>
      </section>
      <section>
        <h2>Dodawanie wartości do tablicy (array)</h2>
        <p>
          Zobacz zawartość <code>function exampleAddingValuesToArrays()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(exampleAddingValuesToArrays())}</code>
        </p>
      </section>
      <section>
        <h2>Oczytywanie wartości z tablicy (array)</h2>
        <p>
          Zobacz zawartość <code>function exampleReadingFromArrays()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(exampleReadingFromArrays())}</code>
        </p>
      </section>
      <section>
        <h2>Kopiowanie wartośći z tablicy (wszystkich lub części)</h2>
        <p>
          Zobacz zawartość <code>function exampleArrayCopy()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(exampleArrayCopy())}</code>
        </p>
      </section>
      <section>
        <h2>Łączenie tablic (arrays)</h2>
        <p>
          Zobacz zawartość <code>function exampleArrayConcatenation()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(exampleArrayConcatenation())}</code>
        </p>
      </section>
      <section>
        <h2>[].indexOf oraz [].length</h2>
        <p>
          Zobacz zawartość <code>function exampleIndexOfLength()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(exampleIndexOfLength())}</code>
        </p>
      </section>
      <section>
        <h2>Mutowaleni(mutable) i niemutowalne (immutable) operacje</h2>
        <p>Mutowalne - gdy zmienia zawartość tabeli</p>
        <p>Niemutowalne - gdy nie zmienia zawartości tabeli</p>
        <p>Przykłady w poprzednich sekcjach</p>
      </section>
      <section>
        <h2>wydajność operacji ... vs concat, other</h2>
        <p>
          Zobacz zawartość <code>function examplePerformance()</code>
        </p>
        <p>
          wynik w konoli przeglądarki po kliknięciu{' '}
          <button type="button" onClick={examplePerformance}>
            Kliknij
          </button>
        </p>
      </section>
      <section>
        <h2>Po co używamy tablic</h2>
        <p>na przykład zamiast</p>
        <p>
          <code>const valueOne = 100</code>
        </p>
        <p>
          <code>const valueTwo = 200</code>
        </p>
        <p>
          <code>const valueThree = 321</code>
        </p>
        <p>
          <code>...</code>
        </p>
        <p>
          <code>valueOneHundred = 10000</code>
        </p>
        <p>
          Jeżeli teraz dla każdej z tych zmiennych chcemy wykonać jakąś
          operację, na przykład wypisać używając console.log(); to wymaga to
          napisanie dużej liczby linii kodu.
        </p>
        <p>Jeżeli te dane mamy zapisane w tablicy, to możemy:</p>
        <p>
          <code>const values = [ 100, 200, 321, ..., 1000 ]</code>
        </p>
        <p>
          <code>values.forEach(console.log)</code>
        </p>
      </section>
    </article>
  );
};
