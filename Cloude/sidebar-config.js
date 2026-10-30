// ============================================================
// SIDEBAR CONFIG — JEDINÉ MÍSTO PRAVDY
// Tady a jen tady se mění: pořadí a názvy kapitol, pod díly (a, b, c),
// popisy a tagy na indexu a společné texty webu (patička, verze...).
// Cokoliv z toho se v HTML souborech NIKDY nepíše natvrdo.
// Technické zadání: Technický_prompt.md
// ============================================================

// ---------- SPOLEČNÉ TEXTY WEBU ----------
const site = {
  shortTitle: 'CLDE',                       // předpona <title>: "CLDE · Název"
  backLabel: '← Zpět na obsah',             // odkaz Zpět na všech stránkách kromě indexu (vede na index)
  portalLabel: '← Zpět na rozcestník',      // odkaz Zpět na indexu
  portalUrl: '../index.html',               // cíl odkazu na indexu: rozcestník webu o úroveň výš
  searchPlaceholder: 'Hledej…',             // text v poli hledání v sidebaru
  footerText: 'CLDE průvodce v češtině',
  footerLinks: [
    { text: 'claude.com ↗', href: 'https://claude.com' },
    { text: 'dokumentace ↗', href: 'https://docs.anthropic.com' }
  ],
  version: 'verze 1.0 · únor 2026',
  // Řádek pod úvodem na indexu. {count} = počet dílů (bez indexu).
  heroMeta: ['{count} dílů', 'Česky'],
  // Odkazy na konci indexu (jen ověřené zdroje, CZ, EN, DE). Jediné místo pro tyto odkazy.
  resourcesTitle: 'Odkazy & zdroje',
  resources: [
    { title: 'Oficiální zdroje', items: [
      { text: 'claude.com', href: 'https://claude.com', note: 'webová aplikace' },
      { text: 'Nápověda (Help Center)', href: 'https://support.claude.com/', note: 'EN, DE' },
      { text: 'Release notes (novinky)', href: 'https://support.claude.com/en/articles/12138966-release-notes', note: 'EN' },
      { text: 'Jak získat podporu', href: 'https://support.claude.com/en/articles/9015913-how-to-get-support', note: 'EN' },
      { text: 'Stav služby (status)', href: 'https://status.claude.com', note: 'EN' },
      { text: 'Dokumentace API', href: 'https://docs.claude.com/en/docs/intro', note: 'EN' }
    ] },
    { title: 'Učení', items: [
      { text: 'Claude Academy', href: 'https://academy.claude.com/', note: 'kurzy a tutoriály, EN' }
    ] },
    { title: 'Claude Code', items: [
      { text: 'Dokumentace Claude Code', href: 'https://code.claude.com/docs', note: 'EN' },
      { text: 'Manuál Claude Code (vlastní)', href: '../CloudeCode/00_CLDECO_index.html', note: 'česky' },
      { text: 'Manuál Claude Code (veřejná verze)', href: 'https://marti1976.github.io/webmanuals/CloudeCode/00_CLDECO_index.html', note: 'česky' }
    ] }
  ]
};

// ---------- KAPITOLY ----------
// Povinná pole: num, name, file
// Volitelná pole:
//   label     – popisek (výchozí "DÍL <num>")
//   title     – plný nadpis h1 a karty na indexu (výchozí = name; name je krátký název pro sidebar a prev/next)
//   desc      – popis na kartě indexu
//   tags      – štítky na kartě indexu
//   highlight – zvýrazněná karta na indexu (true)
//   parts     – pod díly a, b, c... (viz níže)
//
// POD DÍLY (parts): hlavní díl + další samostatné HTML soubory s příklady a detailem.
// Příklad zápisu (skutečné pod díly jsou níže):
//   {
//     num: '10', name: 'Skills a Konektory', file: '10_CLDE_skills_konektory.html',
//     parts: [
//       { letter: 'a', name: 'Skills v praxi', file: '10a_CLDE_skills_v_praxi.html', title: 'Skills v praxi', desc: '...' },
//       { letter: 'b', name: 'Vlastní Skills', file: '10b_CLDE_vlastni_skills.html' }
//     ]
//   }
// Číslo pod dílu = num + letter (10a). Hodnota data-page v jeho HTML je "10a".
// Osnova 00–15 podle obsah.md.

const chapters = [
  {
    num: "00",
    name: "Index",
    file: "00_CLDE_index.html",
    label: "Obsah"
  },
  {
    num: "01",
    name: "Úvod",
    file: "01_CLDE_uvod.html",
    title: "Úvod: co je Claude a kde ho používat",
    desc: "Co je Claude, kde ho používat (web, desktop, mobil), mapa produktů a co kdy použít.",
    tags: ["Úvod", "Co je claude", "Produkty", "Přehled"]
  },
  {
    num: "02",
    name: "Plány a limity",
    file: "02_CLDE_plany_a_limity.html",
    title: "Plány, ceny a limity",
    desc: "Plány Free, Pro, Max, Team a Enterprise. Jak fungují limity použití, jak je sledovat a jak s nimi vydržet déle.",
    tags: ["Plány", "Ceny", "Limity", "Předplatné"]
  },
  {
    num: "03",
    name: "Instalace a nastavení",
    file: "03_CLDE_instalace.html",
    desc: "Web, desktopová aplikace (Windows, macOS) a mobil. Přihlášení, hlasový režim, jazyk, téma a profil.",
    tags: ["Instalace", "Nastavení", "Účet", "Windows"]
  },
  {
    num: "04",
    name: "Základy ovládání",
    file: "04_CLDE_zaklady.html",
    title: "Základy: konverzace a prompty",
    desc: "První konverzace, jak psát prompty, úpravy zpráv a práce s historií (hledání, archivace, export).",
    tags: ["Základy", "Konverzace", "Prompt", "Historie"],
    parts: [
      { letter: "a", name: "Modely a Effort", file: "04a_CLDE_modely_a_effort.html", title: "Výběr modelu, Effort a thinking", desc: "Nabídka modelů a nastavení Effort: co se při změně ovlivní, kolik to stojí z limitu a kdy co zvolit." },
      { letter: "b", name: "Základní příklady", file: "04b_CLDE_zakladni_priklady.html", title: "Základní příklady promptů", desc: "Jednoduché prompty a odpovědi na běžné věci, krok za krokem." },
      { letter: "c", name: "Každodenní použití", file: "04c_CLDE_vsedni_den.html", title: "Claude ve všedním dni", desc: "Jak Claude využít během běžného dne: plánování, nákupy, e-maily, rychlé dotazy." }
    ]
  },
  {
    num: "05",
    name: "Rozšíření promptů",
    file: "05_CLDE_rozsireni_promptu.html",
    title: "Rozšíření konverzací a promptů",
    desc: "Jak z Claude dostat víc: role, kontext, tón, formát, příklady v promptu a iterace.",
    tags: ["Role", "Kontext", "Tón", "Formát výstupu"],
    parts: [
      { letter: "a", name: "Psaní a komunikace", file: "05a_CLDE_psani_a_komunikace.html", desc: "E-maily, dopisy, překlady (CZ, EN, DE), korektury, stylizace textu, sociální sítě a životopis." },
      { letter: "b", name: "Dokumenty a analýza", file: "05b_CLDE_dokumenty_a_analyza.html", title: "Dokumenty, práce a analýza", desc: "Stylizované dokumenty, zprávy a nabídky, shrnutí, tabulky, plánování, rozhodování a studium." },
      { letter: "c", name: "Web a tvorba", file: "05c_CLDE_web_a_tvorba.html", title: "Web, tvorba a technické úlohy", desc: "Pomoc s webem (HTML, CSS, JS, struktura, texty), skripty, vzorce, tvůrčí psaní a brainstorming." }
    ]
  },
  {
    num: "06",
    name: "Projekty",
    file: "06_CLDE_projekty.html",
    title: "Projekty: základy",
    desc: "Co jsou projekty, kdy je použít místo konverzace, jak je vytvořit, nastavit instrukce a znalosti a sdílet.",
    tags: ["Projekty", "Instrukce projektu", "Znalosti", "Sdílení"],
    parts: [
      { letter: "a", name: "Příprava projektu", file: "06a_CLDE_priprava_projektu.html", title: "Projekty: příprava", desc: "Zadání cíle, výběr souborů, psaní instrukcí projektu a ukázky." },
      { letter: "b", name: "Rozšíření projektu", file: "06b_CLDE_rozsireni_projektu.html", title: "Projekty: rozšíření", desc: "Větší znalosti, údržba, týmové sdílení a oprávnění, kombinace s pamětí, Skills a konektory." },
      { letter: "c", name: "Projekty v praxi", file: "06c_CLDE_projekty_v_praxi.html", desc: "Hotové ukázkové projekty s instrukcemi a prompty." }
    ]
  },
  {
    num: "07",
    name: "Soubory a Artifacts",
    file: "07_CLDE_soubory_a_artifacts.html",
    title: "Soubory, obrázky a Artifacts",
    desc: "Nahrávání souborů a obrázků, vytváření souborů, Artifacts (tvorba, úpravy, publikace a sdílení).",
    tags: ["Soubory", "Obrázky", "Artifacts", "Nahrávání"]
  },
  {
    num: "08",
    name: "Vyhledávání a Research",
    file: "08_CLDE_vyhledavani_a_research.html",
    title: "Web search, Deep Research a extended thinking",
    desc: "Rozdíly mezi web search, Deep Research a extended thinking, kdy co použít a jak číst výsledky.",
    tags: ["Vyhledávání", "Deep research", "Web search", "Extended thinking"]
  },
  {
    num: "09",
    name: "Paměť a instrukce",
    file: "09_CLDE_pamet_a_instrukce.html",
    title: "Paměť, vlastní instrukce a styly",
    desc: "Memory (paměť), vlastní instrukce, styly a rozdíl oproti projektům.",
    tags: ["Paměť", "Vlastní instrukce", "Styly", "Preference"]
  },
  {
    num: "10",
    name: "Skills a Konektory",
    file: "10_CLDE_skills_konektory.html",
    title: "Skills, konektory a pluginy",
    desc: "Co jsou Skills, konektory a pluginy, jak se liší, jak je vybrat a zapnout.",
    tags: ["Skills", "Konektory", "Pluginy", "Integrace"],
    parts: [
      { letter: "a", name: "Skills v praxi", file: "10a_CLDE_skills_v_praxi.html", desc: "Použití vestavěných skills na konkrétních zadáních, s příklady promptů." },
      { letter: "b", name: "Vlastní Skills", file: "10b_CLDE_vlastni_skills.html", title: "Rozšíření skillů: vlastní Skills", desc: "Rozšíření skillů: vlastní skill, struktura, testování, správa a ukázky." },
      { letter: "c", name: "Konektory v praxi", file: "10c_CLDE_konektory_v_praxi.html", title: "Konektory a pluginy v praxi", desc: "Gmail, Drive, Calendar a další: připojení, oprávnění, pluginy a příklady promptů." }
    ]
  },
  {
    num: "11",
    name: "Cowork a agenti",
    file: "11_CLDE_cowork_agenty.html",
    title: "Cowork a agenti: automatizace",
    desc: "Co je Cowork a jak se liší od chatu, požadavky, první úkol a oprávnění.",
    tags: ["Cowork", "Agenti", "Automatizace", "Oprávnění"],
    parts: [
      { letter: "a", name: "Cowork v praxi", file: "11a_CLDE_cowork_v_praxi.html", desc: "Příklady úloh a jak je zadávat a kontrolovat." },
      { letter: "b", name: "Plánované úlohy", file: "11b_CLDE_planovane_ulohy.html", title: "Plánované a opakované úlohy", desc: "Plánované a opakované úlohy a zadávání z mobilu." },
      { letter: "c", name: "Složité scénáře", file: "11c_CLDE_slozite_scenare.html", desc: "Skills, konektory a Cowork dohromady od začátku do konce, ladění a řešení potíží." }
    ]
  },
  {
    num: "12",
    name: "Aplikace a 3D tisk",
    file: "12_CLDE_aplikace.html",
    title: "Claude v aplikacích a 3D tisk",
    desc: "Přehled všech aplikací a integrací (Chrome, Excel, PowerPoint, Word, Google Workspace, Slack, mobil, desktop), 3D tisk a modelování.",
    tags: ["Aplikace", "Integrace", "Chrome", "Excel"],
    parts: [
      { letter: "a", name: "3D tisk", file: "12a_CLDE_3d_tisk.html", title: "Claude a 3D tisk", desc: "K čemu Claude při 3D tisku použít, na co si dát pozor, filamenty a kalibrace, modely z fotek, náčrtů a popisu." },
      { letter: "b", name: "Modelování", file: "12b_CLDE_modelovani.html", title: "Modelování a propojení programů", desc: "Fusion 360, Meshmixer, Blender a slicer: jak je použít a propojit, s prompty." },
      { letter: "c", name: "Další aplikace", file: "12c_CLDE_dalsi_aplikace.html", title: "Další aplikace a jejich použití", desc: "Chrome, Excel, PowerPoint, Word, Google Workspace a Slack: co umí a konkrétní případy použití s prompty." }
    ]
  },
  {
    num: "13",
    name: "Claude Code",
    file: "13_CLDE_claude_code.html",
    title: "Claude Code: základy",
    desc: "Co je Claude Code, kde běží (terminál, desktop, web, editory, mobil), první úkol a přenos mezi zařízeními. Odkaz na podrobný manuál.",
    tags: ["Claude code", "Terminál", "Desktop", "Web"]
  },
  {
    num: "14",
    name: "Bezpečnost",
    file: "14_CLDE_bezpecnost.html",
    title: "Bezpečnost a soukromí",
    desc: "Data a soukromí, trénink, smazání a export dat, bezpečné používání konektorů, Skills, Cowork a Code.",
    tags: ["Bezpečnost", "Soukromí", "Data", "Smazání dat"]
  },
  {
    num: "15",
    name: "Troubleshooting",
    file: "15_CLDE_troubleshooting.html",
    title: "Troubleshooting a pomoc",
    desc: "Chyby, limity, konektory, pomalé odpovědi, stav služby a kde hledat pomoc.",
    tags: ["Chyby", "Pomoc", "Řešení problémů", "Stav služby"]
  }
];
