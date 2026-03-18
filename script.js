// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Scroll-triggered reveal animations =====
const revealElements = document.querySelectorAll(
  '.service-card, .portfolio-card, .process-card, .process-spotlight, .testimonial-card, .hero-stats .stat, .about-content, .about-visual, .contact-form, .contact-info, .section-title, .section-tag, .section-sub'
);

revealElements.forEach((el) => {
  el.classList.add('reveal');
  // Stagger cards within grids
  const parent = el.parentElement;
  if (parent && (parent.classList.contains('services-grid') || parent.classList.contains('portfolio-grid') || parent.classList.contains('process-grid') || parent.classList.contains('testimonials-grid') || parent.classList.contains('hero-stats'))) {
    const siblings = Array.from(parent.children);
    el.style.transitionDelay = `${siblings.indexOf(el) * 80}ms`;
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => observer.observe(el));

// ===== Animated stat counters =====
function animateCounter(el, target, duration = 1400) {
  const isPercent = target.includes('%');
  const isPlus = target.includes('+');
  const isYr = target.includes('yr');
  const num = parseFloat(target);
  let start = null;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * num);
    el.textContent = current + (isPercent ? '%' : isPlus ? '+' : isYr ? 'yr' : '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const original = el.textContent.trim();
      animateCounter(el, original);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

// ===== Contact form feedback =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = '✓ Message sent!';
    btn.style.background = '#10b981';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
