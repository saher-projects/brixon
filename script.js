/* =========================================
   APEX FITNESS — SCRIPT.JS
   ========================================= */

// ── PRELOADER ──────────────────────────────
const preloader = document.getElementById('preloader');
const preBar    = document.getElementById('preBar');
const preNum    = document.getElementById('preNum');

let pct = 0;
const preInt = setInterval(() => {
  pct += Math.random() * 8 + 3;
  if (pct >= 100) { pct = 100; clearInterval(preInt); }
  preBar.style.width = pct + '%';
  preNum.textContent = Math.floor(pct);
  if (pct === 100) {
    setTimeout(() => {
      preloader.classList.add('out');
      document.body.style.overflow = '';
      initReveal();
      initCounters();
      initTestimonials();
      initPrograms();
    }, 400);
  }
}, 60);
document.body.style.overflow = 'hidden';

// ── CURSOR ──────────────────────────────────
const cur  = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animCur() {
  fx += (mx - fx) * .1;
  fy += (my - fy) * .1;
  cur2.style.left = fx + 'px';
  cur2.style.top  = fy + 'px';
  requestAnimationFrame(animCur);
})();

document.querySelectorAll('a,button,.prog-card,.gi,.tr-card,.price-card,.tc').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width  = '20px';
    cur.style.height = '20px';
    cur2.style.width  = '54px';
    cur2.style.height = '54px';
    cur2.style.borderColor = 'rgba(249,115,22,.7)';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width  = '10px';
    cur.style.height = '10px';
    cur2.style.width  = '34px';
    cur2.style.height = '34px';
    cur2.style.borderColor = 'rgba(249,115,22,.5)';
  });
});

// ── HERO PARTICLE CANVAS ─────────────────────
const canvas = document.getElementById('heroCanvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resizeCanvas() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); spawnParticles(); });

function spawnParticles() {
  particles = [];
  const count = Math.floor(W / 12);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + .3,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      alpha: Math.random() * .5 + .1,
      color: Math.random() > .5 ? '#F97316' : '#EF4444',
    });
  }
}
spawnParticles();

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(249,115,22,${.08 * (1 - dist/100)})`;
        ctx.lineWidth = .5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animCanvas() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  drawLines();
  requestAnimationFrame(animCanvas);
}
animCanvas();

// ── NAVBAR ────────────────────────────────────
const nav = document.getElementById('nav');
const hbg = document.getElementById('hbg');
const navUl = document.getElementById('navUl');

window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 60);
});

hbg.addEventListener('click', () => {
  navUl.classList.toggle('open');
  const sp = hbg.querySelectorAll('span');
  if (navUl.classList.contains('open')) {
    sp[0].style.transform = 'rotate(45deg) translate(5px,6px)';
    sp[1].style.opacity   = '0';
    sp[2].style.transform = 'rotate(-45deg) translate(5px,-6px)';
  } else {
    sp[0].style.transform = sp[2].style.transform = '';
    sp[1].style.opacity = '';
  }
});
navUl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navUl.classList.remove('open')));

// ── SCROLL REVEAL ────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); } });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.sr').forEach(el => obs.observe(el));
}

// ── COUNTERS ─────────────────────────────────
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = 1;
        animNum(e.target, +e.target.dataset.n);
      }
    });
  }, { threshold: .5 });
  document.querySelectorAll('.sn').forEach(el => obs.observe(el));
}

function animNum(el, target) {
  let v = 0;
  const step = target / 60;
  const t = setInterval(() => {
    v += step;
    if (v >= target) { v = target; clearInterval(t); }
    el.textContent = Math.floor(v).toLocaleString();
  }, 25);
}

// ── PARALLAX ─────────────────────────────────
const parImg = document.getElementById('parImg');
window.addEventListener('scroll', () => {
  if (!parImg) return;
  const rect = parImg.closest('.par-wrap').getBoundingClientRect();
  parImg.style.transform = `translateY(${rect.top * .35}px)`;
});

// ── 3D TILT ON HERO IMAGE ────────────────────
const hWrap = document.getElementById('heroImgWrap');
if (hWrap) {
  document.addEventListener('mousemove', e => {
    const rect = hWrap.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top  + rect.height/2;
    const rx = (e.clientY - cy) / 24;
    const ry = (e.clientX - cx) / 24;
    hWrap.style.transform = `perspective(900px) rotateX(${-rx}deg) rotateY(${ry}deg)`;
  });
  document.addEventListener('mouseleave', () => { hWrap.style.transform = ''; });
}

// ── PROGRAMS SLIDER ──────────────────────────
function initPrograms() {
  const scroll  = document.getElementById('progScroll');
  const btnL    = document.getElementById('pnLeft');
  const btnR    = document.getElementById('pnRight');
  const dotsBox = document.getElementById('pnDots');
  if (!scroll) return;

  const cards   = scroll.querySelectorAll('.prog-card');
  const cardW   = () => cards[0] ? cards[0].offsetWidth + 24 : 344;
  let cur       = 0;

  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'pnd' + (i===0?' on':'');
    d.addEventListener('click', () => goTo(i));
    dotsBox.appendChild(d);
  });

  function goTo(idx) {
    cur = Math.max(0, Math.min(idx, cards.length - 1));
    scroll.scrollTo({ left: cur * cardW(), behavior: 'smooth' });
    dotsBox.querySelectorAll('.pnd').forEach((d, i) => d.classList.toggle('on', i===cur));
  }

  btnL.addEventListener('click', () => goTo(cur - 1));
  btnR.addEventListener('click', () => goTo(cur + 1));
}

// ── TESTIMONIALS SLIDER ──────────────────────
function initTestimonials() {
  const wrap = document.getElementById('testiWrap');
  const dotsBox = document.getElementById('testiDots');
  if (!wrap) return;

  const cards = wrap.querySelectorAll('.tc');
  let cur = 0;

  cards.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'td' + (i===0?' on':'');
    d.addEventListener('click', () => goT(i));
    dotsBox.appendChild(d);
  });

  function goT(idx) {
    cards[cur].classList.remove('on');
    dotsBox.querySelectorAll('.td')[cur].classList.remove('on');
    cur = idx;
    cards[cur].classList.add('on');
    dotsBox.querySelectorAll('.td')[cur].classList.add('on');
    const cW = cards[0].offsetWidth + 24;
    const offset = wrap.offsetWidth / 2 - cW / 2;
    wrap.style.transform = `translateX(${-cur * cW + offset}px)`;
    wrap.style.transition = 'transform .5s cubic-bezier(.25,.46,.45,.94)';
  }

  cards[0].classList.add('on');
  goT(0);
  const auto = setInterval(() => goT((cur + 1) % cards.length), 4500);
  wrap.addEventListener('mouseenter', () => clearInterval(auto));
}

// ── CONTACT FORM ─────────────────────────────
const gymForm = document.getElementById('gymForm');
const formOk  = document.getElementById('formOk');
if (gymForm) {
  gymForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = gymForm.querySelector('button');
    btn.textContent = 'Booking...';
    btn.style.opacity = '.7';
    setTimeout(() => {
      btn.textContent  = '✓ Booked! We\'ll reach out within 24hrs';
      btn.style.opacity = '1';
      btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
      formOk.textContent = 'Your free trial session has been requested. See you at Apex! 💪';
      gymForm.reset();
      setTimeout(() => {
        btn.textContent  = 'Book Free Trial → ⚡';
        btn.style.background = '';
        formOk.textContent = '';
      }, 5000);
    }, 1800);
  });
}

// ── SMOOTH SCROLL ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── MAGNETIC BUTTONS ─────────────────────────
document.querySelectorAll('.btn-fire,.btn-ghost-w').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top  - r.height/2;
    btn.style.transform = `translate(${x*.25}px,${y*.25}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ── MARQUEE PAUSE ────────────────────────────
const mq = document.querySelector('.mq-track');
if (mq) {
  mq.addEventListener('mouseenter', () => mq.style.animationPlayState = 'paused');
  mq.addEventListener('mouseleave', () => mq.style.animationPlayState = 'running');
}

console.log('%cApex Fitness ⚡', 'color:#F97316;font-size:20px;font-weight:bold;');
console.log('%cDesigned & Developed by Saher | nexaaweb.github.io', 'color:#888;font-size:12px;');
