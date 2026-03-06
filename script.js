// Artistic Interactivity
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Fun artistic effect: random background glow
  setInterval(() => {
    const colors = ["#ff00c1", "#00fff9", "#ffea00"];
    document.body.style.boxShadow = `0 0 50px ${colors[Math.floor(Math.random() * colors.length)]}`;
  }, 2000);
});