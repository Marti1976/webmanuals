// SIDEBAR INIT — generátor sidebaru
// Automaticky vloží sidebar a prev/next navigaci

document.addEventListener('DOMContentLoaded', function() {
  const currentPage = document.body.getAttribute('data-page');
  const currentIndex = chapters.findIndex(ch => ch.num === currentPage);
  
  if (currentIndex === -1) return; // Jestli není nalezena stránka, nic nedělej

  // ===== SIDEBAR =====
  const sidebarContainer = document.getElementById('sidebar');
  if (!sidebarContainer) return;

  let sidebarHTML = '<nav class="sidebar"><a href="00_CLDE_index.html" class="sb-home">← Zpět na obsah</a><ul class="sb-chapters">';
  
  chapters.forEach(ch => {
    const isActive = ch.num === currentPage;
    const activeClass = isActive ? ' active' : '';
    sidebarHTML += `<li><a href="${ch.file}" class="sb-link${activeClass}">${ch.num.padStart(2, '0')} · ${ch.name}</a></li>`;
  });

  sidebarHTML += '</ul></nav>';
  sidebarContainer.innerHTML = sidebarHTML;

  // ===== HAMBURGER MENU NA MOBILU =====
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '☰';
  hamburger.setAttribute('aria-label', 'Otevřít menu');
  
  const backdrop = document.createElement('div');
  backdrop.className = 'sidebar-backdrop';

  function toggleSidebar() {
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('visible');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleSidebar);
  backdrop.addEventListener('click', toggleSidebar);

  // Zavři sidebar při kliku na link
  document.querySelectorAll('.sb-link').forEach(link => {
    link.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        backdrop.classList.remove('visible');
        document.body.style.overflow = '';
      }
    });
  });

  document.body.appendChild(hamburger);
  document.body.appendChild(backdrop);

  // ===== PREV/NEXT NAVIGACE =====
  const pnContainer = document.getElementById('pn');
  if (pnContainer) {
    let pnHTML = '<div class="pn">';
    
    // Předchozí
    if (currentIndex > 0) {
      const prev = chapters[currentIndex - 1];
      pnHTML += `<a href="${prev.file}">← ${prev.num.padStart(2, '0')} · ${prev.name}</a>`;
    } else {
      pnHTML += '<span></span>';
    }

    // Další
    if (currentIndex < chapters.length - 1) {
      const next = chapters[currentIndex + 1];
      pnHTML += `<a href="${next.file}" class="nx">${next.num.padStart(2, '0')} · ${next.name} →</a>`;
    } else {
      pnHTML += '<span></span>';
    }

    pnHTML += '</div>';
    pnContainer.innerHTML = pnHTML;
  }
});
