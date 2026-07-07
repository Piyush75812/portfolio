/* ============================================================
   PIYUSH KUMAR – DEVELOPER PORTFOLIO
   script.js  |  All Dynamic Features
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   1. LOADING SCREEN
   Hides the loader overlay after the page fully loads
───────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Give the fill animation time to complete (≈1.4s), then fade out
  setTimeout(() => {
    loader.classList.add('hide');
    // Remove from DOM after fade so it doesn't block interactions
    setTimeout(() => loader.remove(), 500);
  }, 1500);
});


/* ─────────────────────────────────────────────
   2. DARK / LIGHT MODE TOGGLE
   Reads user's saved preference or system preference,
   then toggles on button click
───────────────────────────────────────────── */
(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  themeIcon.className = theme === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
}

// Set icon on initial load
updateThemeIcon(document.documentElement.getAttribute('data-theme'));

themeToggle && themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});


/* ─────────────────────────────────────────────
   3. STICKY NAVBAR + SCROLL PROGRESS BAR
   Adds .scrolled class to navbar and updates
   the thin progress bar at the very top
───────────────────────────────────────────── */
const mainNav = document.getElementById('mainNav');
const scrollProgress = document.getElementById('scrollProgress');

function handleScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  // Update progress bar width
  if (scrollProgress) scrollProgress.style.width = progress + '%';

  // Compact navbar after scrolling 60px
  if (mainNav) mainNav.classList.toggle('scrolled', scrollTop > 60);

  // Back to top button visibility
  const btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('visible', scrollTop > 400);
}

window.addEventListener('scroll', handleScroll, { passive: true });


/* ─────────────────────────────────────────────
   4. ACTIVE NAV LINK HIGHLIGHT
   Uses IntersectionObserver to track which section
   is currently in view and highlights the nav link
───────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }  // trigger when section is ~40% from top
);

sections.forEach(sec => sectionObserver.observe(sec));


/* ─────────────────────────────────────────────
   5. TYPING ANIMATION
   Cycles through role titles with a typewriter effect
───────────────────────────────────────────── */
const typedEl = document.getElementById('typedText');
const roles = ['MERN Stack Developer', 'Full Stack Developer', 'Web Developer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typedEl) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Typing forward
    typedEl.textContent = currentRole.slice(0, ++charIndex);
    if (charIndex === currentRole.length) {
      // Pause at end before deleting
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    // Deleting
    typedEl.textContent = currentRole.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
      return;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeEffect, speed);
}

// Start typing after loader finishes (~1.5s)
setTimeout(typeEffect, 1600);


/* ─────────────────────────────────────────────
   6. HERO TAGLINE CYCLING
   Fades between three tagline phrases
───────────────────────────────────────────── */
const taglineEl = document.getElementById('heroTagline');
const taglines = [
  'Building Responsive Websites',
  'Creating User-Friendly Applications',
  'Aspiring Software Engineer'
];
let taglineIdx = 0;

function cycleTagline() {
  if (!taglineEl) return;
  taglineEl.style.opacity = '0';
  setTimeout(() => {
    taglineIdx = (taglineIdx + 1) % taglines.length;
    taglineEl.textContent = taglines[taglineIdx];
    taglineEl.style.opacity = '1';
  }, 400);
}

setInterval(cycleTagline, 3200);


/* ─────────────────────────────────────────────
   7. COUNTER ANIMATION
   Animates numbers from 0 to their target value
   when the about section enters the viewport
───────────────────────────────────────────── */
const counters = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1400; // ms
  const step = target / (duration / 16); // ~60fps
  let current = 0;

  const tick = () => {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current);
      requestAnimationFrame(tick);
    } else {
      el.textContent = target + (target >= 10 ? '+' : '');
    }
  };

  requestAnimationFrame(tick);
}

// Use IntersectionObserver so counters only run once they're visible
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target); // run only once
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach(counter => counterObserver.observe(counter));


/* ─────────────────────────────────────────────
   8. SKILL PROGRESS BARS
   Animates skill bars when they scroll into view
───────────────────────────────────────────── */
const progressBars = document.querySelectorAll('.progress-bar[data-width]');

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width') + '%';
        // Small delay so the animation is visible
        setTimeout(() => { bar.style.width = targetWidth; }, 200);
        progressObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);

progressBars.forEach(bar => progressObserver.observe(bar));


/* ─────────────────────────────────────────────
   9. SCROLL REVEAL ANIMATIONS
   Elements with data-reveal attribute animate in
   when they enter the viewport
───────────────────────────────────────────── */
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));


/* ─────────────────────────────────────────────
   10. PROJECT FILTER SYSTEM
   Filters project cards by category tag
───────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const show = filter === 'all' || category === filter;
      item.classList.toggle('hidden', !show);

      // Re-trigger reveal animation for newly shown items
      if (show) {
        item.classList.remove('revealed');
        requestAnimationFrame(() => {
          setTimeout(() => item.classList.add('revealed'), 50);
        });
      }
    });
  });
});

/* ===================================================
   CONTACT API
=================================================== */

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/contact"
    : "https://portfolio-backend-lggo.onrender.com/api/contact";
/* ===================================================
   11. CONTACT FORM
=================================================== */

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const formError = document.getElementById("formError");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {

  contactForm.addEventListener("submit", async function (e) {

    e.preventDefault();
    e.stopPropagation();

    // Hide previous alerts
    formSuccess.classList.add("d-none");
    formError.classList.add("d-none");

    // Bootstrap validation
    contactForm.classList.add("was-validated");

    if (!contactForm.checkValidity()) {
      return;
    }

    // Disable button while sending
    submitBtn.disabled = true;

    submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Sending...
        `;

    try {

      const formData = {

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        subject: document.getElementById("subject").value.trim(),

        message: document.getElementById("message").value.trim()

      };

      const controller = new AbortController();

      const timeout = setTimeout(() => {

        controller.abort();

      }, 10000);

      const response = await fetch(API_URL, {

        method: "POST",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(formData),

        signal: controller.signal

      });

      clearTimeout(timeout);

      // Read response as text first
      const text = await response.text();

      console.log("Server Response:", text);

      let data;

      try {

        data = JSON.parse(text);

      } catch (e) {

        throw new Error("Server returned HTML instead of JSON.");

      }

      if (!response.ok) {

        throw new Error(data.message || "Unable to send message.");

      }
      formSuccess.innerHTML = `
                <i class="bi bi-check-circle-fill me-2"></i>
                ${data.message}
            `;

      formSuccess.classList.remove("d-none");

      contactForm.reset();

      contactForm.classList.remove("was-validated");

    }

    catch (error) {

      console.error(error);

      if (error.name === "AbortError") {

        formError.innerHTML = `
                    <i class="bi bi-x-circle-fill me-2"></i>
                    Server is taking too long to respond.
                `;

      } else {

        formError.innerHTML = `
                    <i class="bi bi-x-circle-fill me-2"></i>
                    ${error.message}
                `;

      }

      formError.classList.remove("d-none");

    }

    finally {

      submitBtn.disabled = false;

      submitBtn.innerHTML = `
                <i class="bi bi-send me-2"></i>
                Send Message
            `;

    }

  });

}

/* ─────────────────────────────────────────────
   12. BACK TO TOP BUTTON
───────────────────────────────────────────── */
const backToTopBtn = document.getElementById('backToTop');

backToTopBtn && backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ─────────────────────────────────────────────
   13. SMOOTH SCROLL FOR ALL ANCHOR LINKS
   Ensures anchor links inside collapsed mobile nav
   close the menu and then scroll smoothly
───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    // Close Bootstrap mobile nav if open
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      bsCollapse && bsCollapse.hide();
    }

    // Scroll to section after a tiny delay (menu close animation)
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  });
});


/* ─────────────────────────────────────────────
   14. GLASSMORPHISM CARD TILT EFFECT (subtle)
   Adds a very mild 3D tilt on mouse move
   for glass cards — disabled on touch devices
───────────────────────────────────────────── */
if (!('ontouchstart' in window)) {
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;  // degrees
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}


/* ─────────────────────────────────────────────
   15. NAVBAR COLLAPSE ON LINK CLICK (mobile UX)
───────────────────────────────────────────── */
// Already handled in smooth scroll above (section 13)


/* ─────────────────────────────────────────────
   16. INITIAL SCROLL TRIGGER
   Handle the case where user lands mid-page
   (e.g. direct URL with hash) so reveals fire
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  handleScroll();  // update navbar + progress on first load
});
