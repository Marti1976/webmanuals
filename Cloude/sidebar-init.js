// ============================================================
// SIDEBAR INIT — generátor společných prvků webu
// Čte sidebar-config.js (chapters, site) a generuje:
//   #sidebar       – sidebar (kapitoly, pod díly a/b/c, lokální sekce)
//   #page-header   – hlavička stránky (DÍL xx + h1)
//   #site-footer   – patička
//   #index-grid    – karty dílů na indexu (samostatné karty a skupiny s pod díly)
//   #resources     – odkazy & zdroje na konci indexu (site.resources)
//   #hero-meta     – řádek pod úvodem na indexu
//   #index-content, #search-results – obal obsahu indexu a výsledky hledání (jen index)
//   #pn            – předchozí / další
//   #parts-box     – rámeček "Chceš víc?" (pod díly a, b, c)
// Navíc: značka Základ/Podrobně v hlavičce, tlačítko Kopírovat u .prompt
// Každý kontejner je volitelný: když v HTML chybí, daná část se přeskočí.
// Lokální sekce stránky: <script type="application/json" id="page-chapters">
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  // ----- Progress bar (vytvoří se automaticky) -----
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.prepend(progressBar);
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const h = doc.scrollHeight - doc.clientHeight;
    progressBar.style.width = (h > 0 ? (doc.scrollTop / h) * 100 : 0) + '%';
  }, { passive: true });

  // ----- Plochý seznam stránek: kapitola, její pod díly a, b, c, další kapitola... -----
  const pages = [];
  chapters.forEach((ch) => {
    pages.push({
      num: ch.num, label: ch.label || `DÍL ${ch.num}`, name: ch.name,
      title: ch.title || ch.name, file: ch.file, chapter: ch, part: null
    });
    (ch.parts || []).forEach((p) => {
      pages.push({
        num: ch.num + p.letter, label: `DÍL ${ch.num}${p.letter}`, name: p.name,
        title: p.title || p.name, file: p.file, chapter: ch, part: p, desc: p.desc || ''
      });
    });
  });

  const currentPage = document.body.dataset.page;
  const currentIndex = pages.findIndex((p) => p.num === currentPage);
  if (currentIndex === -1) return;
  const current = pages[currentIndex];
  const activeChapter = current.chapter;
  // Kapitola s pod díly (nebo pod díl) = rozlišujeme Základ / Podrobně
  const hasFamily = !!current.part || !!(activeChapter.parts && activeChapter.parts.length);

  // ----- <title> -----
  document.title = `${site.shortTitle} · ${current.title}`;

  // ----- Lokální sekce stránky (z JSON v HTML) -----
  // Číslo se doplní automaticky: kapitola 06 → 6.1, 6.2; pod díl 06a → 6a.1, 6a.2
  let local = [];
  const jsonEl = document.getElementById('page-chapters');
  if (jsonEl) {
    try {
      const raw = JSON.parse(jsonEl.textContent).chapters || [];
      const base = String(parseInt(activeChapter.num, 10)) + (current.part ? current.part.letter : '');
      local = raw.map((s, i) => ({ id: s.id, name: s.name, num: s.num || `${base}.${i + 1}` }));
    } catch (e) {
      console.warn('page-chapters: neplatný JSON', e);
    }
  }

  // ----- SIDEBAR -----
  const sidebarContainer = document.getElementById('sidebar');
  if (sidebarContainer) {
    const localHtml = (extraClass) => (local.length
      ? `<ul class="sb-subchapters${extraClass}">${local.map((s) =>
          `<li><a href="#${esc(s.id)}" class="sb-subchapter">${esc(s.num)} · ${esc(s.name)}</a></li>`).join('')}</ul>`
      : '');

    // Plochý seznam všech souborů: 00, 01, ..., 04, 04a, 04b, 04c, 05, ...
    // Odsazení pod položkou je vyhrazené jen pro sekce otevřené stránky (page-chapters).
    const items = pages.map((p) => {
      const isCurrent = p.num === current.num;
      return `<li><a class="sb-link${p.part ? ' is-part' : ''}${isCurrent ? ' active' : ''}" href="${esc(p.file)}"${isCurrent ? ' aria-current="page"' : ''}>${esc(p.num)} · ${esc(p.name)}</a>${isCurrent ? localHtml('') : ''}</li>`;
    }).join('');

    // Horní blok: odkaz Zpět, pole Hledej, seznam dílů
    const isIndex = current.num === chapters[0].num;
    const backHtml = isIndex
      ? `<a href="${esc(site.portalUrl)}" class="sb-home">${esc(site.portalLabel)}</a>`
      : `<a href="${esc(chapters[0].file)}" class="sb-home">${esc(site.backLabel)}</a>`;
    const searchHtml = `<div class="sb-search"><input id="sb-search-input" type="search" placeholder="${esc(site.searchPlaceholder)}" aria-label="${esc(site.searchPlaceholder)}" autocomplete="off"></div>`;

    sidebarContainer.innerHTML = `<nav class="sidebar" aria-label="Navigace">
      ${backHtml}${searchHtml}
      <ul class="sb-chapters">${items}</ul>
    </nav>`;

    const sidebar = sidebarContainer.querySelector('.sidebar');

    // Hamburger (mobil)
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
    sidebar.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeSidebar));
    document.body.append(hamburger, backdrop);

    // ----- ROZTAŽENÍ SIDEBARU (jen desktop od 900 px) -----
    // Čtenář táhne za pravý okraj, šířka se pamatuje v prohlížeči. Dvojklik = výchozí šířka.
    // Výchozí šířka je v style.css (--sidebar-w), tady se jen přepisuje.
    const SB_KEY = 'clde-sidebar-w';
    const SB_MIN = 220;
    const root = document.documentElement;
    const sbMax = () => Math.max(SB_MIN, Math.min(520, window.innerWidth - 480));
    const clampW = (w) => Math.min(sbMax(), Math.max(SB_MIN, w));
    const readW = () => { try { const v = parseInt(localStorage.getItem(SB_KEY), 10); return Number.isFinite(v) ? v : null; } catch (e) { return null; } };
    const storeW = (w) => { try { if (w === null) localStorage.removeItem(SB_KEY); else localStorage.setItem(SB_KEY, String(Math.round(w))); } catch (e) { /* bez ukládání */ } };
    let sbWidth = readW();
    const applyW = () => {
      if (window.innerWidth < 900 || sbWidth === null) root.style.removeProperty('--sidebar-w');
      else root.style.setProperty('--sidebar-w', clampW(sbWidth) + 'px');
    };
    applyW();
    window.addEventListener('resize', applyW);

    const resizer = document.createElement('div');
    resizer.className = 'sb-resizer';
    resizer.setAttribute('role', 'separator');
    resizer.setAttribute('aria-orientation', 'vertical');
    resizer.setAttribute('aria-label', 'Změnit šířku menu');
    resizer.title = 'Tažením změníš šířku menu, dvojklik vrátí výchozí';
    resizer.tabIndex = 0;
    document.body.append(resizer);

    resizer.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      resizer.setPointerCapture(e.pointerId);
      document.body.classList.add('resizing');
    });
    resizer.addEventListener('pointermove', (e) => {
      if (!resizer.hasPointerCapture(e.pointerId)) return;
      sbWidth = clampW(e.clientX);
      applyW();
    });
    const endDrag = (e) => {
      if (resizer.hasPointerCapture(e.pointerId)) resizer.releasePointerCapture(e.pointerId);
      document.body.classList.remove('resizing');
      if (sbWidth !== null) storeW(sbWidth);
    };
    resizer.addEventListener('pointerup', endDrag);
    resizer.addEventListener('pointercancel', endDrag);
    resizer.addEventListener('dblclick', () => { sbWidth = null; applyW(); storeW(null); });
    resizer.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      sbWidth = clampW((sbWidth === null ? sidebar.getBoundingClientRect().width : sbWidth) + (e.key === 'ArrowRight' ? 16 : -16));
      applyW();
      storeW(sbWidth);
    });

    // ----- HLEDÁNÍ (data: search-data.js, jen na indexu) -----
    // Na indexu živě při psaní, na ostatních stránkách Enter přesměruje na index s ?q=
    const searchInput = document.getElementById('sb-search-input');
    const resultsEl = document.getElementById('search-results');
    const contentEl = document.getElementById('index-content');
    const onIndex = !!(resultsEl && contentEl && typeof SEARCH_INDEX !== 'undefined');
    // Bez ohledu na velikost písmen a diakritiku
    const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const renderResults = (raw) => {
      const shown = String(raw).trim();
      const q = norm(shown);
      if (q.length < 2) { resultsEl.innerHTML = ''; contentEl.hidden = false; return; }
      const found = SEARCH_INDEX.map((r) => {
        const t = norm(r.title);
        let score = 0;
        if (t.includes(q)) score += t.startsWith(q) ? 4 : 3;
        if (r.tags.some((x) => norm(x).includes(q))) score += 1;
        return { r, score, pg: pages.find((p) => p.num === r.page) };
      }).filter((x) => x.score > 0 && x.pg).sort((a, b) => b.score - a.score);

      const items = found.map(({ r, pg }) => {
        const hit = r.tags.filter((t) => norm(t).includes(q));
        const tags = hit.concat(r.tags.filter((t) => !hit.includes(t))).slice(0, 8);
        return `<a class="search-item" href="${esc(pg.file + (r.anchor || ''))}">
          <div class="si-label">${esc(pg.label)}${r.anchor ? ' · sekce' : ''}</div>
          <div class="si-title">${esc(r.title)}</div>
          <div class="si-tags">${tags.map((t) => `<span class="${hit.includes(t) ? 'hit' : ''}">#${esc(t)}</span>`).join('')}</div>
        </a>`;
      }).join('');

      contentEl.hidden = true;
      resultsEl.innerHTML = `<div class="section-header"><h2>Nalezeno</h2></div>
        <div class="search-head">${found.length ? 'Výsledků: <strong>' + found.length + '</strong>' : 'Nic nenalezeno'} pro „<strong>${esc(shown)}</strong>“</div>${items}`;
    };

    if (searchInput) {
      if (onIndex) {
        searchInput.addEventListener('input', () => renderResults(searchInput.value));
        const q0 = new URLSearchParams(location.search).get('q');
        if (q0) { searchInput.value = q0; renderResults(q0); }
      }
      searchInput.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const v = searchInput.value.trim();
        if (v.length < 2) return;
        if (onIndex) { renderResults(v); closeSidebar(); window.scrollTo(0, 0); }
        else location.href = chapters[0].file + '?q=' + encodeURIComponent(v);
      });
    }
  }

  // ----- HLAVIČKA STRÁNKY -----
  const headerEl = document.getElementById('page-header');
  if (headerEl) {
    const parentLink = current.part
      ? `<a class="page-parent" href="${esc(activeChapter.file)}">← ${esc(activeChapter.num)} · ${esc(activeChapter.name)}</a>`
      : '';
    const level = hasFamily
      ? (current.part ? '<span class="level detail">Podrobně</span>' : '<span class="level basic">Základ</span>')
      : '';
    headerEl.innerHTML = `<div class="page-header">${parentLink}<div class="page-num">${esc(current.label)}${level}</div><h1>${esc(current.title)}</h1></div>`;
  }

  // ----- PATIČKA -----
  const footerEl = document.getElementById('site-footer');
  if (footerEl) {
    const links = (site.footerLinks || [])
      .map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.text)}</a>`).join(' · ');
    footerEl.innerHTML = `<footer><p>${esc(site.footerText)}${links ? ' · ' + links : ''}</p><p>${esc(site.version)}</p></footer>`;
  }

  // ----- INDEX: karty kapitol + hero meta -----
  const gridEl = document.getElementById('index-grid');
  if (gridEl) {
    // Díl bez pod dílů = samostatná karta. Díl s pod díly = skupina:
    // hlavička přes celou šířku (poloviční výška) a pod ní rámeček s pod díly a, b, c.
    gridEl.innerHTML = chapters.filter((ch) => ch.num !== '00').map((ch) => {
      const label = ch.label || `DÍL ${ch.num}`;
      if (!(ch.parts && ch.parts.length)) {
        const tags = (ch.tags || []).length
          ? `<div class="card-tags">${ch.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : '';
        return `<a href="${esc(ch.file)}" class="card${ch.highlight ? ' hl' : ''}">
          <div class="card-num">${esc(label)}</div>
          <h3>${esc(ch.title || ch.name)}</h3>
          ${ch.desc ? `<p>${esc(ch.desc)}</p>` : ''}${tags}
          <div class="arrow">→</div>
        </a>`;
      }
      const parts = ch.parts.map((p) => `<a href="${esc(p.file)}" class="card">
          <div class="card-num">DÍL ${esc(ch.num + p.letter)}</div>
          <h3>${esc(p.title || p.name)}</h3>
          ${p.desc ? `<p>${esc(p.desc)}</p>` : ''}
          <div class="arrow">→</div>
        </a>`).join('');
      return `<div class="group">
        <a href="${esc(ch.file)}" class="group-head">
          <span class="card-num">${esc(label)}</span>
          <h3>${esc(ch.title || ch.name)}</h3>
          <span class="level basic">Základ</span>
          ${ch.desc ? `<p>${esc(ch.desc)}</p>` : ''}
        </a>
        <div class="group-frame">${parts}</div>
      </div>`;
    }).join('');
  }

  // ----- INDEX: odkazy & zdroje na konci (#resources, data v site.resources) -----
  const resEl = document.getElementById('resources');
  if (resEl && site.resources) {
    const ext = (h) => (/^https?:/.test(h) ? ' target="_blank" rel="noopener"' : '');
    resEl.innerHTML = `<div class="resources"><div class="resources-title">${esc(site.resourcesTitle || 'Odkazy & zdroje')}</div><div class="resources-grid">${site.resources.map((g) =>
      `<div><h3>${esc(g.title)}</h3><ul>${g.items.map((i) =>
        `<li><a href="${esc(i.href)}"${ext(i.href)}>${esc(i.text)}</a>${i.note ? `<span class="note">${esc(i.note)}</span>` : ''}</li>`).join('')}</ul></div>`).join('')}</div></div>`;
  }

  const metaEl = document.getElementById('hero-meta');
  if (metaEl && site.heroMeta) {
    const count = chapters.filter((ch) => ch.num !== '00').length;
    metaEl.innerHTML = site.heroMeta.map((t) => `<span>${esc(t.replace('{count}', count))}</span>`).join('');
  }

  // ----- RÁMEČEK "CHCEŠ VÍC?" / další díly (kontejner #parts-box) -----
  const boxEl = document.getElementById('parts-box');
  if (boxEl && hasFamily) {
    const others = pages.filter((p) => p.chapter === activeChapter && p !== current);
    const title = current.part ? 'Další díly k tématu' : 'Chceš víc? Podrobně a s příklady';
    boxEl.innerHTML = `<div class="more-box"><div class="more-title">${esc(title)}</div><ul>${others.map((p) =>
      `<li><a href="${esc(p.file)}"><span class="more-num">${esc(p.num)}</span><span class="more-text"><span class="more-name">${esc(p.name)}</span>${p.desc ? `<span class="more-desc">${esc(p.desc)}</span>` : ''}</span><span class="more-arrow">→</span></a></li>`
    ).join('')}</ul></div>`;
  }

  // ----- TLAČÍTKO KOPÍROVAT u .prompt a .cb.copyable -----
  const copyText = async (text) => {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* záloha níže */ }
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  };

  document.querySelectorAll('.prompt, .cb.copyable').forEach((boxItem) => {
    const pre = boxItem.querySelector('pre');
    if (!pre) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.textContent = 'Kopírovat';
    btn.addEventListener('click', async () => {
      const ok = await copyText(pre.innerText.trim());
      btn.textContent = ok ? 'Zkopírováno ✓' : 'Nelze zkopírovat';
      btn.classList.toggle('done', ok);
      setTimeout(() => { btn.textContent = 'Kopírovat'; btn.classList.remove('done'); }, 1800);
    });
    if (boxItem.classList.contains('prompt')) {
      const head = document.createElement('div');
      head.className = 'prompt-head';
      const label = document.createElement('span');
      label.className = 'prompt-label';
      label.textContent = boxItem.dataset.label || 'Prompt';
      head.append(label, btn);
      boxItem.prepend(head);
    } else {
      (boxItem.querySelector('.cb-label') || boxItem).append(btn);
    }
  });

  // ----- Čísla před nadpisy h2 (stejná jako v sidebaru) -----
  local.forEach((s) => {
    const h = document.getElementById(s.id);
    if (h && !h.querySelector('.h2-num')) {
      h.insertAdjacentHTML('afterbegin', `<span class="h2-num">${esc(s.num)}</span>`);
    }
  });

  // ----- Zvýraznění aktuální sekce při scrollu -----
  if (local.length) {
    const subLinks = document.querySelectorAll('.sb-subchapter');
    const sidebarEl = document.querySelector('.sidebar');
    const targets = local.map((s) => document.getElementById(s.id)).filter(Boolean);
    let currentId = null;

    const setActive = (id) => {
      if (id === currentId) return;
      currentId = id;
      subLinks.forEach((link) => {
        const on = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', on);
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
      let cur = targets[0];
      const line = window.innerHeight * 0.3;
      targets.forEach((t) => { if (t.getBoundingClientRect().top <= line) cur = t; });
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight > window.innerHeight + 4;
      if (scrollable && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        cur = targets[targets.length - 1];
      }
      setActive(cur.id);
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // ----- PREV / NEXT (pořadí: 06 → 06a → 06b → 07) -----
  const pnEl = document.getElementById('pn');
  if (pnEl) {
    const prev = pages[currentIndex - 1];
    const next = pages[currentIndex + 1];
    pnEl.innerHTML = `<div class="pn">
      ${prev ? `<a href="${esc(prev.file)}">← ${esc(prev.num)} · ${esc(prev.name)}</a>` : '<span></span>'}
      ${next ? `<a href="${esc(next.file)}" class="nx">${esc(next.num)} · ${esc(next.name)} →</a>` : '<span></span>'}
    </div>`;
  }
});
