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

// ===== Results Timeline Interactivity =====
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
      bullets: [
        'Kickoff workshop with clear success metrics',
        'Messaging and page-priority recommendations',
        'Action plan that removes guesswork before design starts'
      ]
    },
    {
      topline: 'Week 2 design clarity',
      heading: 'Design Direction',
      description: 'We turn strategy into a visual system with page concepts, hierarchy, and polished direction your team can react to quickly.',
      bullets: [
        'Homepage and key page design concepts',
        'Brand-aligned typography and interface styling',
        'Fast review loop to keep momentum high'
      ]
    },
    {
      topline: 'Week 3 production push',
      heading: 'Build & Refine',
      description: 'Approved designs become a responsive marketing site with smooth interactions, performance checks, and content refinement as we go.',
      bullets: [
        'Responsive front-end build across core pages',
        'Content implementation and on-page polish',
        'QA passes for performance, clarity, and usability'
      ]
    },
    {
      topline: 'Week 4 go-live momentum',
      heading: 'Launch & Learn',
      description: 'We launch confidently, monitor the rollout, and give you the insights and next-step recommendations to keep improving results.',
      bullets: [
        'Launch support and final preflight checklist',
        'Analytics, form, and conversion tracking review',
        'Post-launch recommendations for the next growth sprint'
      ]
    }
  ];

  const setTimelineStep = (index) => {
    const data = timelineData[index];
    if (!data) return;

    timelineSteps.forEach((step, stepIndex) => {
      const isActive = stepIndex === index;
      step.classList.toggle('is-active', isActive);
      step.setAttribute('aria-pressed', String(isActive));
    });

    timelineTopline.style.opacity = '0';
    timelineHeading.style.opacity = '0';
    timelineDescription.style.opacity = '0';
    timelineList.style.opacity = '0';

    setTimeout(() => {
      timelineTopline.textContent = data.topline;
      timelineHeading.textContent = data.heading;
      timelineDescription.textContent = data.description;
      timelineList.innerHTML = data.bullets.map(item => `<li>${item}</li>`).join('');

      timelineTopline.style.opacity = '1';
      timelineHeading.style.opacity = '1';
      timelineDescription.style.opacity = '1';
      timelineList.style.opacity = '1';
    }, 160);
  };

  timelineSteps.forEach((step, index) => {
    step.addEventListener('click', () => setTimelineStep(index));
    step.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        const nextIndex = (index + 1) % timelineSteps.length;
        timelineSteps[nextIndex].focus();
        setTimelineStep(nextIndex);
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        const prevIndex = (index - 1 + timelineSteps.length) % timelineSteps.length;
        timelineSteps[prevIndex].focus();
        setTimelineStep(prevIndex);
      }
    });
  });
}

// ===== ROI Calculator =====
const roiForm = document.getElementById('roiForm');
const monthlyVisitorsInput = document.getElementById('monthlyVisitors');
const currentRateInput = document.getElementById('currentRate');
const avgValueInput = document.getElementById('avgValue');
const newLeadsOutput = document.getElementById('roiNewLeads');
const revenueOutput = document.getElementById('roiRevenue');
const upliftOutput = document.getElementById('roiUplift');

if (roiForm && monthlyVisitorsInput && currentRateInput && avgValueInput && newLeadsOutput && revenueOutput && upliftOutput) {
  const formatNumber = (value) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
  const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  const updateRoi = () => {
    const visitors = Number(monthlyVisitorsInput.value) || 0;
    const currentRate = (Number(currentRateInput.value) || 0) / 100;
    const avgValue = Number(avgValueInput.value) || 0;
    const improvedRate = currentRate * 1.35;
    const currentLeads = visitors * currentRate;
    const improvedLeads = visitors * improvedRate;
    const extraLeads = Math.max(0, improvedLeads - currentLeads);
    const monthlyRevenueLift = extraLeads * avgValue;
    const upliftPercent = currentRate > 0 ? ((improvedRate - currentRate) / currentRate) * 100 : 0;

    newLeadsOutput.textContent = `+${formatNumber(Math.round(extraLeads))}`;
    revenueOutput.textContent = formatCurrency(Math.round(monthlyRevenueLift));
    upliftOutput.textContent = `+${formatNumber(Math.round(upliftPercent))}%`;
  };

  ['input', 'change'].forEach(eventName => {
    roiForm.addEventListener(eventName, updateRoi);
  });

  updateRoi();
}

// ===== Scroll-triggered reveal animations =====
const revealElements = document.querySelectorAll(
  '.service-card, .portfolio-card, .testimonial-card, .hero-stats .stat, .about-content, .about-visual, .contact-form, .contact-info, .section-title, .section-tag, .section-sub, .process-card, .process-spotlight, .comparison-card, .comparison-divider, .results-overview, .result-card, .results-chart, .chart-bar, .results-list li, .timeline-step, .timeline-panel, .roi-shell, .roi-input, .roi-card'
);

revealElements.forEach(el => {
  el.classList.add('reveal');
  const parent = el.parentElement;
  if (parent && (parent.classList.contains('services-grid') || parent.classList.contains('portfolio-grid') || parent.classList.contains('testimonials-grid') || parent.classList.contains('hero-stats') || parent.classList.contains('process-grid') || parent.classList.contains('comparison-grid') || parent.classList.contains('results-metrics') || parent.classList.contains('results-chart') || parent.classList.contains('results-list') || parent.classList.contains('timeline') || parent.classList.contains('roi-inputs') || parent.classList.contains('roi-results'))) {
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

// ===== Results Section Animation =====
const chartBars = document.querySelectorAll('.chart-bar');
if (chartBars.length > 0) {
  const barsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        chartBars.forEach(bar => {
          const targetHeight = bar.getAttribute('data-height');
          bar.style.height = `${targetHeight}%`;
        });
        barsObserver.disconnect();
      }
    });
  }, { threshold: 0.35 });

  const chart = document.querySelector('.results-chart');
  if (chart) barsObserver.observe(chart);
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
