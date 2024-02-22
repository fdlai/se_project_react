export function getRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

export function createColor() {
  const r = getRandomNumber(255);
  const g = getRandomNumber(255);
  const b = getRandomNumber(255);

  return `radial-gradient(69% 51% at 77% 22%, rgb(${r}, ${g}, ${b}), rgba(${r}, ${g}, ${b}, 0.4))`;
}
