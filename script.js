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

// ===== Scroll-triggered reveal animations =====
const revealElements = document.querySelectorAll(
  '.service-card, .portfolio-card, .testimonial-card, .hero-stats .stat, .about-content, .about-visual, .contact-form, .contact-info, .section-title, .section-tag, .section-sub, .process-card, .process-spotlight, .comparison-card, .comparison-divider, .results-shell, .timeline-step, .timeline-panel, .timeline-list li'
);

revealElements.forEach(el => {
  el.classList.add('reveal');
  const parent = el.parentElement;
  if (parent && (parent.classList.contains('services-grid') || parent.classList.contains('portfolio-grid') || parent.classList.contains('testimonials-grid') || parent.classList.contains('hero-stats') || parent.classList.contains('process-grid') || parent.classList.contains('comparison-grid') || parent.classList.contains('timeline') || parent.classList.contains('timeline-list'))) {
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

// ===== Results timeline interactivity =====
const timelineSteps = document.querySelectorAll('.timeline-step');
const timelineTopline = document.getElementById('timelineTopline');
const timelineHeading = document.getElementById('timelineHeading');
const timelineDescription = document.getElementById('timelineDescription');
const timelineList = document.getElementById('timelineList');

if (timelineSteps.length > 0 && timelineTopline && timelineHeading && timelineDescription && timelineList) {
  const timelineData = [
    {
      topline: 'Week 1 foundation',
      heading: 'Strategy Sprint',
      description: 'We align on goals, audience, offer positioning, sitemap priorities, and the conversion actions your website needs to drive.',
      items: [
        'Kickoff workshop with clear success metrics',
        'Messaging and page-priority recommendations',
        'Action plan that removes guesswork before design starts'
      ]
    },
    {
      topline: 'Week 2 clarity',
      heading: 'Design Direction',
      description: 'We turn strategy into a visual route that feels premium, on-brand, and intentionally structured around your sales journey.',
      items: [
        'Homepage direction and core section hierarchy',
        'Visual system for typography, colour, and trust cues',
        'Fast review loop so approvals keep momentum high'
      ]
    },
    {
      topline: 'Week 3 execution',
      heading: 'Build & Refine',
      description: 'Approved designs become a responsive site with polished interactions, strong performance, and iterative refinements before launch.',
      items: [
        'Development across mobile, tablet, and desktop breakpoints',
        'Content, forms, and conversion touchpoints wired in',
        'QA pass covering speed, accessibility, and usability'
      ]
    },
    {
      topline: 'Week 4 momentum',
      heading: 'Launch & Learn',
      description: 'We ship confidently, monitor early behaviour, and use real insights to sharpen the site once it is live.',
      items: [
        'Launch support and final preflight checklist',
        'Analytics and key journey checks after go-live',
        'Next-step recommendations based on early user signals'
      ]
    }
  ];

  const updateTimeline = (index) => {
    const data = timelineData[index];

    timelineSteps.forEach((step, stepIndex) => {
      const isActive = stepIndex === index;
      step.classList.toggle('is-active', isActive);
      step.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    timelineTopline.textContent = data.topline;
    timelineHeading.textContent = data.heading;
    timelineDescription.textContent = data.description;
    timelineList.innerHTML = data.items.map(item => `<li>${item}</li>`).join('');

    Array.from(timelineList.children).forEach((item, itemIndex) => {
      item.classList.add('reveal', 'visible');
      item.style.transitionDelay = `${itemIndex * 80}ms`;
    });
  };

  timelineSteps.forEach((step, index) => {
    step.addEventListener('click', () => updateTimeline(index));
  });
}

// ===== Scrollspy navigation =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length > 0 && navAnchors.length > 0) {
  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 140;
    let currentId = '';

    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(link => {
      const matches = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('is-current', matches);
    });
  };

  setActiveLink();
  window.addEventListener('scroll', setActiveLink);
}

// ===== Floating CTA visibility =====
const floatingCta = document.getElementById('floatingCta');
if (floatingCta) {
  const toggleFloatingCta = () => {
    const shouldShow = window.scrollY > 520;
    floatingCta.classList.toggle('is-visible', shouldShow);
  };

  toggleFloatingCta();
  window.addEventListener('scroll', toggleFloatingCta);
}

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
