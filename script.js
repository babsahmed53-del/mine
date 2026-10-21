const herName = "My Love";       // Change this to her name
const yourName = "";          // Change this to your name

document.getElementById("herName").textContent = herName;
document.querySelector(".signature strong").textContent = yourName;

const openBtn = document.getElementById("openBtn");
const surprise = document.getElementById("surprise");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const wishBtn = document.getElementById("wishBtn");
const loveBtn = document.getElementById("loveBtn");
const secret = document.getElementById("secret");

openBtn.addEventListener("click", () => {
  surprise.classList.remove("hidden");
  modal.classList.remove("hidden");
  launchConfetti(160);

  setTimeout(() => {
    surprise.scrollIntoView({ behavior: "smooth" });
  }, 500);
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

wishBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  launchConfetti(250);
});

loveBtn.addEventListener("click", () => {
  secret.classList.remove("hidden");
  loveBtn.textContent = "I hope you felt the love ❤️";
  loveBtn.disabled = true;
  launchConfetti(180);
  secret.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Floating hearts
const hearts = document.getElementById("hearts");

setInterval(() => {
  const heart = document.createElement("span");
  heart.textContent = ["❤️", "💕", "💗", "💖", "✨"][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 20) + "px";
  heart.style.animationDuration = (5 + Math.random() * 6) + "s";
  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 11000);
}, 700);

// Simple confetti animation
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti(amount = 100) {
  for (let i = 0; i < amount; i++) {
    pieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      size: 5 + Math.random() * 7,
      speedX: (Math.random() - .5) * 13,
      speedY: -5 - Math.random() * 10,
      gravity: .18,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - .5) * 12,
      life: 100 + Math.random() * 80
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.speedY += p.gravity;
    p.rotation += p.rotationSpeed;
    p.life--;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.fillStyle = ["#ff4f81", "#ffd166", "#7bdff2", "#b8f2e6", "#c77dff"][Math.floor(Math.random() * 5)];
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  });

  pieces = pieces.filter(p => p.life > 0);
  requestAnimationFrame(animateConfetti);
}

animateConfetti();
