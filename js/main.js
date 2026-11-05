// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  });
}

// Highlight the nav link for the section in view
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = navAnchors
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => observer.observe(s));
}

// Show the fallback card until a real intro video is added
const video = document.getElementById('intro-video');
if (video) {
  const fallback = video.parentElement.querySelector('.video-fallback');
  const showFallback = () => { video.hidden = true; fallback.hidden = false; };
  const source = video.querySelector('source');
  fetch(source.getAttribute('src'), { method: 'HEAD' })
    .then((res) => { if (!res.ok) showFallback(); })
    .catch(showFallback);
}

// Hide résumé buttons until the PDF has been added to assets/
const resumeLinks = document.querySelectorAll('a[download][href$=".pdf"]');
if (resumeLinks.length) {
  fetch(resumeLinks[0].getAttribute('href'), { method: 'HEAD' })
    .then((res) => { if (!res.ok) throw new Error(); })
    .catch(() => resumeLinks.forEach((a) => { a.hidden = true; }));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
