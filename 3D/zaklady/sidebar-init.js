// Generuje sidebar (značka, tlačítko zpět, hledání, kapitoly, lokální podsekce, hamburger)
// a navigaci předchozí/další. Žádná data ani názvy souborů zde nejsou — vše je v sidebar-config.js.
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = document.body.dataset.page;
  const currentIndex = chapters.findIndex((chapter) => chapter.num === currentPage);
  if (currentIndex === -1) return; // neznámá stránka = nic se nedělá

  const esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const isIndex = currentPage === sidebarUi.indexNum;
  const current = chapters[currentIndex];

  // Lokální podsekce stránky (JSON v <script id="page-chapters">); bez JSON = bez podsekcí
  let pageChapters = null;
  const pageChaptersScript = document.getElementById('page-chapters');
  if (pageChaptersScript) {
    try { pageChapters = JSON.parse(pageChaptersScript.textContent).chapters; } catch (e) { pageChapters = null; }
  }
  // Číslo podsekce před nadpisem sekce (z JSON `page-chapters`; sekce se hledá podle id)
  if (pageChapters) pageChapters.forEach((s) => {
    const heading = document.getElementById(s.id) && document.getElementById(s.id).querySelector('h2');
    if (heading && !heading.querySelector('.sec-num')) {
      const num = document.createElement('span');
      num.className = 'sec-num';
      num.textContent = s.num;
      heading.prepend(num);
    }
  });
  const subchaptersHtml = () => (pageChapters && pageChapters.length)
    ? `<ul class="sb-subchapters">${pageChapters.map((s) =>
        `<li><a href="#${esc(s.id)}" class="sb-subchapter">${esc(s.num)} · ${esc(s.name)}</a></li>`).join('')}</ul>`
    : '';

  const sidebarContainer = document.getElementById('sidebar');
  if (sidebarContainer) {
    // Seznam kapitol: skupiny (group), rodiče (parent) a lokální podsekce u aktivní kapitoly
    let list = '';
    let openParent = null;
    const closeParent = () => { if (openParent) { list += '</ul></li>'; openParent = null; } };

    chapters.forEach((chapter) => {
      const active = chapter.num === currentPage;
      const aria = active ? ' aria-current="page"' : '';
      const parentNum = chapter.parent ? chapter.parent.num : null;
      if (parentNum !== openParent) closeParent();
      if (chapter.group) list += `<li class="sb-group-label">${esc(chapter.group)}</li>`;

      if (chapter.parent) {
        if (openParent === null) {
          list += `<li><div class="sb-link sb-parent"><span class="sb-num">${esc(chapter.parent.num)}</span>` +
                  `<span class="sb-text">${esc(chapter.parent.name)}</span></div><ul class="sb-sub">`;
          openParent = parentNum;
        }
        list += `<li><a href="${esc(chapter.file)}" class="sb-sublink${active ? ' active' : ''}"${aria}>` +
                `${esc(chapter.num)} · ${esc(chapter.name)}</a>${active ? subchaptersHtml() : ''}</li>`;
      } else {
        list += `<li><a href="${esc(chapter.file)}" class="sb-link${active ? ' active' : ''}"${aria}>` +
                `<span class="sb-num">${esc(chapter.num)}</span><span class="sb-text">${esc(chapter.name)}</span></a>` +
                `${active ? subchaptersHtml() : ''}</li>`;
      }
    });
    closeParent();

    sidebarExtras.forEach((extra) => {
      list += `<li class="sb-group-label">${esc(extra.group)}</li>` +
              `<li><a href="${esc(extra.href)}" class="sb-link"><span class="sb-num sb-num-accent">${esc(extra.badge)}</span>` +
              `<span class="sb-text">${esc(extra.name)}</span></a></li>`;
    });

    const homeHref = isIndex ? sidebarUi.indexHref : sidebarUi.homeHref;
    const homeLabel = isIndex ? sidebarUi.indexLabel : sidebarUi.homeLabel;

    sidebarContainer.innerHTML = `<nav class="sidebar" aria-label="Navigace">
      <div class="sb-brand"><div class="sb-product">
        <span class="sb-badge">${esc(sidebarBrand.badge)}</span>
        <div class="sb-model">${esc(sidebarBrand.model)}<small>${esc(sidebarBrand.sub)}</small></div>
      </div></div>
      <a href="${esc(homeHref)}" class="sb-home">${esc(homeLabel)}</a>
      <div class="sb-search"><input type="text" id="sb-search-input" placeholder="${esc(sidebarUi.searchPlaceholder)}" autocomplete="off"></div>
      <ul class="sb-chapters">${list}</ul>
      <div class="sb-spacer"></div>
    </nav>`;

    const sidebar = sidebarContainer.querySelector('.sidebar');

    // Hledání: mimo stránku s hledáním Enter odešle dotaz na stránku s hledáním (živé hledání řeší ta stránka)
    const searchInput = sidebar.querySelector('#sb-search-input');
    searchInput.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const q = searchInput.value.trim();
      if (!q || current.file === sidebarUi.searchTarget) return;
      window.location.href = `${sidebarUi.searchTarget}?${sidebarUi.searchParam}=${encodeURIComponent(q)}`;
    });

    // Hamburger a backdrop (mobil) se vytvářejí dynamicky
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
    sidebar.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeSidebar));
    // Roztažení sidebaru (desktop): tažení myší za pravý okraj, šipky ← →, dvojklik = výchozí šířka.
    // Zvolená šířka se pamatuje v prohlížeči (localStorage; bez něj se použije výchozí).
    const resizer = document.createElement('div');
    resizer.className = 'sb-resizer';
    resizer.setAttribute('role', 'separator');
    resizer.setAttribute('aria-orientation', 'vertical');
    resizer.setAttribute('aria-label', 'Změnit šířku menu');
    resizer.setAttribute('title', 'Tažením změníte šířku menu, dvojklik = výchozí šířka');
    resizer.tabIndex = 0;

    const clampWidth = (w) => Math.round(Math.min(
      Math.max(w, sidebarUi.widthMin), Math.min(sidebarUi.widthMax, window.innerWidth * 0.6)));
    let width = sidebarUi.widthDefault;
    try {
      const saved = parseInt(localStorage.getItem('sidebarWidth'), 10);
      if (saved) width = saved;
    } catch (e) { /* bez uložení */ }

    const applyWidth = (w, save) => {
      width = clampWidth(w);
      document.documentElement.style.setProperty('--sidebar-width', width + 'px');
      resizer.setAttribute('aria-valuenow', String(width));
      if (save) { try { localStorage.setItem('sidebarWidth', String(width)); } catch (e) { /* bez uložení */ } }
    };
    const onMove = (e) => applyWidth(e.clientX, false);
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);
      document.body.classList.remove('sb-resizing');
      applyWidth(width, true);
    };
    resizer.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      document.body.classList.add('sb-resizing');
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      document.addEventListener('pointercancel', onUp);
    });
    resizer.addEventListener('dblclick', () => {
      applyWidth(sidebarUi.widthDefault, false);
      try { localStorage.removeItem('sidebarWidth'); } catch (e) { /* bez uložení */ }
    });
    resizer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        applyWidth(width + (e.key === 'ArrowRight' ? 20 : -20), true);
      }
    });
    window.addEventListener('resize', () => applyWidth(width, false));
    applyWidth(width, false);

    document.body.append(hamburger, backdrop, resizer);

    // Doscrolluj sidebar k aktivní položce, jen pokud je mimo viditelnou část
    const activeItem = sidebar.querySelector('.sb-link.active, .sb-sublink.active');
    if (activeItem && activeItem.offsetTop + activeItem.offsetHeight > sidebar.clientHeight - 40) {
      sidebar.scrollTop = Math.max(0, activeItem.offsetTop - 140);
    }
  }

  // Předchozí / další (index stránku nemá; za poslední kapitolou následuje první)
  const pnContainer = document.getElementById('pn');
  if (pnContainer && !isIndex) {
    const previous = chapters[currentIndex - 1];
    const next = chapters[currentIndex + 1] || chapters[0];
    pnContainer.innerHTML = `<nav class="pn" aria-label="Navigace mezi díly">` +
      (previous ? `<a href="${esc(previous.file)}">← ${esc(previous.num)} · ${esc(previous.name)}</a>` : '<span></span>') +
      (next ? `<a href="${esc(next.file)}" class="nx">${esc(next.num)} · ${esc(next.name)} →</a>` : '<span></span>') +
      `</nav>`;
  }

  // Zvýraznění aktuální podsekce v sidebaru podle posunu stránky
  const subLinks = Array.from(document.querySelectorAll('.sb-subchapter'));
  if (subLinks.length) {
    const spy = () => {
      let current = null;
      subLinks.forEach((link) => {
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (target && target.getBoundingClientRect().top <= 120) current = link;
      });
      // Na konci stránky zvýraznit poslední podsekci (krátká poslední kapitola nedojede k hornímu okraji)
      const doc = document.documentElement;
      if (doc.scrollHeight > window.innerHeight + 2 && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        current = subLinks[subLinks.length - 1];
      }
      subLinks.forEach((link) => link.classList.toggle('active', link === current));
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();
  }
});

// ── Tlačítko Kopírovat u bloků .code-copy (přidáno 2026-11-19, 08b) ──
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.code-copy-btn');
  if (!btn) return;
  const pre = btn.parentElement.querySelector('pre');
  if (!pre) return;
  const text = pre.innerText.replace(/\n+$/, '');
  const done = () => {
    if (!btn.dataset.label) btn.dataset.label = btn.textContent;
    btn.textContent = 'Zkopírováno ✓';
    btn.classList.add('is-copied');
    setTimeout(() => { btn.textContent = btn.dataset.label; btn.classList.remove('is-copied'); }, 1500);
  };
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { if (document.execCommand('copy')) done(); } catch (err) { /* nic */ }
    ta.remove();
  };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
  else fallback();
});
