const squareWidth = 10;
const squareHeight = 10;

let cells = [1, 0, 0, 1, 0, 1, 0, 1, 1, 0];

document.addEventListener(
  "DOMContentLoaded",
  function () {
    let canvas = document.querySelector("#automata");
    canvas.style.backgroundColor = "#fff";
    canvas.width = 400;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    for (let i = 0; i < cells.length; i++) {
      const x = i * squareWidth;
      const y = 0;

      // Draw square
      ctx.fillStyle = cells[i] ? "#000" : "#fff";
      ctx.strokeStyle = "#000";
      ctx.fillRect(x, y, squareWidth, squareHeight);
      ctx.closePath();
    }
  },
  false,
);
