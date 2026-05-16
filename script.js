/* ============================================
   BRIXON CAFE — Premium JavaScript
   ============================================ */

// ---- LOADER ----
window.addEventListener('load', () => {
  const fill = document.getElementById('loaderFill');
  const loader = document.getElementById('loader');
  fill.style.width = '100%';
  setTimeout(() => {
    loader.classList.add('done');
    document.body.style.overflow = '';
    initAnimations();
  }, 2400);
});
document.body.style.overflow = 'hidden';

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .menu-card, .pillar, .tab-btn, .g-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = 'rgba(200,150,90,0.8)';
    follower.style.width = '56px';
    follower.style.height = '56px';
    follower.style.borderColor = 'rgba(200,150,90,0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.background = '#C8965A';
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = '#C8965A';
  });
});

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- REVEAL ON SCROLL ----
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ---- COUNTER ANIMATION ----
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = true;
      const target = parseInt(entry.target.dataset.count);
      animateCounter(entry.target, target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ---- 3D CARD MOUSE EFFECT ----
const card3d = document.getElementById('card3d');
if (card3d) {
  document.addEventListener('mousemove', (e) => {
    const rect = card3d.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotX = (e.clientY - centerY) / 20;
    const rotY = (e.clientX - centerX) / 20;
    card3d.style.transform = `translateY(-20px) rotateX(${-rotX}deg) rotateY(${rotY - 8}deg)`;
  });
}

// ---- PARALLAX ----
const parallaxImg = document.getElementById('parallaxImg');
window.addEventListener('scroll', () => {
  if (parallaxImg) {
    const section = parallaxImg.closest('.experience');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const speed = 0.4;
    const offset = rect.top * speed;
    parallaxImg.style.transform = `translateY(${offset}px)`;
  }
});

// ---- MENU TABS ----
const tabs = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const selectedTab = tab.dataset.tab;
    menuCards.forEach(card => {
      if (card.dataset.tab === selectedTab) {
        card.classList.remove('hidden');
        card.classList.add('reveal-up');
        setTimeout(() => card.classList.add('revealed'), 50);
      } else {
        card.classList.add('hidden');
        card.classList.remove('revealed');
      }
    });
  });
});

// ---- ADD TO CART ANIMATION ----
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const original = this.textContent;
    this.textContent = '✓';
    this.style.background = '#4CAF50';
    this.style.color = 'white';
    setTimeout(() => {
      this.textContent = original;
      this.style.background = '';
      this.style.color = '';
    }, 1200);
  });
});

// ---- TESTIMONIAL SLIDER ----
const track = document.getElementById('testTrack');
const dotsContainer = document.getElementById('testDots');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
let currentTest = 0;

if (cards.length > 0) {
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'test-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    cards[currentTest].classList.remove('active');
    document.querySelectorAll('.test-dot')[currentTest].classList.remove('active');
    currentTest = index;
    cards[currentTest].classList.add('active');
    document.querySelectorAll('.test-dot')[currentTest].classList.add('active');

    const cardWidth = cards[0].offsetWidth + 24;
    const centerOffset = track.offsetWidth / 2 - cardWidth / 2;
    track.style.transform = `translateX(${-index * cardWidth + centerOffset}px)`;
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  }

  cards[0].classList.add('active');
  goToSlide(0);

  setInterval(() => {
    const next = (currentTest + 1) % cards.length;
    goToSlide(next);
  }, 4000);
}

// ---- CONTACT FORM ----
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Booking...';
    btn.style.background = '#888';
    setTimeout(() => {
      btn.textContent = '✓ Reservation Confirmed!';
      btn.style.background = '#4CAF50';
      note.textContent = "We'll confirm your reservation at the email provided. See you at Brixon!";
      setTimeout(() => {
        btn.textContent = 'Reserve Now ✦';
        btn.style.background = '';
        note.textContent = '';
        form.reset();
      }, 4000);
    }, 1800);
  });
}

// ---- MAGNETIC BUTTONS ----
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// ---- MARQUEE PAUSE ON HOVER ----
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

// ---- GALLERY CURSOR TEXT ----
document.querySelectorAll('.g-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    cursor.textContent = '↗';
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.fontSize = '14px';
    cursor.style.display = 'flex';
    cursor.style.alignItems = 'center';
    cursor.style.justifyContent = 'center';
  });
  item.addEventListener('mouseleave', () => {
    cursor.textContent = '';
    cursor.style.width = '10px';
    cursor.style.height = '10px';
  });
});

// ---- PAGE LOADED ----
console.log('%cBrixon Cafe ✦', 'color:#C8965A; font-size:18px; font-weight:bold;');
console.log('%cDesigned & Developed by Saher | nexaaweb.github.io', 'color:#888; font-size:12px;');
