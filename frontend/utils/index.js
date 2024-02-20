export function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

export function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export function convertToBinary(number) {
  let binary = number.toString(2);
  while (binary.length < 8) {
    binary = "0" + binary;
  }
  return binary;
}
