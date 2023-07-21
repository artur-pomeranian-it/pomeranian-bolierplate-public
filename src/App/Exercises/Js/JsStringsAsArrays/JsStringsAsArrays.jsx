import './styles.css';

export const JsStringsAsArrays = () => {
  function examplesStrings() {
    const tekst = 'Omega';
    const tablica = ['Alfa', 'Beta'];
    const tekstLenght = tekst.length;
    const tablicaLength = tablica.length;
    // Cannot assign to read only property '4' of string 'Omega'
    // tekst[4] = 'R';
    let tekstWithLet = 'Yellow';
    // Cannot assign to read only property '0' of string 'Yellow'
    // tekst2[0] = 'F';
    // strings are immutable by nature
    const tekstFor = [];
    for (let index = 0; index <= tekst.length; index++) {
      // nie ma push
      tekstFor.push(tekst.at(index) + ':' + tekst.charCodeAt(index));
    }
    const tekstForOf = [];
    for (const char of tekst) {
      // nie ma push
      tekstForOf.push(char + ':' + char.charCodeAt(0));
    }
    // nie ma map, nie ma forEach

    return {
      tekst,
      tablica,
      tekstLenght,
      tablicaLength,
      tekstBracket: tekst[1],
      tablicaBracket: tablica[1],
      tekstCharAt: tekst.charAt[2],
      tablicaAt: tablica.at[1],
      tekstWithLet,
      tekstFor,
      tekstForOf,
      tekstSlice: tekst.slice(0, 2),
      tekstSplit: '1, 2, 3, 4'.split(','),
      tekstConcate: tekst.concat(tekstWithLet),
      tekstNoMapWorkeraund: [...tekst].map(
        (char) => char + ':' + char.charCodeAt(0)
      ),
      // forEach
    };
  }
  function excercises() {
    // Napisz funkcję zmieniającą podany string na camelCase
    function toCamelCase(input) {
      // TODO:
    }

    // Napisz funkcję, która przyjmuje dwa napisy i zwraca tablicę z literami,
    // które występują w obu napisach.
    function commonLetters(a, b) {
      // TODO:
    }

    // Napisz funkcję, która przyjmuje tablicę słów i zwraca tablicę z liczbami
    // określającymi ilość samogłosek w tych słowach
    function wordLengths(input) {
      // const vowels = ['a', 'e', 'i', 'o', 'u'];
      // TODO:
    }

    // Napisz funkcję, która pobiera dwa napisy i sprawdza, czy są one anagramami
    function isAnagram(x, y) {
      // TODO:
    }
    return {
      toCamelCase: toCamelCase('Jakiś długi text'), // wynik: "jakiśDługiText"
      commonLetters: commonLetters('Hello', 'World'), // wynik: ["l", "o"]
      wordLengths: wordLengths(['apple', 'banana', 'orange']), // wynik: [2, 3, 3]
      isAnagramCase1: isAnagram('iceman', 'cinema'), // wynik: true
      isAnagramCase2: isAnagram('iceman', 'cinemma'), // wynik false
    };
  }

  // function examplesStrings() {}
  // function excercises() {}

  return (
    <article>
      <h1>String as an Array</h1>
      <section>
        <h2>Podobieństwa łąńcucha tekstowego (string) do tablicy (array)</h2>
        <p>
          Zobacz zawartość <code>function examplesStrings()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(examplesStrings())}</code>
        </p>
      </section>
      <section>
        <h2>Ćwiczenia</h2>
        <p>
          Zobacz zawartość <code>function excercises()</code>
        </p>
        <p>
          wynik: <code>{JSON.stringify(excercises())}</code>
        </p>
      </section>
    </article>
  );
};
