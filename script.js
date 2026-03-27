/* ============================================================
   SIDDHANGANA BHAGAT — PORTFOLIO INTERACTIONS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ── */
  const loader = document.getElementById('loader');
  const hide = () => setTimeout(() => loader.classList.add('out'), 900);
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);

  /* ── CUSTOM CURSOR ── */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (dot && ring) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    const raf = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(raf);
    };
    raf();
    const hover = document.querySelectorAll('a, button, .pill, .work-card, .tl-card');
    hover.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ── SCROLL PROGRESS BAR ── */
  const bar = document.getElementById('progressBar');
  const updateProgress = () => {
    const scrolled = document.documentElement.scrollTop;
    const total    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (bar) bar.style.width = (scrolled / total * 100) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── NAVIGATION BLUR ON SCROLL ── */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 36);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE HAMBURGER ── */
  const burger = document.getElementById('hamburger');
  const menu   = document.getElementById('mobileMenu');
  const links  = document.querySelectorAll('.mobile-link');

  const closeMenu = () => {
    burger?.classList.remove('open');
    menu?.classList.remove('open');
    document.body.style.overflow = '';
  };

  burger?.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  links.forEach(l => l.addEventListener('click', closeMenu));

  /* ── ROTATING WORDS ── */
  const words = document.querySelectorAll('.rcw');
  let wi = 0;
  if (words.length) {
    setInterval(() => {
      words[wi].classList.remove('active');
      wi = (wi + 1) % words.length;
      words[wi].classList.add('active');
    }, 2800);
  }

  /* ── INTERSECTION OBSERVER — SCROLL REVEALS ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealIO  = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );
  revealEls.forEach(el => revealIO.observe(el));

  /* ── ANIMATED COUNTERS ── */
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  const animateNum = (el) => {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const dur    = 1600;
    const t0     = performance.now();

    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const v = Math.round(easeOutCubic(p) * target);
      el.textContent = prefix + v + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // Hero stat counters — run once visible
  const heroStats = document.querySelectorAll('.h-stat-num[data-target]');
  const heroIO = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { animateNum(e.target); heroIO.unobserve(e.target); }
    }),
    { threshold: 0.6 }
  );
  heroStats.forEach(s => heroIO.observe(s));

  // Metrics band counters
  const counters = document.querySelectorAll('.counter[data-target]');
  const countIO  = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { animateNum(e.target); countIO.unobserve(e.target); }
    }),
    { threshold: 0.5 }
  );
  counters.forEach(c => countIO.observe(c));

  /* ── SKILLS TABS ── */
  const tabs   = document.querySelectorAll('.s-tab');
  const panels = document.querySelectorAll('.skills-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach  (t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tab-' + tab.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── BACK TO TOP ── */
  const top = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    top?.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  top?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── SMOOTH ANCHOR SCROLL (accounts for fixed nav) ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ── ACTIVE NAV LINK HIGHLIGHTING ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionIO = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        active?.classList.add('active');
      }
    }),
    { rootMargin: '-45% 0px -45% 0px' }
  );
  sections.forEach(s => sectionIO.observe(s));

  /* ── PILL HOVER SPARKLE (subtle stagger) ── */
  const pillGroups = document.querySelectorAll('.pills');
  pillGroups.forEach(group => {
    group.querySelectorAll('.pill').forEach((pill, i) => {
      pill.style.transitionDelay = `${i * 20}ms`;
    });
  });

});
