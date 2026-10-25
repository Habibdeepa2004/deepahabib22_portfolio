// Mobile menu
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');
if (menu && nav) menu.addEventListener('click', () => nav.classList.toggle('open'));

// Matrix / binary rain background
(function () {
  const c = document.getElementById('matrix');
  if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = c.getContext('2d');
  const chars = '01ABCDEF<>{}/\\#$%&*+=';
  let w, h, cols, drops;
  const size = 18;
  function resize() {
    w = c.width = window.innerWidth; h = c.height = window.innerHeight;
    cols = Math.floor(w / size); drops = Array(cols).fill(0).map(() => Math.random() * h / size);
  }
  resize(); window.addEventListener('resize', resize);
  function draw() {
    ctx.fillStyle = 'rgba(5,11,20,0.12)'; ctx.fillRect(0, 0, w, h);
    ctx.font = size + 'px JetBrains Mono, monospace';
    for (let i = 0; i < cols; i++) {
      const t = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > .96 ? 'rgba(34,211,238,.55)' : 'rgba(0,255,166,.22)';
      ctx.fillText(t, i * size, drops[i] * size);
      if (drops[i] * size > h && Math.random() > .975) drops[i] = 0;
      drops[i] += .6;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Typing effect on the home page
(function () {
  const el = document.querySelector('.typing');
  if (!el) return;
  const words = ['SOC Analyst', 'Cybersecurity Analyst', 'GRC / Risk Analyst', 'Vulnerability Assessment', 'Cybersecurity Engineer'];
  let w = 0, i = 0, del = false;
  (function tick() {
    const word = words[w];
    el.textContent = '> ' + word.slice(0, i);
    if (!del && i < word.length) i++;
    else if (!del) { del = true; return setTimeout(tick, 1400); }
    else if (i > 0) i--;
    else { del = false; w = (w + 1) % words.length; }
    setTimeout(tick, del ? 40 : 85);
  })();
})();

// Scroll reveal for cards
(function () {
  const els = document.querySelectorAll('.card, .journey > div, .page-head, .focus-item');
  els.forEach(e => e.classList.add('reveal'));
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: .12 });
  els.forEach(e => io.observe(e));
})();

// Cursor glow that follows the mouse
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const g = document.createElement('div'); g.id = 'glow'; document.body.appendChild(g);
  window.addEventListener('mousemove', e => { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; });
})();
