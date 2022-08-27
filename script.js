function new2dCanvas(id, width, height) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  return [canvas, ctx];
}

const [canvas, ctx] = new2dCanvas(
  "canvas",
  window.innerWidth,
  window.innerHeight
);

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

const mouse = {
  x: undefined,
  y: undefined,
};

class Particle {
  constructor() {
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 7 - 1.5;
    this.speedY = Math.random() * 7 - 1.5;
    this.timer = 0;
    this.color = Math.random() * 360;
    hue++;
    if (hue === 360) hue = 0;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.timer++;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw() {
    if (this.size < 0.2) ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 10; i++) particles.push(new Particle());
});

let particles = [];
let hue = 0;

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    ctx.fillStyle = "hsl(" + particles[i].color + ", 100%, 50%)";
    particles[i].update();
    particles[i].draw();
  }
}

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((p) => p.timer < 200);
  handleParticles();
  requestAnimationFrame(animate);
})();