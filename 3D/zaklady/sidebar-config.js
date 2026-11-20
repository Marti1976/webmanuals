// Jediný zdroj pravdy pro navigaci webu „Průvodce 3D tiskem" (Anycubic Kobra X).
// Jen data, žádná logika. Pořadí v poli `chapters` = pořadí v sidebaru i pořadí pro předchozí/další.
// `num` musí přesně (jako string) odpovídat atributu data-page v <body> dané stránky.

const sidebarBrand = {
  badge: '3D',
  model: 'ANYCUBIC KOBRA X',
  sub: 'Průvodce 3D tiskem · CZ'
};

const sidebarUi = {
  homeLabel: '← Zpět na obsah',            // na všech stránkách kromě indexu
  homeHref: '00_3D_index.html',
  indexLabel: '← Zpět na rozcestník',      // jen na stránce indexu (indexNum)
  indexHref: '../../index.html',
  indexNum: '00',
  searchPlaceholder: '🔍 Hledat...',
  searchTarget: '00_3D_index.html',        // stránka s hledáním; ostatní stránky na ni odešlou ?q=
  searchParam: 'q',
  widthDefault: 400,                       // výchozí šířka sidebaru v px (desktop); musí odpovídat --sidebar-width v style.css
  widthMin: 220,                           // nejmenší šířka při roztahování
  widthMax: 700                            // největší šířka (navíc nejvýš 60 % okna)
};

const chapters = [
  { num: '00',  name: 'Obsah & Hledání',     file: '00_3D_index.html', group: 'Základní sekce' },
  { num: '01',  name: 'Úvod do FDM tisku',   file: '01_3D_uvod.html' },
  { num: '02',  name: 'Tiskárna Kobra X',    file: '02_3D_tiskarna.html' },
  { num: '03',  name: 'Slicer — základy',    file: '03_3D_slicer_zaklad.html' },
  { num: '04',  name: 'Slicer — pokročilý',  file: '04_3D_slicer_pokrocily.html' },
  { num: '05a', name: 'Parametry tisku',     file: '05a_3D_slicer_tisk.html',     parent: { num: '05', name: 'Detailní parametry' } },
  { num: '05b', name: 'Parametry rychlosti', file: '05b_3D_slicer_rychlost.html', parent: { num: '05', name: 'Detailní parametry' } },
  { num: '05c', name: 'Parametry filamentu', file: '05c_3D_slicer_filament.html', parent: { num: '05', name: 'Detailní parametry' } },
  { num: '06',  name: 'Příprava & tisk',     file: '06_3D_priprava_a_tisk.html' },
  { num: '07',  name: 'Post-processing',     file: '07_3D_post_processing.html' },
  { num: '08a', name: 'Vše o Filamentech',   file: '08a_3D_filamenty.html',            parent: { num: '08', name: 'Filamenty' } },
  { num: '08b', name: 'Kalibrace filamentu', file: '08b_3D_kalibrace_filamentu.html',  parent: { num: '08', name: 'Filamenty' } },
  { num: '08c', name: 'Filamenty rozšíření', file: '08c_3D_Filament_next.html',        parent: { num: '08', name: 'Filamenty' } },
  { num: '09',  name: '3D Modely & CAD',     file: '09_3D_modely_cad.html' },
  { num: '10',  name: 'Prostředí & upgrady', file: '10_3D_prostredi_upgrady.html' },
  { num: '11',  name: 'Údržba & spotřební materiál', file: '11_3D_udrzba.html' },
  { num: '12',  name: 'Tipy & triky',        file: '12_3D_tipy.html' },
  { num: '13',  name: 'Troubleshooting',     file: '13_3D_troubleshooting.html' }
];

// Odkazy pod seznamem kapitol. Vždy vedou zpět na index (sekce s přílohami / odkazy).
const sidebarExtras = [
  { group: 'Ostatní přílohy', badge: 'Soubory', name: 'Výběr příloh', href: '00_3D_index.html#ostatni_prilohy' },
  { group: 'Oblíbené odkazy', badge: 'WEB',     name: 'Výběr odkazů', href: '00_3D_index.html#oblibene_odkazy' }
];
