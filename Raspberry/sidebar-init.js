// Vkládá sidebar, navigaci mezi kapitolami a podporu lokálních podsekcí.
document.addEventListener('DOMContentLoaded', () => {
  // Progress bar (pokud ho stránka má)
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const t = document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      progressBar.style.width = (t / h * 100) + '%';
    });
  }

  const currentPage = document.body.dataset.page;
  const currentIndex = chapters.findIndex((chapter) => chapter.num === currentPage);
  if (currentIndex === -1) return;

  // Lokální kapitoly z JSON (pokud existují)
  const pageChaptersScript = document.getElementById('page-chapters');
  const pageChapters = pageChaptersScript ? JSON.parse(pageChaptersScript.textContent).chapters : null;

  const sidebarContainer = document.getElementById('sidebar');
  if (sidebarContainer) {
    // Seznam kapitol, pod aktivní se rozbalí lokální podsekce
    const links = chapters.map((chapter) => {
      const active = chapter.num === currentPage ? ' active' : '';
      const hasSubchapters = active && pageChapters;

      let html = `<li>
        <a class="sb-link${active}" href="${chapter.file}"${active ? ' aria-current="page"' : ''}>
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
      <a href="${chapters[0].file}" class="sb-home">← Zpět na index</a>
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

    // Zavřít sidebar při kliknutí na kterýkoli odkaz
    sidebar.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeSidebar);
    });

    document.body.append(hamburger, backdrop);
  }

  // Čísla podsekcí před nadpisy <h2> (stejná čísla jako v sidebaru)
  if (pageChapters) {
    pageChapters.forEach((subch) => {
      const heading = document.getElementById(subch.id);
      if (heading && !heading.querySelector('.h2-num')) {
        heading.insertAdjacentHTML('afterbegin', `<span class="h2-num">${subch.num}</span>`);
      }
    });
  }

  // Zvýraznění aktuální podsekce při scrollu (na konci stránky vždy poslední)
  if (pageChapters && pageChapters.length) {
    const subLinks = document.querySelectorAll('.sb-subchapter');
    const sidebarEl = document.querySelector('.sidebar');
    const targets = pageChapters.map((s) => document.getElementById(s.id)).filter(Boolean);
    let currentId = null;

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
      let current = targets[0];
      const line = window.innerHeight * 0.3;
      targets.forEach((t) => {
        if (t.getBoundingClientRect().top <= line) current = t;
      });
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight > window.innerHeight + 4;
      if (scrollable && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        current = targets[targets.length - 1];
      }
      setActive(current.id);
    };

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
