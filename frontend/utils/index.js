export function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}