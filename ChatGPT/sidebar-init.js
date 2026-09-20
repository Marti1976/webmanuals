// Vkládá společný sidebar, legendy tarifů a navigaci mezi kapitolami.
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = document.body.dataset.page;
  const currentIndex = chapters.findIndex((chapter) => chapter.num === currentPage);
  if (currentIndex === -1) return;

  const renderLegend = () => `
    <div class="plan-legend" aria-label="Legenda dostupnosti funkcí">
      <span class="plan-free">FREE</span>
      <span class="plan-go">GO</span>
      <span class="plan-plus">PLUS</span>
      <span class="callout-tip">TIP</span>
      <span class="callout-important">DŮLEŽITÉ</span>
    </div>`;

  const sidebarContainer = document.getElementById('sidebar');
  if (sidebarContainer) {
    const links = chapters.map((chapter) => {
      const active = chapter.num === currentPage ? ' active' : '';
      return `<li><a class="sb-link${active}" href="${chapter.file}"${chapter.num === currentPage ? ' aria-current="page"' : ''}><span>${chapter.num}</span>${chapter.name}</a></li>`;
    }).join('');

    sidebarContainer.innerHTML = `<nav class="sidebar" aria-label="Kapitoly průvodce">
      <a href="${chapters[0].file}" class="sb-home">ChatGPT průvodce</a>
      <p class="sb-caption">Kapitoly</p>
      <ul class="sb-chapters">${links}</ul>
      <p class="sb-footer">Free · Go · Plus<br>Průvodce pro začátečníky</p>
    </nav>`;

    const sidebar = sidebarContainer.querySelector('.sidebar');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.type = 'button';
    hamburger.setAttribute('aria-label', 'Otevřít menu kapitol');
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
    document.body.append(hamburger, backdrop);
  }

  document.querySelectorAll('[data-plan-legend]').forEach((container) => {
    container.innerHTML = renderLegend();
  });

  const pnContainer = document.getElementById('pn');
  if (pnContainer) {
    const previous = chapters[currentIndex - 1];
    const next = chapters[currentIndex + 1];
    pnContainer.innerHTML = `<nav class="pn" aria-label="Navigace mezi kapitolami">
      ${previous ? `<a href="${previous.file}" class="pn-prev">← <span>${previous.num} · ${previous.name}</span></a>` : '<span></span>'}
      ${next ? `<a href="${next.file}" class="pn-next"><span>${next.num} · ${next.name}</span> →</a>` : '<span></span>'}
    </nav>`;
  }
});
