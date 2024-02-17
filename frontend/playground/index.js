const NO_OF_PARTICLES = 1000;
const PARTICLE_BASE_RADIUS = 1;
const PERSPECTIVE_WIDTH = 500;
const SPEED = 2;

let context;
let canvasWidth, canvasHeight;
let centerX, centerY;
let mouseX, mouseY;
let speed = SPEED;
let particles = [];

function randomizeParticle(particle) {
  particle.x = Math.random() * canvasWidth;
  particle.y = Math.random() * canvasHeight;
  particle.z = Math.random() * 1500 + 500;
  return particle
}

function Particle(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.pastZ = 0;
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
    particles[i].z -= 500 * Math.random();
  }

  function nextAnimationFrame() {
    context.save();
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    context.restore();

    let x, y, radius;
    let relativeX, relativeY, relativeRadius;
    let pastX, pastY, pastRelativeRadius, pastRadius;
    
    context.beginPath();
    for (let i = 0; i < NO_OF_PARTICLES; i++) {
      const particle = particles[i];
      particle.pastZ = particle.z;
      particle.z -= speed;
      
      if (particle.z <= 0) {
        randomizeParticle(particle);
      } 
      
      relativeX = particle.x - centerX;
      relativeY = particle.y - centerY;

      relativeRadius = PERSPECTIVE_WIDTH / particle.z;
      radius = PARTICLE_BASE_RADIUS * relativeRadius;
      x = centerX + relativeX * relativeRadius;
      y = centerY + relativeY * relativeRadius;

      pastRelativeRadius = PERSPECTIVE_WIDTH / particle.pastZ;
      pastX = centerX + (particle.x - centerX) * pastRelativeRadius;
      pastY = centerY + (particle.y - centerY) * pastRelativeRadius;
      pastRadius = PARTICLE_BASE_RADIUS * pastRelativeRadius;

      context.arc(pastX, pastY, radius, 0, Math.PI * 2, true);
      context.closePath();
    }
    context.fill();
    requestAnimationFrame(nextAnimationFrame);
  }
  
  nextAnimationFrame();
}, false)

