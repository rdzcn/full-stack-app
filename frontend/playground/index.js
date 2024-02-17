document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.querySelector("#playground");
  canvas.style.backgroundColor = "black";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  
  // circles
  context.beginPath();
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    context.arc(x, y, 5, 0, Math.PI * 2, true);
    context.closePath();
  }
  context.fill();
})