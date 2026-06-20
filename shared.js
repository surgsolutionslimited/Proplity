/**
 * Proplity â€” Shared JavaScript
 * Mobile drawer, active nav, scroll reveal, autocomplete, FAQ accordion,
 * toast notifications, and progress ring animations.
 * Include at the bottom of <body> on every page.
 */

(function () {
  'use strict';

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     1. PAGE ENTRY ANIMATION
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('pw-page');
  });

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     2. ACTIVE NAV DETECTION
     Marks the current page's nav link as active
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  (function markActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    // Desktop nav links
    document.querySelectorAll('[data-nav-link]').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active-nav');
        link.setAttribute('aria-current', 'page');
      }
    });
    // Drawer links
    document.querySelectorAll('.pw-drawer-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     3. MOBILE DRAWER
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  (function initDrawer() {
    // Create drawer DOM if not present
    if (document.getElementById('pw-drawer')) return;

    const page = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = [
      { href: 'index.html',            icon: 'search',        label: 'Search' },
      { href: 'property-insights.html',icon: 'dashboard',     label: 'Dashboard' },
      { href: 'comparable-sales.html', icon: 'map',           label: 'Map' },
      { href: 'pricing.html',          icon: 'credit_card',   label: 'Pricing' },
      { href: 'agency-dashboard.html', icon: 'business',      label: 'Agency' },
      { href: 'sign-in.html',          icon: 'login',         label: 'Sign In' },
    ];

    const drawerLinks = navItems.map(item => {
      const isActive = item.href === page;
      return `<a href="${item.href}" class="pw-drawer-link ${isActive ? 'active' : ''}">
        <span class="material-symbols-outlined" style="font-size:20px">${item.icon}</span>
        <span>${item.label}</span>
        ${isActive ? '<span class="material-symbols-outlined ml-auto" style="font-size:16px;color:var(--color-primary)">chevron_right</span>' : ''}
      </a>`;
    }).join('');

    const overlay = document.createElement('div');
    overlay.id = 'pw-drawer-overlay';
    overlay.setAttribute('role', 'presentation');
    overlay.addEventListener('click', closeDrawer);

    const drawer = document.createElement('nav');
    drawer.id = 'pw-drawer';
    drawer.setAttribute('role', 'navigation');
    drawer.setAttribute('aria-label', 'Main navigation');
    drawer.innerHTML = `
      <div class="pw-drawer-header">
        <a href="index.html" class="flex items-center gap-2" style="text-decoration:none">
          <img src="logo.svg" alt="Proplity Logo" style="height:24px"/>
        </a>
        <button id="pw-drawer-close" aria-label="Close menu" style="background:none;border:none;cursor:pointer;padding:4px;border-radius:8px;display:flex;align-items:center;color:var(--color-on-surface-var)">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="pw-drawer-nav">${drawerLinks}</div>
      <div class="pw-drawer-footer">
        <a href="sign-in.html" style="display:flex;align-items:center;justify-content:center;gap:8px;padding:12px;border-radius:12px;background:var(--color-primary-container);color:#fff;font-family:Geist,sans-serif;font-weight:700;font-size:14px;text-decoration:none;">
          <span class="material-symbols-outlined" style="font-size:18px">person</span>
          Sign In / Create Account
        </a>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    document.getElementById('pw-drawer-close')?.addEventListener('click', closeDrawer);

    // Wire all hamburger buttons
    document.querySelectorAll('[data-drawer-open], [aria-label="Menu"]').forEach(btn => {
      btn.addEventListener('click', openDrawer);
    });

    // Keyboard: Escape closes
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });
  })();

  function openDrawer() {
    document.getElementById('pw-drawer')?.classList.add('open');
    document.getElementById('pw-drawer-overlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    document.getElementById('pw-drawer')?.classList.remove('open');
    document.getElementById('pw-drawer-overlay')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     4. SCROLL REVEAL
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  (function initScrollReveal() {
    const els = document.querySelectorAll('.pw-reveal');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
  })();

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     5. PROGRESS RING ANIMATION ON SCROLL
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  (function initRings() {
    const rings = document.querySelectorAll('[data-ring-value]');
    if (!rings.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const value = parseInt(el.dataset.ringValue, 10); // 0â€“100
        const radius = 45;
        const circumference = 2 * Math.PI * radius; // â‰ˆ 282.7
        const offset = circumference - (value / 100) * circumference;
        const path = el.querySelector('.pw-ring-path');
        if (path) {
          path.style.strokeDasharray = circumference;
          path.style.strokeDashoffset = offset;
        }
        // Animate counter
        const counter = el.querySelector('[data-ring-counter]');
        if (counter) {
          let start = 0;
          const duration = 1400;
          const startTime = performance.now();
          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(eased * value);
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
        io.unobserve(el);
      });
    }, { threshold: 0.3 });

    rings.forEach(r => io.observe(r));
  })();

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     6. POSTCODE AUTOCOMPLETE
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  const POSTCODES = [
    { label: 'London, SW1A 1AA', sub: 'City of Westminster', icon: 'location_on' },
    { label: 'London, E14 5AB',  sub: 'Canary Wharf',        icon: 'location_on' },
    { label: 'London, W11 2BQ',  sub: 'Notting Hill',        icon: 'location_on' },
    { label: 'London, EC2V 8RT', sub: 'City of London',      icon: 'location_on' },
    { label: 'Manchester, M1 1AE',sub: 'City Centre',        icon: 'location_on' },
    { label: 'Manchester, M20 2RF',sub:'Didsbury',           icon: 'location_on' },
    { label: 'Birmingham, B1 1BB',sub: 'City Centre',        icon: 'location_on' },
    { label: 'Edinburgh, EH1 1YZ',sub: 'Old Town',           icon: 'location_on' },
    { label: 'Bristol, BS1 4ST',  sub: 'Harbourside',        icon: 'location_on' },
    { label: 'Leeds, LS1 4DY',    sub: 'City Centre',        icon: 'location_on' },
    { label: 'Oxford, OX1 1DP',   sub: 'City Centre',        icon: 'location_on' },
    { label: 'Cambridge, CB1 1JB',sub: 'City Centre',        icon: 'location_on' },
    { label: 'Bath, BA1 1LZ',     sub: 'City Centre',        icon: 'location_on' },
    { label: 'Brighton, BN1 1AH', sub: 'City Centre',        icon: 'location_on' },
    { label: 'York, YO1 9QL',     sub: 'City Centre',        icon: 'location_on' },
  ];

  window.initAutocomplete = function(inputId, dropdownId, onSelect) {
    const input    = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return;

    input.setAttribute('autocomplete', 'off');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('aria-autocomplete', 'list');

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q || q.length < 2) { dropdown.classList.remove('open'); return; }
      const matches = POSTCODES.filter(p =>
        p.label.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q)
      ).slice(0, 5);

      if (!matches.length) { dropdown.classList.remove('open'); return; }

      dropdown.innerHTML = matches.map(m => `
        <div class="pw-autocomplete-item" data-value="${m.label}">
          <span class="material-symbols-outlined icon">${m.icon}</span>
          <div class="label">
            <div>${m.label}</div>
            <div class="sublabel">${m.sub}</div>
          </div>
          <span class="material-symbols-outlined" style="font-size:16px;color:var(--color-outline-var)">north_west</span>
        </div>`).join('');

      dropdown.querySelectorAll('.pw-autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
          input.value = item.dataset.value;
          dropdown.classList.remove('open');
          if (typeof onSelect === 'function') onSelect(item.dataset.value);
        });
      });
      dropdown.classList.add('open');
    });

    document.addEventListener('click', e => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });

    input.addEventListener('keydown', e => {
      const items = dropdown.querySelectorAll('.pw-autocomplete-item');
      const focused = dropdown.querySelector('.pw-autocomplete-item:focus');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        (focused ? focused.nextElementSibling || items[0] : items[0])?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        (focused ? focused.previousElementSibling || items[items.length - 1] : items[items.length - 1])?.focus();
      } else if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        input.focus();
      } else if (e.key === 'Enter' && dropdown.classList.contains('open')) {
        e.preventDefault();
        if (focused) focused.click();
        else if (items[0]) items[0].click();
        if (typeof onSelect === 'function') onSelect(input.value);
      }
    });

    dropdown.querySelectorAll('.pw-autocomplete-item').forEach(item => {
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter') item.click();
      });
    });
  };

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     7. FAQ ACCORDION
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  (function initFAQ() {
    document.querySelectorAll('.pw-faq-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.pw-faq-item');
        const isOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.pw-faq-item.open').forEach(i => i.classList.remove('open'));
        // Open this one if it was closed
        if (!isOpen) item.classList.add('open');
      });
    });
  })();

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     8. TOAST NOTIFICATION
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  window.pwToast = function(message, icon = 'check_circle', duration = 3000) {
    let toast = document.getElementById('pw-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'pw-toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px;font-variation-settings:'FILL' 1">${icon}</span><span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
  };

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     9. STICKY NAV SHADOW
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  (function initNavShadow() {
    const nav = document.getElementById('top-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 8 ? '0 2px 16px rgba(15,110,86,0.07)' : '';
    }, { passive: true });
  })();

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     10. SPARKLINE CHART BUILDER
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  window.pwSparkline = function(containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const {
      color = '#005440', width = container.offsetWidth || 400, height = 80,
      showDots = true, showArea = true, strokeWidth = 2.5
    } = options;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const pad = { top: 10, right: 10, bottom: 10, left: 10 };
    const W = width - pad.left - pad.right;
    const H = height - pad.top - pad.bottom;

    const points = data.map((v, i) => ({
      x: pad.left + (i / (data.length - 1)) * W,
      y: pad.top + H - ((v - min) / range) * H
    }));

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
    const areaD = `${pathD} L${points[points.length-1].x.toFixed(2)},${(pad.top + H).toFixed(2)} L${pad.left},${(pad.top+H).toFixed(2)} Z`;

    const dots = showDots ? points.map((p, i) => `
      <circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${i === data.length - 1 ? 5 : 3}"
        fill="${i === data.length - 1 ? color : '#fff'}" stroke="${color}" stroke-width="2"
        ${i === data.length - 1 ? '' : 'opacity="0.4"'}/>`
    ).join('') : '';

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="pw-sparkline" style="width:100%;height:${height}px">
        <defs>
          <linearGradient id="sg-${containerId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${showArea ? `<path d="${areaD}" fill="url(#sg-${containerId})" class="area"/>` : ''}
        <path d="${pathD}" stroke="${color}" class="line" stroke-width="${strokeWidth}"/>
        ${dots}
      </svg>`;
  };

})();
