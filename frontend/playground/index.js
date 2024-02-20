import { getRandomNumber } from "../utils";

const NO_OF_PARTICLES = 100;
const PARTICLE_BASE_RADIUS = 0.5;
const PERSPECTIVE_WIDTH = 500;
const SPEED = 2;

let context;
let canvasWidth, canvasHeight;
let centerX, centerY;
let speed = SPEED;
let particles = [];

function randomizeParticle(particle) {
  particle.x = getRandomNumber(0, canvasWidth);
  particle.y = getRandomNumber(0, canvasHeight);
  particle.z = getRandomNumber(0, canvasWidth);
  return particle;
}

function Particle(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.pastZ = 0;
}

const draw = () => {
  let p;
  let relativeX, relativeY;
  let currX, currY, currRadius, currFocus;
  let prevX, prevY, prevRadius, prevFocus;
  let angle, currAngle, nextAngle;

  const halfPi = Math.PI / 2;
  const atan2 = Math.atan2;
  const sin = Math.sin;
  const cos = Math.cos;

  context.beginPath();
  for (let i = 0; i < NO_OF_PARTICLES; i++) {
    p = particles[i];

    p.pastZ = p.z;
    p.z -= speed;

    if (p.z < 1) {
      randomizeParticle(p);
      continue;
    }

    relativeX = p.x - centerX;
    relativeY = p.y - centerY;

    currFocus = PERSPECTIVE_WIDTH / p.z;
    prevFocus = PERSPECTIVE_WIDTH / p.pastZ;

    currX = centerX + relativeX * currFocus;
    currY = centerY + relativeY * currFocus;
    currRadius = PARTICLE_BASE_RADIUS * currFocus;

    prevX = centerX + relativeX * prevFocus;
    prevY = centerY + relativeY * prevFocus;
    prevRadius = PARTICLE_BASE_RADIUS * prevFocus;

    angle = atan2(prevY - currY, prevX - currX);
    currAngle = angle + halfPi;
    nextAngle = angle - halfPi;

    context.moveTo(
      prevX + prevRadius * cos(currAngle),
      prevY + prevRadius * sin(currAngle),
    );
    context.arc(prevX, prevY, prevRadius, currAngle, nextAngle, true);
    context.lineTo(
      currX + currRadius * cos(nextAngle),
      currY + currRadius * sin(nextAngle),
    );
    context.arc(currX, currY, currRadius, nextAngle, currAngle, true);
    context.closePath();
  }
  context.fill();
};

document.addEventListener(
  "DOMContentLoaded",
  function () {
    let canvas = document.querySelector("#playground");
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

    //populate particles array
    for (let i = 0; i < NO_OF_PARTICLES; i++) {
      particles[i] = randomizeParticle(new Particle());
    }

    const animate = () => {
      loop();
      requestAnimationFrame(animate);
    };

    animate();
  },
  false,
);

const loop = () => {
  context.save();
  context.fillStyle = "rgb(0, 0, 0)";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.restore();
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  draw();
};
