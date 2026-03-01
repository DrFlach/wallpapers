/* ╔══════════════════════════════════════════════════════╗
   ║  WallpaperHub — Main Application Logic              ║
   ╚══════════════════════════════════════════════════════╝ */

(function () {
  'use strict';

  /* ── State ── */
  const state = {
    wallpapers: [],
    filtered: [],
    activeCategory: 'all',
    activeDevice: 'phone',
    searchQuery: '',
    viewMode: 'grid',
    selectedWallpaper: null,
    downloadRes: '1080x1920',
  };

  const deviceResolutions = {
    phone:   { w: 1080, h: 1920, label: 'Phone 1080×1920' },
    laptop:  { w: 1920, h: 1080, label: 'Laptop 1920×1080' },
    tablet:  { w: 2048, h: 1536, label: 'Tablet 2048×1536' },
    desktop: { w: 3840, h: 2160, label: '4K Monitor 3840×2160' },
  };

  const categoryNames = {
    all: 'All',
    gradients: 'Gradients',
    abstract: 'Abstract',
    space: 'Space',
    nature: 'Nature',
    minimal: 'Minimal',
    dark: 'Dark',
  };

  /* ── DOM refs ── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    loader: $('#loader'),
    header: $('#header'),
    gallery: $('#gallery'),
    noResults: $('#noResults'),
    resultsCount: $('#resultsCount'),
    searchInput: $('#searchInput'),
    modal: $('#modal'),
    modalClose: $('#modalClose'),
    modalCanvas: $('#modalCanvas'),
    modalTitle: $('#modalTitle'),
    modalCategory: $('#modalCategory'),
    modalSize: $('#modalSize'),
    modalTags: $('#modalTags'),
    modalColors: $('#modalColors'),
    modalDevices: $('#modalDevices'),
    downloadBtn: $('#downloadBtn'),
    heroBgCanvas: $('#heroBgCanvas'),
    mobileMenuBtn: $('#mobileMenuBtn'),
    mobileMenu: $('#mobileMenu'),
  };

  /* ── Init ── */
  async function init() {
    // Render hero background
    WallpaperGen.renderHeroBackground(els.heroBgCanvas);
    window.addEventListener('resize', () => {
      WallpaperGen.renderHeroBackground(els.heroBgCanvas);
    });

    // Fetch wallpapers
    try {
      const res = await fetch('/api/wallpapers');
      state.wallpapers = await res.json();
    } catch {
      // Fallback — data embedded in page is unlikely, use empty
      state.wallpapers = [];
    }

    state.filtered = [...state.wallpapers];
    renderGallery();
    bindEvents();

    // Hide loader
    setTimeout(() => {
      els.loader.classList.add('hidden');
    }, 600);
  }

  /* ── Render Gallery ── */
  function renderGallery() {
    const frag = document.createDocumentFragment();
    els.gallery.innerHTML = '';

    if (state.filtered.length === 0) {
      els.noResults.style.display = 'block';
      els.resultsCount.textContent = 'No results found';
      return;
    }

    els.noResults.style.display = 'none';
    els.resultsCount.textContent = `Showing: ${state.filtered.length} wallpapers`;

    state.filtered.forEach((wp, i) => {
      const card = document.createElement('div');
      card.className = 'wallpaper-card';
      card.style.animationDelay = `${i * 0.05}s`;
      card.dataset.id = wp.id;

      const canvas = document.createElement('canvas');
      card.appendChild(canvas);

      // Overlay
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay';
      overlay.innerHTML = `
        <div class="card-info">
          <div class="card-title">${wp.title}</div>
          <div class="card-category">${categoryNames[wp.category] || wp.category}</div>
        </div>
      `;
      card.appendChild(overlay);

      // Action buttons
      const actions = document.createElement('div');
      actions.className = 'card-actions';
      actions.innerHTML = `
        <button class="card-action-btn card-preview-btn" data-id="${wp.id}" aria-label="Preview">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
        <button class="card-action-btn card-download-btn" data-id="${wp.id}" aria-label="Download">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>
      `;
      card.appendChild(actions);

      frag.appendChild(card);

      // Render wallpaper on canvas at thumbnail size
      requestAnimationFrame(() => {
        WallpaperGen.render(canvas, wp, 560, 350);
      });
    });

    els.gallery.appendChild(frag);
  }

  /* ── Filter Logic ── */
  function applyFilters() {
    let results = [...state.wallpapers];

    // Category
    if (state.activeCategory !== 'all') {
      results = results.filter(wp => wp.category === state.activeCategory);
    }

    // Search
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      results = results.filter(wp =>
        wp.title.toLowerCase().includes(q) ||
        wp.tags.some(t => t.toLowerCase().includes(q)) ||
        (categoryNames[wp.category] || '').toLowerCase().includes(q)
      );
    }

    state.filtered = results;
    renderGallery();
  }

  /* ── Modal ── */
  function openModal(wp) {
    state.selectedWallpaper = wp;
    state.downloadRes = deviceResolutions[state.activeDevice]
      ? `${deviceResolutions[state.activeDevice].w}x${deviceResolutions[state.activeDevice].h}`
      : '1080x1920';

    els.modalTitle.textContent = wp.title;
    els.modalCategory.textContent = categoryNames[wp.category] || wp.category;
    updateModalSize();

    // Tags
    els.modalTags.innerHTML = wp.tags.map(t => `<span class="modal-tag">#${t}</span>`).join('');

    // Colors
    els.modalColors.innerHTML = wp.colors.map(c =>
      `<div class="modal-color" style="background:${c}" data-color="${c}" title="${c}"></div>`
    ).join('');

    // Device buttons
    const [resW, resH] = state.downloadRes.split('x');
    $$('.modal-device-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.res === state.downloadRes);
    });

    // Render preview
    const [pw, ph] = state.downloadRes.split('x').map(Number);
    const previewScale = 0.4;
    WallpaperGen.render(els.modalCanvas, wp, Math.round(pw * previewScale), Math.round(ph * previewScale));

    els.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    els.modal.classList.remove('open');
    document.body.style.overflow = '';
    state.selectedWallpaper = null;
  }

  function updateModalSize() {
    const [w, h] = state.downloadRes.split('x');
    els.modalSize.textContent = `${w} × ${h}`;
  }

  /* ── Download ── */
  function downloadWallpaper() {
    if (!state.selectedWallpaper) return;
    const [w, h] = state.downloadRes.split('x').map(Number);

    const offscreen = document.createElement('canvas');
    WallpaperGen.render(offscreen, state.selectedWallpaper, w, h);

    offscreen.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `WallpaperHub_${state.selectedWallpaper.title.replace(/\s+/g, '_')}_${w}x${h}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  function quickDownload(wp) {
    const dev = deviceResolutions[state.activeDevice];
    const offscreen = document.createElement('canvas');
    WallpaperGen.render(offscreen, wp, dev.w, dev.h);

    offscreen.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `WallpaperHub_${wp.title.replace(/\s+/g, '_')}_${dev.w}x${dev.h}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  /* ── Events ── */
  function bindEvents() {
    // Scroll -> header style
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          els.header.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    });

    // Category buttons
    $$('.category-card').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.category-card').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeCategory = btn.dataset.category;
        applyFilters();

        // Scroll to catalog
        const cat = document.getElementById('catalog');
        if (cat) cat.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Footer category links
    $$('[data-filter-cat]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const cat = link.dataset.filterCat;
        state.activeCategory = cat;
        $$('.category-card').forEach(b => {
          b.classList.toggle('active', b.dataset.category === cat);
        });
        applyFilters();
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Device cards
    $$('.device-card').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.device-card').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeDevice = btn.dataset.device;
      });
    });

    // Search
    let searchDebounce;
    els.searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        state.searchQuery = els.searchInput.value.trim();
        applyFilters();
      }, 250);
    });

    // Keyboard shortcut for search
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== els.searchInput) {
        e.preventDefault();
        els.searchInput.focus();
      }
      if (e.key === 'Escape') {
        if (els.modal.classList.contains('open')) {
          closeModal();
        } else {
          els.searchInput.blur();
        }
      }
    });

    // View toggle
    $$('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.viewMode = btn.dataset.view;
        els.gallery.classList.toggle('large', state.viewMode === 'large');
      });
    });

    // Gallery click delegation
    els.gallery.addEventListener('click', (e) => {
      const card = e.target.closest('.wallpaper-card');
      if (!card) return;

      const id = parseInt(card.dataset.id);
      const wp = state.wallpapers.find(w => w.id === id);
      if (!wp) return;

      // Check if download button was clicked
      const dlBtn = e.target.closest('.card-download-btn');
      if (dlBtn) {
        quickDownload(wp);
        return;
      }

      // Otherwise open modal
      openModal(wp);
    });

    // Modal close
    els.modalClose.addEventListener('click', closeModal);
    els.modal.addEventListener('click', (e) => {
      if (e.target === els.modal) closeModal();
    });

    // Modal device selection
    els.modalDevices.addEventListener('click', (e) => {
      const btn = e.target.closest('.modal-device-btn');
      if (!btn) return;

      $$('.modal-device-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.downloadRes = btn.dataset.res;
      updateModalSize();

      // Re-render preview
      if (state.selectedWallpaper) {
        const [pw, ph] = state.downloadRes.split('x').map(Number);
        const previewScale = 0.4;
        WallpaperGen.render(els.modalCanvas, state.selectedWallpaper, Math.round(pw * previewScale), Math.round(ph * previewScale));
      }
    });

    // Download button
    els.downloadBtn.addEventListener('click', downloadWallpaper);

    // Mobile menu
    els.mobileMenuBtn.addEventListener('click', () => {
      els.mobileMenu.classList.toggle('open');
    });
    $$('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        els.mobileMenu.classList.remove('open');
      });
    });

    // Nav links
    $$('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        $$('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ── Start ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
