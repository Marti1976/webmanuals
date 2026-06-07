// ============================================================
// search-data.js — Fulltextový index průvodce 3D tiskem
// Kobra X · Anycubic · CZ
//
// Struktura záznamu:
//   id       — unikátní identifikátor (bez mezer)
//   title    — název sekce / pojmu (zobrazí se ve výsledcích)
//   page     — název HTML souboru
//   anchor   — #id kotvy na stránce (nebo "" pokud není)
//   tags     — klíčová slova pro vyhledávání (CZ i EN, synonyma,
//              HW/SW názvy, zkratky, hovorové výrazy)
// ============================================================

const SEARCH_INDEX = [

  // ----------------------------------------------------------
  // 00 · INDEX — Rozcestník
  // ----------------------------------------------------------
  { id: "rozcestnik",      title: "Obsah & Hledání — Rozcestník",         page: "00_3D_index.html",        anchor: "",                  tags: ["obsah", "index", "rozcestník", "přehled", "hledání", "search"] },
  { id: "prilohy",         title: "Ostatní přílohy (checklist, manuál)",   page: "00_3D_index.html",        anchor: "#ostatni_prilohy",  tags: ["přílohy", "checklist", "manuál", "pdf", "soubory", "stažení"] },
  { id: "oblibene",        title: "Výběr odkazů — oblíbené weby",          page: "00_3D_index.html",        anchor: "#oblibene_odkazy",  tags: ["odkazy", "weby", "zdroje", "doporučené", "komunita"] },

  // ----------------------------------------------------------
  // 01 · ÚVOD DO FDM TISKU
  // ----------------------------------------------------------
  { id: "fdm",             title: "Co je FDM tisk?",                       page: "01_3D_uvod.html",         anchor: "#co-je-fdm",        tags: ["fdm", "fused deposition modeling", "tisk", "technologie", "základy", "jak funguje"] },
  { id: "vrstva",          title: "Vrstva (Layer) — jak vzniká 3D objekt", page: "01_3D_uvod.html",         anchor: "#vrstvy",           tags: ["vrstva", "layer", "výška vrstvy", "layer height", "rozlišení", "kvalita"] },
  { id: "filament-co-je",  title: "Co je filament — základní pojmy",       page: "01_3D_uvod.html",         anchor: "#filament",         tags: ["filament", "struna", "materiál", "cívka", "spool", "průměr", "1.75mm"] },
  { id: "extruder",        title: "Extruder (Podavač filamentu)",           page: "01_3D_uvod.html",         anchor: "#extruder",         tags: ["extruder", "podavač", "feeder", "motor", "bowden", "direct drive", "průtok"] },
  { id: "hotend",          title: "Hotend — tavná hlava",                  page: "01_3D_uvod.html",         anchor: "#hotend",           tags: ["hotend", "tavná hlava", "tryska", "nozzle", "heater block", "heat break", "tepelná bariéra"] },
  { id: "bowden",          title: "Bowden vs. Direct Drive",               page: "01_3D_uvod.html",         anchor: "#bowden",           tags: ["bowden", "direct drive", "teflonová trubice", "ptfe", "vzdálenost", "retrakce"] },
  { id: "heatbed",         title: "Vyhřívaná podložka (Heatbed)",          page: "01_3D_uvod.html",         anchor: "#heatbed",          tags: ["heatbed", "podložka", "vyhřívaná podložka", "bed", "teplota podložky", "přilnavost"] },
  { id: "slicer-co-je",   title: "Co je slicer a k čemu slouží",          page: "01_3D_uvod.html",         anchor: "#slicer",           tags: ["slicer", "slicování", "prusaslicer", "cura", "bambu studio", "anycubic slicer", "software"] },
  { id: "gcode",           title: "G-code — instrukce pro tiskárnu",       page: "01_3D_uvod.html",         anchor: "#gcode",            tags: ["gcode", "g-code", "instrukce", "příkazy", "soubor", "export"] },
  { id: "supports",        title: "Podpory (Supports) — přehled",          page: "01_3D_uvod.html",         anchor: "#supports",         tags: ["supports", "podpory", "podpěry", "přesah", "overhang", "odstranění"] },
  { id: "infill",          title: "Infill — výplň modelu",                 page: "01_3D_uvod.html",         anchor: "#infill",           tags: ["infill", "výplň", "hustota", "pevnost", "gyroid", "grid", "honeycomb", "procenta"] },
  { id: "warping",         title: "Warping — deformace rohů",              page: "01_3D_uvod.html",         anchor: "#warping",          tags: ["warping", "deformace", "zvedání rohů", "ABS", "brim", "raft", "podložka"] },
  { id: "stringing",       title: "Stringing — pavučiny mezi díly",        page: "01_3D_uvod.html",         anchor: "#stringing",        tags: ["stringing", "pavučiny", "nitě", "retrakce", "retraction", "teplota", "rychlost"] },
  { id: "bed-adhesion",    title: "Přilnavost k podložce (Bed adhesion)",  page: "01_3D_uvod.html",         anchor: "#bed-adhesion",     tags: ["bed adhesion", "přilnavost", "brim", "raft", "skirt", "první vrstva", "lepidlo"] },
  { id: "prvni-vrstva",    title: "První vrstva — základ úspěchu",         page: "01_3D_uvod.html",         anchor: "#prvni-vrstva",     tags: ["první vrstva", "first layer", "kalibrace", "z-offset", "squish", "přilnavost"] },
  { id: "stl-obj",         title: "STL a OBJ — formáty 3D modelů",        page: "01_3D_uvod.html",         anchor: "#stl",              tags: ["stl", "obj", "3mf", "formát", "model", "soubor", "import", "cad"] },

  // ----------------------------------------------------------
  // 02 · TISKÁRNA KOBRA X  (základní záznamy — rozšíří se)
  // ----------------------------------------------------------
  { id: "kobra-x",         title: "Anycubic Kobra X — přehled",           page: "02_3D_tiskarna.html",     anchor: "",                  tags: ["kobra x", "anycubic", "tiskárna", "specifikace", "parametry"] },
  { id: "tryska",          title: "Trysky — průměry a materiály",          page: "02_3D_tiskarna.html",     anchor: "#trysky",           tags: ["tryska", "nozzle", "0.4mm", "hardened steel", "tvrzená ocel", "průměr", "výměna"] },
  { id: "pei-platna",      title: "PEI plát — tisková podložka",           page: "02_3D_tiskarna.html",     anchor: "#pei",              tags: ["pei", "plát", "podložka", "textured", "smooth", "přilnavost", "čištění", "ipa"] },

  // ----------------------------------------------------------
  // 06 · PŘÍPRAVA & TISK  (základní záznamy — rozšíří se)
  // ----------------------------------------------------------
  { id: "leveling",        title: "Auto-leveling a kalibrace",             page: "06_3D_priprava_a_tisk.html", anchor: "#leveling",      tags: ["kalibrace", "leveling", "auto-level", "z-offset", "podložka", "první vrstva"] },
  { id: "magigoo",         title: "Magigoo — separační vrstva / adhesivum",page: "06_3D_priprava_a_tisk.html", anchor: "#adhesiva",      tags: ["magigoo", "adhesivum", "lepidlo", "separace", "petg", "tpu", "nylon", "pva"] },

  // ----------------------------------------------------------
  // 07 · POST-PROCESSING  (základní záznamy — rozšíří se)
  // ----------------------------------------------------------
  { id: "post-processing", title: "Post-processing — úpravy po tisku",     page: "07_3D_post_processing.html", anchor: "",              tags: ["post-processing", "úpravy", "broušení", "tmelení", "lakování", "povrch"] },

  // ----------------------------------------------------------
  // 08 · FILAMENTY  (základní záznamy — rozšíří se)
  // ----------------------------------------------------------
  { id: "pla",             title: "PLA — základní filament",               page: "08_3D_filamenty.html",    anchor: "#pla",              tags: ["pla", "filament", "materiál", "začátečník", "teplota", "základní"] },
  { id: "petg",            title: "PETG — odolný filament",                page: "08_3D_filamenty.html",    anchor: "#petg",             tags: ["petg", "filament", "odolnost", "separace", "teplota", "materiál"] },
  { id: "abs",             title: "ABS / ASA — technické filamenty",       page: "08_3D_filamenty.html",    anchor: "#abs",              tags: ["abs", "asa", "filament", "warping", "technický", "UV odolnost"] },
  { id: "tpu",             title: "TPU — flexibilní filament",             page: "08_3D_filamenty.html",    anchor: "#tpu",              tags: ["tpu", "flex", "flexibilní", "guma", "pružný", "filament"] },
  { id: "nylon",           title: "Nylon (PA) — konstrukční filament",     page: "08_3D_filamenty.html",    anchor: "#nylon",            tags: ["nylon", "pa", "polyamid", "warping", "vlhkost", "sušení", "magigoo pa"] },
  { id: "suseni",          title: "Sušení filamentu — vlhkost",            page: "08_3D_filamenty.html",    anchor: "#suseni",           tags: ["sušení", "vlhkost", "drybox", "sušička", "hygrometr", "skladování", "bublinky"] },

];
