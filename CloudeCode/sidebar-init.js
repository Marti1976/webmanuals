// Vkládá sidebar, navigaci mezi kapitolami a podporu lokálních podsekci.
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
