// Artistic geometric animation with collapse/expand phases
const canvas = document.getElementById("geometryCanvas");
const ctx = canvas.getContext("2d");

// Set initial canvas size
canvas.width = window.innerWidth;
canvas.height = 500;

// Resize dynamically
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = 500;
});

// Create dots
let dots = [];
const numDots = 120;

for (let i = 0; i < numDots; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 2,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2
  });
}

// Animation phases: expand vs collapse
let phase = "expand";
setInterval(() => {
  phase = phase === "expand" ? "collapse" : "expand";
}, 6000); // switch every 6 seconds

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach(dot => {
    if (phase === "collapse") {
      // Move dots toward center
      dot.x += (canvas.width / 2 - dot.x) * 0.02;
      dot.y += (canvas.height / 2 - dot.y) * 0.02;
    } else {
      // Normal bouncing
      dot.x += dot.dx;
      dot.y += dot.dy;
      if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
      if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
    }

    // Draw dot
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
    ctx.fillStyle = "#ff6f61"; // coral accent
    ctx.fill();
  });

  // Connect nearby dots with lines
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = "rgba(0, 153, 255, 0.25)"; // soft blue lines
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();