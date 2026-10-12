// ChemDetect — lightweight background particles and interface helpers.
document.addEventListener("DOMContentLoaded", () => {
  const videoPlaceholder = document.getElementById("videoPlaceholder");
  if (videoPlaceholder) {
    videoPlaceholder.setAttribute("aria-label", "Temporary placeholder for adding a reaction video later");
  }

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.id = "particle-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0, height = 0, rafId;
  let particles = [];
  const particleCount = () => Math.min(75, Math.max(28, Math.floor((width * height) / 24000)));

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({ length: particleCount() }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .42, vy: (Math.random() - .5) * .42,
      r: Math.random() * 1.8 + .7
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -5) p.x = width + 5;
      if (p.x > width + 5) p.x = -5;
      if (p.y < -5) p.y = height + 5;
      if (p.y > height + 5) p.y = -5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(26, 183, 165, 0.48)"; ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j], dx = p.x - q.x, dy = p.y - q.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 105) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(26, 183, 165, ${0.12 * (1 - distance / 105)})`;
          ctx.lineWidth = .7; ctx.stroke();
        }
      }
    }
    rafId = window.requestAnimationFrame(draw);
  }

  resize(); draw();
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    window.cancelAnimationFrame(rafId);
    if (!document.hidden) draw();
  });
});
