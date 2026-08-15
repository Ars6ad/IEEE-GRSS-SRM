/**
 * IEEE GRSS SRM - Interactive Logic Script
 * Features: Orbital Space Canvas, Theme Switcher, Smooth Navigation,
 * Animated Counters, Filterable Event Cards, Modal Dialogs & Toast Alerts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Init Theme Toggle ---
  initThemeToggle();

  // --- 2. Init Canvas Orbital & Particle Background ---
  initSpaceCanvas();

  // --- 3. Init Navigation & Mobile Drawer ---
  initNavigation();

  // --- 4. Init Animated Counters ---
  initAnimatedCounters();

  // --- 5. Init Event Filter & Modal Popup ---
  initEventsAndModal();

  // --- 6. Init Form Validation & Toast System ---
  initFormValidation();
});

/* ==========================================
   1. Theme Toggle System
   ========================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeBtn.querySelector('i');

  // Check stored theme preference
  const savedTheme = localStorage.getItem('ieee-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ieee-theme', newTheme);
    updateThemeIcon(newTheme, themeIcon);

    showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
  });
}

function updateThemeIcon(theme, iconElement) {
  if (theme === 'light') {
    iconElement.className = 'fas fa-moon';
  } else {
    iconElement.className = 'fas fa-sun';
  }
}

/* ==========================================
   2. Space & Satellite Canvas Animation
   ========================================== */
function initSpaceCanvas() {
  const canvas = document.getElementById('space-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Create stars/particles
  const particleCount = 80;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3
    });
  }

  // Satellite orbit trajectory line parameters
  let orbitAngle = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const particleColor = isLight ? 'rgba(2, 132, 199, ' : 'rgba(0, 242, 254, ';

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];

      // Update position
      p1.x += p1.speedX;
      p1.y += p1.speedY;

      // Wrap boundaries
      if (p1.x < 0) p1.x = width;
      if (p1.x > width) p1.x = 0;
      if (p1.y < 0) p1.y = height;
      if (p1.y > height) p1.y = 0;

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor + p1.alpha + ')';
      ctx.fill();

      // Connect neighbor dots
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = particleColor + (1 - dist / 130) * 0.15 + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================
   3. Navigation & Smooth Scroll Observer
   ========================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll header background toggle
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight current nav item on scroll
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });
}

/* ==========================================
   4. Animated Numbers Counter
   ========================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          let count = 0;
          const increment = Math.ceil(target / 40);

          const updateCount = () => {
            count += increment;
            if (count >= target) {
              counter.innerText = target + '+';
            } else {
              counter.innerText = count + '+';
              setTimeout(updateCount, 30);
            }
          };
          updateCount();
        });
        animated = true;
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================
   5. Event Filter & Modal Dialog Data
   ========================================== */
const eventData = {
  1: {
    title: "GeoHack 2025: AI for Earth Observation",
    category: "Hackathon",
    date: "March 24-25, 2025",
    time: "09:00 AM IST",
    location: "SRM Tech Park Auditorium / Hybrid",
    speaker: "Dr. K. Sivan & ISRO Geo-AI Mentors",
    image: "assets/geohack.png",
    description: "A 24-hour hackathon bringing together students to solve real-world climate, disaster management, and urban expansion challenges using satellite imagery (Sentinel-2, Landsat) and Deep Learning models."
  },
  2: {
    title: "Satellite Remote Sensing & GIS Workshop",
    category: "Workshop",
    date: "April 10, 2025",
    time: "10:00 AM - 04:00 PM IST",
    location: "Computer Lab 3, SRM IST",
    speaker: "IEEE GRSS Senior Research Fellow",
    image: "assets/gis_workshop.png",
    description: "Hands-on technical workshop covering PySTAC, QGIS, multispectral vegetation index (NDVI) computation, and cloud computing with Google Earth Engine."
  },
  3: {
    title: "Space-Borne Earth Monitoring Webinar",
    category: "Webinar",
    date: "May 05, 2025",
    time: "06:00 PM IST",
    location: "Zoom / IEEE Virtual Hall",
    speaker: "NASA-JPL Senior Scientist",
    image: "assets/hero_satellite.png",
    description: "An inspiring talk on next-generation SAR (Synthetic Aperture Radar) missions, soil moisture monitoring, and space data analytics opportunities for undergraduate students."
  },
  4: {
    title: "Drone Sensing & Field Acquisition Demo",
    category: "Field Event",
    date: "June 12, 2025",
    time: "08:30 AM IST",
    location: "SRM Campus Grounds",
    speaker: "Unmanned Aerial Systems Lab Team",
    image: "assets/drone_sensing.png",
    description: "Live demonstration of drone deployment, LIDAR terrain scanning, and ground control point survey calibration for high-resolution spatial data collection."
  }
};

function initEventsAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  const modalOverlay = document.getElementById('event-modal');
  const modalCloseBtn = document.getElementById('modal-close');

  // Filtering functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal display logic
  document.querySelectorAll('.open-event-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventId = btn.getAttribute('data-event-id');
      const data = eventData[eventId];

      if (data) {
        document.getElementById('modal-img').src = data.image;
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-date').innerText = data.date;
        document.getElementById('modal-time').innerText = data.time;
        document.getElementById('modal-location').innerText = data.location;
        document.getElementById('modal-speaker').innerText = data.speaker;
        document.getElementById('modal-desc').innerText = data.description;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
}

/* ==========================================
   6. Form Validation & Toast Notification
   ========================================== */
function initFormValidation() {
  const form = document.getElementById('join-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const domainSelect = document.getElementById('form-domain');
    const messageInput = document.getElementById('form-message');

    // Simple validation
    if (!nameInput.value.trim()) {
      showFieldError(nameInput, 'Full name is required');
      isValid = false;
    } else {
      clearFieldError(nameInput);
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      showFieldError(emailInput, 'Enter a valid SRM / Email address');
      isValid = false;
    } else {
      clearFieldError(emailInput);
    }

    if (!domainSelect.value) {
      showFieldError(domainSelect, 'Please select your domain interest');
      isValid = false;
    } else {
      clearFieldError(domainSelect);
    }

    if (isValid) {
      showToast('🎉 Application Submitted Successfully! Welcome to IEEE GRSS SRM.', 'success');
      form.reset();
    }
  });
}

function showFieldError(input, msg) {
  const group = input.closest('.form-group');
  if (group) {
    group.classList.add('invalid');
    const errSpan = group.querySelector('.form-error');
    if (errSpan) errSpan.innerText = msg;
  }
}

function clearFieldError(input) {
  const group = input.closest('.form-group');
  if (group) {
    group.classList.remove('invalid');
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
  toast.innerHTML = `<i class="fas ${iconClass}" style="color: var(--accent-cyan);"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
