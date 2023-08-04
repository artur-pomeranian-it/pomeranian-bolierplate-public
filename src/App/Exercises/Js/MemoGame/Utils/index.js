export function formatTime(time) {
  const timeInSeconds = Math.floor(time / 1000);

  const m = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, '0');

  const s = Math.round(timeInSeconds % 60)
    .toString()
    .padStart(2, '0');

  return `${m}:${s}`;
}

export function getAlphabet(limit) {
  // [...'REACT'].forEach((letter) => console.log(letter, letter.charCodeAt(0)));
  const startASCII = 65;
  const endASCII = 90;
  let maxSize = endASCII - startASCII + 1;
  maxSize = limit > 0 && limit <= maxSize ? limit : maxSize;

  const result = Array(maxSize)
    .fill(0)
    .map((_, index) => index + startASCII)
    .map((charCode) => String.fromCharCode(charCode));
  return result;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function getPoints(score, time) {
  if (score > 0 && time > 0) {
    const seconds = Math.floor(time / 1000);
    return Math.round((60 * score) / seconds);
  }
  return NaN;
}

export function getHighScore(noOfElements) {
  const highScore = localStorage.getItem('mole-' + noOfElements);
  if (highScore !== null) return JSON.parse(highScore);
  return null;
}

export function setHighScore(noOfElements, highScore) {
  localStorage.setItem('mole-' + noOfElements, JSON.stringify(highScore));
}
