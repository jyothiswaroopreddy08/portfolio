/* ======================================
   JYOTHI SWAROOP PORTFOLIO — app.js
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initTerminal();
  initScrollAnimations();
  initCounters();
  initSkillBars();
  initContactForm();
  initScrollTop();
});

/* ─── THEME ─────────────────────────────────────── */
function initTheme() {
  const btn = document.getElementById('themeToggle');
  const icon = btn.querySelector('.theme-icon');
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    icon.textContent = t === 'dark' ? '☀' : '🌙';
    localStorage.setItem('portfolio-theme', t);
  }
}

/* ─── NAV ─────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    highlightNav();
  }, { passive: true });

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        const offset = document.getElementById('navbar').offsetHeight + 20;
        window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
      }
    });
  });

  function highlightNav() {
    let active = '';
    sections.forEach(s => {
      const top = s.getBoundingClientRect().top;
      if (top < 120) active = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${active}`);
    });
  }
}

/* ─── TERMINAL ───────────────────────────────────── */
function initTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  const lines = [
    { type: 'cmd', text: '$ gh actions run pipeline.yml' },
    { type: 'out', text: '✓ Trigger: push to main' },
    { type: 'out', text: '→ Build        [████████████] 100%' },
    { type: 'out', text: '→ Test         [████████████] 100%' },
    { type: 'out', text: '→ Security     [████████████] 100%' },
    { type: 'ok',  text: '✓ Deploy complete — 2m 14s' },
    { type: 'cmd', text: '$ terraform apply -auto-approve' },
    { type: 'ok',  text: '✓ Apply complete! 12 added, 0 destroyed.' },
  ];

  let i = 0;
  let lineEl = null;
  let charIdx = 0;
  let cursor = null;

  function removeCursor() {
    if (cursor) { cursor.remove(); cursor = null; }
  }

  function typeChar() {
    if (i >= lines.length) {
      // Restart after pause
      setTimeout(() => {
        body.innerHTML = '';
        i = 0; lineEl = null; charIdx = 0; cursor = null;
        setTimeout(typeChar, 300);
      }, 4000);
      return;
    }

    const { type, text } = lines[i];

    if (charIdx === 0) {
      removeCursor();
      lineEl = document.createElement('div');
      lineEl.className = type;
      body.appendChild(lineEl);
    }

    if (charIdx < text.length) {
      lineEl.textContent = text.slice(0, charIdx + 1);
      charIdx++;
      removeCursor();
      cursor = document.createElement('span');
      cursor.className = 'cursor';
      lineEl.appendChild(cursor);
      body.scrollTop = body.scrollHeight;
      setTimeout(typeChar, type === 'cmd' ? 40 : 12);
    } else {
      removeCursor();
      charIdx = 0;
      i++;
      const delay = type === 'ok' ? 500 : 200;
      setTimeout(typeChar, delay);
    }
  }

  setTimeout(typeChar, 800);
}

/* ─── SCROLL ANIMATIONS ──────────────────────────── */
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ─── COUNTERS ───────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1600;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }

  requestAnimationFrame(step);
}

/* ─── SKILL BARS ─────────────────────────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll('.bar-fill');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animated');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => io.observe(b));
}

/* ─── CONTACT FORM ──────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    btn.disabled = true;

    // Simulate async submission
    await new Promise(r => setTimeout(r, 1800));

    showNotification('Message sent! I\'ll get back to you soon.', 'success');
    form.reset();
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
    btn.disabled = false;
  });
}

/* ─── SCROLL TOP ─────────────────────────────────── */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('hidden', window.scrollY < 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── NOTIFICATIONS ──────────────────────────────── */
function showNotification(message, type = 'success') {
  const n = document.createElement('div');
  n.className = `notification ${type}`;
  const icon = type === 'success' ? '✓' : '✕';
  n.innerHTML = `<span style="color:${type === 'success' ? 'var(--green)' : 'var(--red)'}; font-weight:700;">${icon}</span> ${message}`;
  document.body.appendChild(n);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => n.classList.add('show'));
  });

  setTimeout(() => {
    n.classList.remove('show');
    setTimeout(() => n.remove(), 400);
  }, 4500);
}
