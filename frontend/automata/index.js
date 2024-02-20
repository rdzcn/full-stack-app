import { convertToBinary } from "../utils";

const squareWidth = 10;
const squareHeight = 10;
const totalCells = 141;
const rule = 90;

let cells = [];

function calculateNewState(left, center, right) {
  const ruleArray = convertToBinary(rule).split("");
  const input = `${left}${center}${right}`;
  const ruleIndex = 7 - parseInt(input, 2);
  console.log("rule index", ruleIndex, ruleArray);
  return ruleArray[ruleIndex];
}

function generateCell() {
  let nextGen = [];
  nextGen[0] = cells[0];
  nextGen[totalCells - 1] = cells[totalCells - 1];
  for (let i = 1; i < totalCells - 1; i++) {
    const left = cells[i - 1];
    const right = cells[i + 1];
    const center = cells[i];
    const newState = calculateNewState(left, center, right);
    nextGen[i] = +newState;
  }
  cells = nextGen;
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    let canvas = document.querySelector("#automata");
    canvas.style.backgroundColor = "#fff";
    canvas.width = window.innerWidth;
    canvas.height = 800;

    const ctx = canvas.getContext("2d");

    for (let i = 0; i < totalCells; i++) {
      if (i === Math.ceil(totalCells / 2)) {
        cells[i] = 1;
      } else cells[i] = 0;
      // cells[i] = Math.floor(getRandomNumber(0, 2));
    }

    console.log("cells", cells);

    // ctx.beginPath();
    // for (let i = 0; i < totalCells; i++) {
    //   const x = i * squareWidth;
    //   const y = 0;
    //   ctx.fillStyle = cells[i] ? "#000" : "#fff";
    //   ctx.fillRect(x, y, squareWidth, squareHeight);
    //   ctx.closePath();
    // }

    let row = 0;
    const animate = () => {
      ctx.beginPath();
      for (let i = 0; i < totalCells; i++) {
        const x = i * squareWidth;
        const y = row * squareHeight;
        ctx.fillStyle = cells[i] ? "#000" : "#fff";
        ctx.fillRect(x, y, squareWidth, squareHeight);
        ctx.closePath();
      }
      generateCell();
      requestAnimationFrame(animate);
      row += 1;
    };

    animate();
  },
  false,
);
