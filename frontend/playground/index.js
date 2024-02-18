import { getRandomNumber } from "../utils";

const NO_OF_PARTICLES = 100;
const PARTICLE_BASE_RADIUS = 8;
const PERSPECTIVE_WIDTH = 500;
const SPEED = 2;

let context;
let canvasWidth, canvasHeight;
let centerX, centerY;
let mouseX, mouseY;
let speed = SPEED;
let particles = [];

function randomizeParticle(particle) {
  particle.x = getRandomNumber(0, canvasWidth);
  particle.y = getRandomNumber(0, canvasHeight);
  particle.z = getRandomNumber(0, canvasWidth);
  return particle
}

function Particle(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.pastZ = 0;
}

const draw = () => {
  
  console.log("Drawing");

  context.beginPath();
  context.moveTo(0, centerY);
  context.lineTo(canvasWidth, centerY);
  context.strokeStyle = "#fff";
  context.stroke();

  context.beginPath();
  context.moveTo(centerX, 0);
  context.lineTo(centerX, canvasHeight);
  context.strokeStyle = "#fff";
  context.stroke();

  context.beginPath();
  context.arc(centerX, centerY, 5, 0, 2 * Math.PI, true);
  context.fill();

  context.beginPath();
  for (let i = 0; i < NO_OF_PARTICLES; i++) {
    let p = particles[i];
    
    p.pastZ = p.z;
    p.z -= speed;
    if (p.z <= 0) {
      randomizeParticle(p);
    }

    const angle = Math.atan2(p.y - centerY, p.x - centerX);
    const newY = p.y + Math.sin(angle) * speed;
    const newX = p.x + Math.cos(angle) * speed;

    p.x = newX;
    p.y = newY;

    context.arc(newX, newY, PARTICLE_BASE_RADIUS, 0, 2 * Math.PI, true);
    context.fill();
    context.closePath();
  }
}


document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.querySelector("#playground");
  canvas.style.backgroundColor = "black";

  const resize = () => {
    canvasWidth  = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
    centerX = canvasWidth * 0.5;
    centerY = canvasHeight * 0.5;
    context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
  };
    
  window.addEventListener('resize', resize);
  resize();

  //populate particles array
  for (let i = 0; i < NO_OF_PARTICLES; i++) {
    particles[i] = randomizeParticle(new Particle());
  }

  console.log(particles);
  setInterval(loop, 1000/60)

}, false)

const loop = () => {
  console.log("Looping");
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  draw();

}