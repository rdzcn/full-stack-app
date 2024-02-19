let canvasWidth, canvasHeight;

document.addEventListener(
  "DOMContentLoaded",
  function (event) {
    let canvas = document.querySelector("#tree");
    canvas.style.backgroundColor = "black";

    const resize = () => {
      canvasWidth = canvas.width = window.innerWidth;
      canvasHeight = canvas.height = window.innerHeight;
      centerX = canvasWidth * 0.5;
      centerY = canvasHeight * 0.5;
      context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
    };

    window.addEventListener("resize", resize);
    resize();
  },
  false,
);
