// Vyhledávací index pro manuál Fusion 360.
// Jakmile vzniknou jednotlivé kapitoly (01_F360_...html atd.), doplňte/rozšiřte tagy dle skutečného obsahu.

const SEARCH_INDEX = [
  { title: "Obsah & Hledání", tags: ["obsah", "rozcestník", "hledání", "kapitoly"], page: "00_F360_index.html", anchor: "" },
  { title: "Úvod do Fusion 360", tags: ["úvod", "cad", "cam", "cae", "licence", "instalace", "účet"], page: "01_F360_uvod.html", anchor: "" },
  { title: "Rozhraní & ovládání", tags: ["rozhraní", "ui", "data panel", "viewcube", "marking menu", "zkratky"], page: "02_F360_rozhrani.html", anchor: "" },
  { title: "Skica — základy", tags: ["skica", "sketch", "náčrt", "vazby", "constraints", "kóty"], page: "03_F360_skica_zaklad.html", anchor: "" },
  { title: "Skica — pokročilá", tags: ["skica", "sketch", "offset", "vzory", "patterns", "dxf"], page: "04_F360_skica_pokrocila.html", anchor: "" },
  { title: "Modelování dílů", tags: ["modelování", "timeline", "parametry"], page: "05a_F360_model_zakladni.html", anchor: "" },
  { title: "Základní tělesa", tags: ["extrude", "revolve", "sweep", "loft", "vysunutí", "rotace", "tažení", "šablonování"], page: "05a_F360_model_zakladni.html", anchor: "" },
  { title: "Úpravy a detaily", tags: ["fillet", "chamfer", "shell", "draft", "zaoblení", "sražení", "skořepina", "úkos", "boolean"], page: "05b_F360_model_detaily.html", anchor: "" },
  { title: "Parametry & konfigurace", tags: ["parametry", "timeline", "konfigurace", "uživatelské parametry"], page: "05c_F360_model_parametry.html", anchor: "" },
  { title: "Sestavy", tags: ["sestavy", "assembly", "joints", "klouby", "vazby", "motion study"], page: "06_F360_sestavy.html", anchor: "" },
  { title: "Výkresy", tags: ["výkresy", "drawing", "kóty", "řezy", "bom", "tabulka položek"], page: "07_F360_vykresy.html", anchor: "" },
  { title: "Renderování & vizualizace", tags: ["render", "materiály", "scéna", "osvětlení", "animace"], page: "08_F360_render.html", anchor: "" },
  { title: "Simulace & generativní design", tags: ["simulace", "napětí", "deformace", "generativní design"], page: "09_F360_simulace.html", anchor: "" },
  { title: "CAM & výroba", tags: ["cam", "toolpaths", "cnc", "obrábění", "3d tisk", "export"], page: "10_F360_cam.html", anchor: "" },
  { title: "Sdílení, cloud & spolupráce", tags: ["cloud", "fusion team", "sdílení", "verze", "step", "stl", "iges", "dxf"], page: "11_F360_cloud.html", anchor: "" },
  { title: "Tipy & klávesové zkratky", tags: ["tipy", "triky", "zkratky", "best practices"], page: "12_F360_tipy.html", anchor: "" },
  { title: "Troubleshooting", tags: ["chyby", "problémy", "timeline", "vazby", "sdílení projektu"], page: "13_F360_troubleshooting.html", anchor: "" },
  { title: "Ostatní přílohy", tags: ["dokumentace", "licence", "help", "app store"], page: "00_F360_index.html", anchor: "#ostatni_prilohy" },
  { title: "Oblíbené odkazy", tags: ["komunity", "fóra", "youtube", "knihovny dílů", "grabcad", "traceparts"], page: "00_F360_index.html", anchor: "#oblibene_odkazy" }
];
