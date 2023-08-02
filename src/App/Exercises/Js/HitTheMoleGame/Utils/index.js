export function formatTime(time) {
  const timeInSeconds = Math.ceil(time / 1000);

  const m = Math.round(timeInSeconds / 60)
    .toString()
    .padStart(2, '0');

  const s = Math.round(timeInSeconds % 60)
    .toString()
    .padStart(2, '0');

  return `${m}:${s}`;
}
