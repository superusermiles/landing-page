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

// ===== Process Section Interactivity =====
const processCards = document.querySelectorAll('.process-card');
const processTitle = document.getElementById('processTitle');
const processText = document.getElementById('processText');

if (processCards.length > 0 && processTitle && processText) {
  const processData = {
    1: { title: 'Discover', text: 'We learn about your business, audience, goals, and current blockers so the new site solves the right problems.' },
    2: { title: 'Design', text: 'We shape the structure, visuals, and messaging into a polished direction tailored to your brand and funnel.' },
    3: { title: 'Build', text: 'We turn approved designs into a fast, responsive experience with clean development and careful QA.' },
    4: { title: 'Launch', text: 'We deploy, optimize, and support the rollout so your site performs from day one and keeps improving after go-live.' }
  };

  processCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const step = card.getAttribute('data-step');
      const data = processData[step];

      processCards.forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');

      processTitle.style.opacity = '0';
      processText.style.opacity = '0';

      setTimeout(() => {
        processTitle.textContent = data.title;
        processText.textContent = data.text;
        processTitle.style.opacity = '1';
        processText.style.opacity = '1';
      }, 150);
    });
  });
}

// ===== Testimonial Slider =====
const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let testimonialIndex = 0;
let testimonialInterval;

function showTestimonial(index) {
  if (!testimonialSlides.length) return;

  testimonialIndex = (index + testimonialSlides.length) % testimonialSlides.length;

  testimonialSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === testimonialIndex;
    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
  });

  testimonialDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === testimonialIndex;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-pressed', String(isActive));
  });
}

function startTestimonialAutoplay() {
  if (testimonialSlides.length < 2) return;
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(() => {
    showTestimonial(testimonialIndex + 1);
  }, 5000);
}

if (testimonialSlides.length) {
  showTestimonial(0);
  startTestimonialAutoplay();

  testimonialPrev?.addEventListener('click', () => {
    showTestimonial(testimonialIndex - 1);
    startTestimonialAutoplay();
  });

  testimonialNext?.addEventListener('click', () => {
    showTestimonial(testimonialIndex + 1);
    startTestimonialAutoplay();
  });

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
      startTestimonialAutoplay();
    });
  });

  testimonialSlider?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showTestimonial(testimonialIndex - 1);
      startTestimonialAutoplay();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showTestimonial(testimonialIndex + 1);
      startTestimonialAutoplay();
    }
  });

  testimonialSlider?.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
  testimonialSlider?.addEventListener('mouseleave', startTestimonialAutoplay);
  testimonialSlider?.addEventListener('focusin', () => clearInterval(testimonialInterval));
  testimonialSlider?.addEventListener('focusout', startTestimonialAutoplay);
}

// ===== Scroll-triggered reveal animations =====
const revealElements = document.querySelectorAll(
  '.service-card, .portfolio-card, .testimonial-card, .testimonial-slide, .hero-stats .stat, .about-content, .about-visual, .contact-form, .contact-info, .section-title, .section-tag, .section-sub, .process-card, .process-spotlight, .comparison-card, .comparison-divider, .testimonials-shell'
);

revealElements.forEach(el => {
  el.classList.add('reveal');
  const parent = el.parentElement;
  if (parent && (parent.classList.contains('services-grid') || parent.classList.contains('portfolio-grid') || parent.classList.contains('testimonials-grid') || parent.classList.contains('hero-stats') || parent.classList.contains('process-grid') || parent.classList.contains('comparison-grid') || parent.classList.contains('testimonial-slider'))) {
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
