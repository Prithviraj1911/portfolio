// Theme: follow the system until the visitor picks one
const root = document.documentElement;
root.classList.add('js');
const storage = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};
const savedTheme = storage.get('theme');
if (savedTheme) root.dataset.theme = savedTheme;
const themeBtn = document.querySelector('.theme-toggle');
const isDark = () => root.dataset.theme
  ? root.dataset.theme === 'dark'
  : matchMedia('(prefers-color-scheme: dark)').matches;
const syncThemeIcon = () => {
  if (!themeBtn) return;
  themeBtn.textContent = isDark() ? '☀' : '☾';
  themeBtn.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
};
if (themeBtn) {
  syncThemeIcon();
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    storage.set('theme', root.dataset.theme);
    syncThemeIcon();
  });
}

// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
if (toggle && links) {
  const setOpen = (open) => {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
}

// Highlight the nav link for the section in view
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = navAnchors.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => observer.observe(s));
}

// Reveal cards as they scroll into view
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Show the fallback card until a real intro video is added
const video = document.getElementById('intro-video');
if (video) {
  const fallback = video.parentElement.querySelector('.video-fallback');
  const showFallback = () => { video.hidden = true; fallback.hidden = false; };
  fetch(video.querySelector('source').getAttribute('src'), { method: 'HEAD' })
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

// Documentation library filters
const filters = document.querySelectorAll('.filter');
filters.forEach((btn) => btn.addEventListener('click', () => {
  filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  const want = btn.dataset.filter;
  document.querySelectorAll('.doc-card').forEach((card) => {
    card.hidden = want !== 'all' && !card.dataset.topics.split(' ').includes(want);
  });
}));

// Reading pages: table of contents, reading time, progress bar
const prose = document.querySelector('.prose');
if (prose) {
  const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const heads = [...prose.querySelectorAll('h2')];
  const tocList = document.querySelector('.toc ol');
  heads.forEach((h) => {
    if (!h.id) h.id = slug(h.textContent);
    if (tocList) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="#${h.id}"></a>`;
      li.firstChild.textContent = h.textContent;
      tocList.appendChild(li);
    }
  });
  const tocLinks = tocList ? [...tocList.querySelectorAll('a')] : [];
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const tio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) tocLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-15% 0px -75% 0px' });
    heads.forEach((h) => tio.observe(h));
  }

  const minutes = Math.max(1, Math.round(prose.textContent.trim().split(/\s+/).length / 220));
  const rt = document.querySelector('.reading-time');
  if (rt) rt.textContent = `${minutes} min read`;

  const bar = document.querySelector('.progress');
  if (bar) {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
