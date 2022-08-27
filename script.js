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
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 10 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.timer = 0;
    this.color = "hsl(" + hue + ", 100%, 50%)";
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
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 5; i++) particles.push(new Particle());
});

let particles = [];
let hue = 0;

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 50) {
        ctx.strokeStyle = particles[i].color;
        ctx.lineWidth = particles[i].size / 10;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((p) => p.size > 0.2);
  handleParticles();
  requestAnimationFrame(animate);
})();