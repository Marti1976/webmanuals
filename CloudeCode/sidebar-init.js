// Vkládá sidebar, navigaci mezi kapitolami a podporu lokálních podsekci.

// Uložená šířka sidebaru (nastavuje se tažením okraje). Platí jen na počítači – na mobilu zůstává výchozí.
const SB_WIDTH_KEY = 'cldeco-sidebar-width';
const SB_MIN = 200;
const SB_MAX = 520;
const SB_DESKTOP = window.matchMedia('(min-width: 901px)');
let sbUserWidth = null;
try {
  const savedWidth = parseInt(localStorage.getItem(SB_WIDTH_KEY), 10);
  if (savedWidth >= SB_MIN && savedWidth <= SB_MAX) sbUserWidth = savedWidth;
} catch (e) { /* localStorage nedostupný – zůstane výchozí šířka */ }
const applySidebarWidth = () => {
  if (sbUserWidth && SB_DESKTOP.matches) {
    document.documentElement.style.setProperty('--sidebar-width', sbUserWidth + 'px');
  } else {
    document.documentElement.style.removeProperty('--sidebar-width');
  }
};
applySidebarWidth();
SB_DESKTOP.addEventListener('change', applySidebarWidth);
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = document.body.dataset.page;
  const currentIndex = chapters.findIndex((chapter) => chapter.num === currentPage);
  if (currentIndex === -1) return;

  // Načti lokální kapitoly z JSON (pokud existují)
  const pageChaptersScript = document.getElementById('page-chapters');
  const pageChapters = pageChaptersScript ? JSON.parse(pageChaptersScript.textContent).chapters : null;

  const sidebarContainer = document.getElementById('sidebar');
  if (sidebarContainer) {
    // Vytvořit seznam kapitol s možností rozbalit lokální podsekce
    const links = chapters.map((chapter) => {
      const active = chapter.num === currentPage ? ' active' : '';
      const hasSubchapters = active && pageChapters; // Rozbalit pouze aktuální kapitolu s podsekce
      
      let html = `<li>
        <a class="sb-link${active}" href="${chapter.file}"${chapter.num === currentPage ? ' aria-current="page"' : ''}>
          <span>${chapter.num}</span>${chapter.name}
        </a>`;
      
      if (hasSubchapters) {
        html += `<ul class="sb-subchapters">`;
        pageChapters.forEach((subch) => {
          html += `<li><a href="#${subch.id}" class="sb-subchapter">${subch.num} · ${subch.name}</a></li>`;
        });
        html += `</ul>`;
      }
      
      html += `</li>`;
      return html;
    }).join('');

    sidebarContainer.innerHTML = `<nav class="sidebar" aria-label="Navigace">
      <a href="../index.html" class="sb-home">← Rozcestník</a>
      <div class="sb-search"><input type="text" id="sb-search-input" placeholder="🔍 Hledat…" autocomplete="off"></div>
      <ul class="sb-chapters">${links}</ul>
    </nav>`;

    const sidebar = sidebarContainer.querySelector('.sidebar');
    
    // Hamburger menu (mobilní)
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.type = 'button';
    hamburger.setAttribute('aria-label', 'Otevřít menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.textContent = '☰';

    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      backdrop.classList.remove('visible');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    const toggleSidebar = () => {
      const isOpen = sidebar.classList.toggle('open');
      backdrop.classList.toggle('visible', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    hamburger.addEventListener('click', toggleSidebar);
    backdrop.addEventListener('click', closeSidebar);
    
    // Zavřít sidebar při kliknutí na odkaz
    sidebar.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        // Klik na podsekci = scroll, zůstáváme na stejné stránce
        if (link.classList.contains('sb-subchapter')) {
          closeSidebar();
          // Scroll se provede přirozeně díky # v href
          return;
        }
        // Klik na externí odkaz = zavřít
        closeSidebar();
      });
    });
    
    document.body.append(hamburger, backdrop);

    // Roztažení sidebaru tažením za pravý okraj (jen na počítači), dvojklik = výchozí šířka
    const resizer = document.createElement('div');
    resizer.className = 'sb-resizer';
    resizer.title = 'Táhněte pro změnu šířky · dvojklik = výchozí';
    document.body.append(resizer);

    resizer.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      resizer.setPointerCapture(e.pointerId);
      document.body.classList.add('sb-resizing');
      let moved = false;
      const move = (ev) => {
        sbUserWidth = Math.min(SB_MAX, Math.max(SB_MIN, Math.round(ev.clientX)));
        moved = true;
        applySidebarWidth();
      };
      const up = () => {
        resizer.removeEventListener('pointermove', move);
        resizer.removeEventListener('pointerup', up);
        resizer.removeEventListener('pointercancel', up);
        document.body.classList.remove('sb-resizing');
        if (moved) {
          try { localStorage.setItem(SB_WIDTH_KEY, String(sbUserWidth)); } catch (err) { /* nic */ }
        }
      };
      resizer.addEventListener('pointermove', move);
      resizer.addEventListener('pointerup', up);
      resizer.addEventListener('pointercancel', up);
    });

    resizer.addEventListener('dblclick', () => {
      sbUserWidth = null;
      applySidebarWidth();
      try { localStorage.removeItem(SB_WIDTH_KEY); } catch (err) { /* nic */ }
    });

    // Hledání: mimo index Enter přesměruje na index s dotazem (?q=), na indexu řídí hledání skript indexu
    const sbSearchInput = document.getElementById('sb-search-input');
    if (sbSearchInput && currentPage !== chapters[0].num) {
      sbSearchInput.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const q = e.target.value.trim();
        if (q) window.location.href = chapters[0].file + '?q=' + encodeURIComponent(q);
      });
    }
  }

  // Zvýraznění aktuální podsekce při scrollu
  // Aktivní je poslední nadpis nad "čárou". Čára je normálně ve 30 % výšky okna,
  // ale v posledním úseku stránky se plynule posouvá až ke spodnímu okraji,
  // aby se postupně aktivovaly i krátké podsekce na konci stránky.
  if (pageChapters && pageChapters.length) {
    const subLinks = document.querySelectorAll('.sb-subchapter');
    const sidebarEl = document.querySelector('.sidebar');
    const targets = pageChapters.map((s) => document.getElementById(s.id)).filter(Boolean);
    let currentId = null;
    let clickedId = null; // po kliknutí v sidebaru drží vybranou podsekci, dokud uživatel sám neposune stránku

    const setActive = (id) => {
      if (id === currentId) return;
      currentId = id;
      subLinks.forEach((link) => {
        const on = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', on);
        // Aktivní podsekce zůstane vidět i ve scrollujícím sidebaru
        if (on && sidebarEl) {
          const r = link.getBoundingClientRect();
          const sr = sidebarEl.getBoundingClientRect();
          if (r.top < sr.top + 60) sidebarEl.scrollTop += r.top - sr.top - 60;
          else if (r.bottom > sr.bottom - 20) sidebarEl.scrollTop += r.bottom - sr.bottom + 20;
        }
      });
    };

    const update = () => {
      if (!targets.length) return;
      const vh = window.innerHeight;
      if (clickedId) {
        const el = document.getElementById(clickedId);
        const top = el ? el.getBoundingClientRect().top : -1;
        if (top >= 0 && top < vh) { setActive(clickedId); return; }
        clickedId = null;
      }
      const doc = document.documentElement;
      const remaining = doc.scrollHeight - (window.scrollY + vh);
      let line = vh * 0.3;
      if (remaining < vh) line = vh * 0.3 + vh * 0.7 * (1 - Math.max(remaining, 0) / vh);
      let current = targets[0];
      targets.forEach((t) => {
        if (t.getBoundingClientRect().top <= line) current = t;
      });
      setActive(current.id);
    };

    subLinks.forEach((link) => {
      link.addEventListener('click', () => {
        clickedId = link.getAttribute('href').slice(1);
        setActive(clickedId);
      });
    });
    ['wheel', 'touchmove', 'keydown'].forEach((ev) =>
      window.addEventListener(ev, () => { clickedId = null; }, { passive: true })
    );
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // Prev/next navigace
  const pnContainer = document.getElementById('pn');
  if (pnContainer) {
    const previous = chapters[currentIndex - 1];
    const next = chapters[currentIndex + 1];
    pnContainer.innerHTML = `<nav class="pn" aria-label="Navigace mezi díly">
      ${previous ? `<a href="${previous.file}" class="pn-prev">← ${previous.num} · ${previous.name}</a>` : '<span></span>'}
      ${next ? `<a href="${next.file}" class="pn-next">${next.num} · ${next.name} →</a>` : '<span></span>'}
    </nav>`;
  }
});
