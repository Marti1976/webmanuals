// ============================================================
// search-data.js — Fulltextový index průvodce Claude (CLDE)
// ZÁKLAD (úkol 3 + 4): záznamy na úrovni dílů a pod dílů, osnova 00 až 15 (viz obsah.md).
// Záznamy jednotlivých sekcí, pojmů a UI prvků se doplňují spolu s psaním
// každého dílu (úkol 4 a dál), ve stejném kroku jako samotná stránka.
//
// Jen data, žádná logika. Hledání se děje v sidebar-init.js (až po schválení).
// Pravidla a postup: Technický_prompt.md, kapitola 9.
//
// Struktura záznamu:
//   id     — unikátní identifikátor, bez mezer, vždy s předponou čísla dílu
//            ("06-co-jsou-projekty", "07a-priklady"). Díl jako celek: "kap-06".
//   title  — název, jak ho vidí čtenář (pojmenované věci: "EN termín (cz vysvětlení)")
//   page   — číslo dílu z sidebar-config.js: "06", u pod dílu "06a".
//            Název souboru se do search-data.js nepíše (najde se v configu).
//   anchor — "#id" nadpisu na stránce, nebo "" pro celou stránku
//   tags   — klíčová slova malými písmeny, CZ i EN, synonyma, zkratky,
//            hovorové výrazy, názvy tlačítek a nastavení.
//            Varianty bez diakritiky se nepíší (hledání diakritiku ignoruje).
//            Žádné věty. Žádné konkrétní hodnoty, které se mění (ceny, limity, verze).
//
// Řazení: podle čísla dílu, pod díl (a, b, c) hned za hlavním dílem,
// každý díl začíná komentářem "// 06 · NÁZEV".
// ============================================================

const SEARCH_INDEX = [

  // ----------------------------------------------------------
  // 00 · INDEX
  // ----------------------------------------------------------
  { id: "kap-00", title: "Obsah průvodce — rozcestník", page: "00", anchor: "",
    tags: ["obsah", "index", "rozcestník", "přehled", "hledání", "odkazy", "contents", "overview", "search", "links", "resources"] },

  // ----------------------------------------------------------
  // 01 · ÚVOD
  // ----------------------------------------------------------
  { id: "kap-01", title: "Úvod: co je Claude a kde ho používat", page: "01", anchor: "",
    tags: ["úvod", "co je claude", "produkty", "přehled", "kde použít", "introduction", "what is claude", "products", "overview", "web", "desktop", "mobile"] },
  { id: "01-co-je-claude", title: "Co je Claude", page: "01", anchor: "#co-je-claude",
    tags: ["co je claude", "ai asistent", "anthropic", "what is claude", "ai assistant", "prompt", "zadání"] },
  { id: "01-kde-pouzivat", title: "Kde Claude používat (web, desktop, mobil)", page: "01", anchor: "#kde-pouzivat",
    tags: ["web", "desktop", "mobil", "aplikace", "claude.ai", "ios", "android", "macos", "windows", "extensions", "rozšíření", "web", "desktop app", "mobile app", "apps", "download"] },
  { id: "01-hlasove-ovladani", title: "Hlasové ovládání (voice mode a dictation)", page: "01", anchor: "#hlasove-ovladani",
    tags: ["hlas", "hlasový režim", "diktování", "mluvení", "mikrofon", "jazyk hlasu", "voice mode", "dictation", "voice", "speech", "microphone", "voice settings", "language", "pro", "model picker"] },
  { id: "01-mapa-produktu", title: "Mapa produktů: Chat, Cowork, Code", page: "01", anchor: "#mapa-produktu",
    tags: ["chat", "konverzace", "cowork", "claude code", "produkty", "mapa produktů", "doplňky", "chrome", "slack", "excel", "powerpoint", "word", "products", "chat", "cowork", "code", "extensions"] },
  { id: "01-dalsi-produkty", title: "Další produkty a doplňky (Duet, Chrome, Excel, Slack a další)", page: "01", anchor: "#dalsi-produkty",
    tags: ["claude duet", "duet", "proaktivní agent", "claude in chrome", "chrome", "excel", "powerpoint", "word", "outlook", "google workspace", "slack", "claude tag", "claude science", "claude security", "doplňky", "rozšíření", "extensions", "add-ins", "research preview", "beta", "waitlist", "čekací listina"] },
  { id: "01-co-kdy-pouzit", title: "Co kdy použít", page: "01", anchor: "#co-kdy-pouzit",
    tags: ["co kdy použít", "výběr nástroje", "chat nebo cowork", "kdy použít", "which to use", "chat vs cowork", "choose tool"] },
  { id: "01-jak-zacit", title: "Jak začít", page: "01", anchor: "#jak-zacit",
    tags: ["jak začít", "první kroky", "registrace", "přihlášení", "getting started", "first steps", "sign up", "sign in"] },
  { id: "01-caste-chyby", title: "Časté chyby při začátku", page: "01", anchor: "#caste-chyby",
    tags: ["časté chyby", "chyby", "začátečník", "common mistakes", "beginner", "tips"] },

  // ----------------------------------------------------------
  // 02 · PLÁNY A LIMITY
  // ----------------------------------------------------------
  { id: "kap-02", title: "Plány, ceny a limity", page: "02", anchor: "",
    tags: ["plány", "ceny", "limity", "předplatné", "usage credits", "týdenní limit", "plans", "pricing", "usage limits", "subscription", "free", "pro", "max", "team", "enterprise", "weekly limit", "session limit", "usage credits"] },
  { id: "02-prehled-planu", title: "Přehled plánů (Free, Pro, Max, Team, Enterprise)", page: "02", anchor: "#prehled-planu",
    tags: ["plány", "free", "pro", "max", "team", "enterprise", "ceny", "kde najít ceny", "ceník", "plans", "pricing", "compare plans", "upgrade", "předplatné", "subscription"] },
  { id: "02-co-ma-pro", title: "Co přidává Pro oproti Free", page: "02", anchor: "#co-ma-pro",
    tags: ["pro", "free", "rozdíl", "vyplatí se", "claude code", "cowork", "prioritní přístup", "fable", "what pro adds", "free vs pro", "priority access"] },
  { id: "02-jak-funguji-limity", title: "Jak fungují limity (session limit, weekly limit)", page: "02", anchor: "#jak-funguji-limity",
    tags: ["limity", "pětihodinové okno", "týdenní limit", "limit okna", "kontextové okno", "délka konverzace", "session limit", "weekly limit", "usage limit", "length limit", "context window", "rate limit"] },
  { id: "02-co-spotrebuje-limit", title: "Co spotřebovává limit", page: "02", anchor: "#co-spotrebuje-limit",
    tags: ["spotřeba", "co žere limit", "tokeny", "model", "effort", "nástroje", "tokens", "what uses limit", "usage factors"] },
  { id: "02-limit-delky", title: "Limit využití vs. limit délky", page: "02", anchor: "#limit-delky",
    tags: ["limit délky", "limit využití", "kontext", "usage limit vs length limit", "context window", "length limit"] },
  { id: "02-kde-videt-spotrebu", title: "Kde vidět spotřebu (Settings > Usage)", page: "02", anchor: "#kde-videt-spotrebu",
    tags: ["spotřeba", "usage", "nastavení", "current session", "weekly limits", "přehled spotřeby", "settings usage", "usage dashboard", "/usage", "plan usage limits"] },
  { id: "02-usage-credits", title: "Usage credits (kredity na pokračování)", page: "02", anchor: "#usage-credits",
    tags: ["usage credits", "kredity", "pokračovat po limitu", "extra usage", "strop útraty", "auto-reload", "add funds", "spend limit", "pay as you go", "enable credits"] },
  { id: "02-credits-zapnuti", title: "Jak zapnout usage credits bezpečně", page: "02", anchor: "#credits-zapnuti",
    tags: ["zapnout kredity", "měsíční strop", "adjust limit", "add funds", "auto-reload", "enable usage credits", "monthly spend limit"] },
  { id: "02-limit-reset", title: "Limit reset (Reset for free)", page: "02", anchor: "#limit-reset",
    tags: ["limit reset", "reset zdarma", "obnovení limitu", "reset for free", "limit resets", "resets"] },
  { id: "02-jak-limity-setrit", title: "Jak s limity vydržet déle", page: "02", anchor: "#jak-limity-setrit",
    tags: ["šetření limitu", "úspora", "vydržet déle", "tipy", "optimalizace", "stretch usage", "save usage", "limit tips", "best practices", "hit limit"] },
  { id: "02-uspora-konverzace", title: "Šetření: nová konverzace a předávací shrnutí", page: "02", anchor: "#uspora-konverzace",
    tags: ["nová konverzace", "předávací shrnutí", "dlouhá konverzace", "handoff", "new chat", "summary", "long conversation"] },
  { id: "02-uspora-psani", title: "Šetření: jak psát zadání", page: "02", anchor: "#uspora-psani",
    tags: ["dávkové zadání", "kontext předem", "sloučit zprávy", "batch", "single message", "prompt efficiency"] },
  { id: "02-uspora-model-effort", title: "Šetření: model, Effort a thinking", page: "02", anchor: "#uspora-model-effort",
    tags: ["model", "effort", "thinking", "nižší effort", "haiku", "sonnet", "opus", "fable", "lower effort", "model choice"] },
  { id: "02-uspora-projekty", title: "Šetření: Projekty a cache", page: "02", anchor: "#uspora-projekty",
    tags: ["projekty", "cache", "rag", "soubory projektu", "projects", "caching", "project knowledge"] },
  { id: "02-uspora-nastroje", title: "Šetření: nástroje, konektory a soubory", page: "02", anchor: "#uspora-nastroje",
    tags: ["konektory", "web search", "research", "soubory", "artifacts", "connectors", "tools off", "file creation"] },
  { id: "02-uspora-cowork", title: "Šetření: Cowork a Claude Code", page: "02", anchor: "#uspora-cowork",
    tags: ["cowork", "claude code", "sdílený limit", "shared limit", "/usage", "agentic tasks"] },
  { id: "02-uspora-hlas", title: "Šetření: hlas a diktování", page: "02", anchor: "#uspora-hlas",
    tags: ["hlas", "diktování", "voice mode", "dictation", "voice usage"] },
  { id: "02-uspora-pamet", title: "Šetření: paměť a hledání v minulých konverzacích", page: "02", anchor: "#uspora-pamet",
    tags: ["paměť", "hledání v konverzacích", "memory", "search past chats", "chat search"] },
  { id: "02-uspora-casovani", title: "Šetření: načasování práce", page: "02", anchor: "#uspora-casovani",
    tags: ["načasování", "pětihodinové okno", "týdenní reset", "plánování práce", "timing", "work windows"] },
  { id: "02-uspora-prompty", title: "Prompty, které šetří limit", page: "02", anchor: "#uspora-prompty",
    tags: ["prompty", "audit projektu", "rozdělení úkolu", "efficient prompts", "task breakdown"] },
  { id: "02-uspora-nastroje-sledovani", title: "Nástroje pro sledování spotřeby", page: "02", anchor: "#uspora-nastroje-sledovani",
    tags: ["sledování spotřeby", "usage tracker", "monitor", "/usage", "usage monitoring", "extensions"] },
  { id: "02-pri-dosazeni-limitu", title: "Co dělat při dosažení limitu", page: "02", anchor: "#pri-dosazeni-limitu",
    tags: ["dosažení limitu", "limit reached", "počkat", "upgrade", "usage credits", "hit limit", "what to do"] },
  { id: "02-pracovni-ucet", title: "Pracovní účet vs. vlastní Pro", page: "02", anchor: "#pracovni-ucet",
    tags: ["pracovní účet", "firemní účet", "team", "enterprise", "zaměstnavatel", "správce", "work account", "admin", "soukromí", "seat", "premium seat", "standard seat"] },
  { id: "02-caste-chyby", title: "Časté chyby u plánů a limitů", page: "02", anchor: "#caste-chyby",
    tags: ["časté chyby", "chyby", "limity", "common mistakes", "plans mistakes"] },
  { id: "02-chyba-pocet-zprav", title: "Chyba: hledání „počtu zpráv“", page: "02", anchor: "#chyba-pocet-zprav",
    tags: ["počet zpráv", "kolik zpráv", "message count", "limit není ve zprávách"] },
  { id: "02-chyba-vecna-konverzace", title: "Chyba: věčná konverzace", page: "02", anchor: "#chyba-vecna-konverzace",
    tags: ["dlouhá konverzace", "věčná konverzace", "long conversation", "nová konverzace"] },
  { id: "02-chyba-nejvyssi-effort", title: "Chyba: vždy nejvyšší Effort a nejsilnější model", page: "02", anchor: "#chyba-nejvyssi-effort",
    tags: ["effort", "model", "plýtvání", "high effort", "wrong model"] },
  { id: "02-chyba-zapomenuty-konektor", title: "Chyba: zapomenutý konektor nebo vyhledávání", page: "02", anchor: "#chyba-zapomenuty-konektor",
    tags: ["konektory", "web search", "vypnout nástroje", "connectors on", "tools drain usage"] },
  { id: "02-chyba-neomezene-kredity", title: "Chyba: neomezené usage credits", page: "02", anchor: "#chyba-neomezene-kredity",
    tags: ["strop kreditů", "neomezené kredity", "set to unlimited", "spend limit", "usage credits"] },
  { id: "02-chyba-fable-bez-kreditu", title: "Chyba: Fable na Pro bez kreditů", page: "02", anchor: "#chyba-fable-bez-kreditu",
    tags: ["fable", "pro", "kredity", "usage credits", "fable credits"] },
  { id: "02-chyba-nova-konverzace-neobnovi", title: "Chyba: nová konverzace limit neobnoví", page: "02", anchor: "#chyba-nova-konverzace-neobnovi",
    tags: ["obnovení limitu", "nová konverzace", "limit reset", "new chat does not reset"] },
  { id: "02-chyba-ceny-z-internetu", title: "Chyba: ceny a čísla limitů z internetu", page: "02", anchor: "#chyba-ceny-z-internetu",
    tags: ["ceny", "zastaralé informace", "ověření", "pricing", "outdated info"] },
  { id: "02-chyba-osobni-a-pracovni", title: "Chyba: míchání osobních a pracovních dat", page: "02", anchor: "#chyba-osobni-a-pracovni",
    tags: ["pracovní účet", "soukromí", "firemní data", "work account", "privacy"] },
  { id: "02-chyba-cowork-na-vse", title: "Chyba: Cowork na jednoduché úkoly", page: "02", anchor: "#chyba-cowork-na-vse",
    tags: ["cowork", "chat", "spotřeba", "overusing cowork"] },
  { id: "02-chyba-opakovane-nahravani", title: "Chyba: opakované nahrávání týchž souborů", page: "02", anchor: "#chyba-opakovane-nahravani",
    tags: ["soubory", "projekty", "cache", "repeated uploads"] },
  { id: "02-chyba-jen-okno", title: "Chyba: hlídání jen okna, ne týdenního limitu", page: "02", anchor: "#chyba-jen-okno",
    tags: ["týdenní limit", "pětihodinové okno", "weekly limit", "session limit"] },
  { id: "02-chyba-predplatne-pres-aplikaci", title: "Chyba: předplatné přes obchod s aplikacemi a kredity", page: "02", anchor: "#chyba-predplatne-pres-aplikaci",
    tags: ["app store", "google play", "předplatné", "usage credits web", "subscription via app"] },
  { id: "02-chyba-propadly-reset", title: "Chyba: propadlý limit reset", page: "02", anchor: "#chyba-propadly-reset",
    tags: ["limit reset", "propadl", "expirace", "expired reset", "resets"] },

  // ----------------------------------------------------------
  // 03 · INSTALACE A NASTAVENÍ
  // ----------------------------------------------------------
  { id: "kap-03", title: "Instalace a nastavení", page: "03", anchor: "",
    tags: ["instalace", "nastavení", "účet", "windows", "macos", "mobil", "hlasový režim", "přihlášení", "install", "setup", "settings", "account", "desktop app", "mobile app", "voice mode", "sign in", "language", "theme", "profile"] },
  { id: "03-kde-bezi", title: "Kde Claude běží a v čem se liší (web, Windows, Android)", page: "03", anchor: "#kde-bezi",
    tags: ["web", "windows", "android", "mobil", "desktop", "instalace", "rozdíly", "quick entry", "platformy", "štítky platformy", "web vs app", "where claude runs", "install", "platforms"] },
  { id: "03-ucet", title: "Účet a přihlášení", page: "03", anchor: "#ucet",
    tags: ["účet", "přihlášení", "google", "apple", "e-mail", "sms ověření", "hide my email", "sso", "account", "sign in", "login", "phone verification"] },
  { id: "03-web", title: "Web (claude.ai)", page: "03", anchor: "#web",
    tags: ["web", "claude.ai", "prohlížeč", "api keys", "platform", "browser"] },
  { id: "03-windows", title: "Desktopová aplikace pro Windows", page: "03", anchor: "#windows",
    tags: ["windows", "desktop", "instalátor", "microsoft store", "arm64", "quick entry", "ctrl+alt+space", "tray", "desktop app", "installer"] },
  { id: "03-windows-navic", title: "Co aplikace umí navíc oproti webu", page: "03", anchor: "#windows-navic",
    tags: ["quick entry", "zkratka", "diktování", "spuštění při startu", "keep awake", "computer use", "desktopová rozšíření", "startup", "shortcut", "extensions"] },
  { id: "03-android", title: "Mobilní aplikace pro Android", page: "03", anchor: "#android",
    tags: ["android", "mobil", "aplikace", "qr kód", "claude.ai/mobile", "mobile app", "install android"] },
  { id: "03-android-navic", title: "Co je jen na mobilu", page: "03", anchor: "#android-navic",
    tags: ["permissions", "location", "calendar", "haptic feedback", "sharing", "share from other apps", "oprávnění", "poloha", "kalendář", "vibrace"] },
  { id: "03-propojeni", title: "Propojení zařízení a přenos práce", page: "03", anchor: "#propojeni",
    tags: ["propojení", "přenos práce", "synchronizace", "párování", "remote control", "cowork", "handoff", "sync", "pair desktop mobile", "continue on another device"] },
  { id: "03-propojeni-sync", title: "Co se synchronizuje mezi zařízeními", page: "03", anchor: "#propojeni-sync",
    tags: ["synchronizace", "konverzace", "projekty", "paměť", "vzhled", "lokální relace", "sync", "what syncs"] },
  { id: "03-propojeni-predani", title: "Jak práci předat mezi zařízeními", page: "03", anchor: "#propojeni-predani",
    tags: ["předání", "telefon do počítače", "remote control", "trusted devices", "transfer task", "handoff"] },
  { id: "03-hlas", title: "Hlas a diktování do detailu", page: "03", anchor: "#hlas",
    tags: ["hlas", "diktování", "hlasový režim", "ctrl+d", "dictation", "voice mode", "voice settings"] },
  { id: "03-hlas-nastaveni", title: "Kde se hlas nastavuje (Language, Style, Speed, Pace)", page: "03", anchor: "#hlas-nastaveni",
    tags: ["language", "style", "speed", "pace", "buttery", "airy", "dictation shortcut", "hlas nastavení", "voice settings"] },
  { id: "03-hlas-cestina", title: "Čeština v hlasovém režimu", page: "03", anchor: "#hlas-cestina",
    tags: ["čeština", "český hlas", "přízvuk", "jazyk hlasu", "czech voice", "language list"] },
  { id: "03-rozdily", title: "Rozdíly web vs. aplikace vs. mobil", page: "03", anchor: "#rozdily",
    tags: ["rozdíly", "srovnání", "web vs aplikace", "mobil", "menu settings", "comparison", "settings differences"] },
  { id: "03-rychle-nastaveni", title: "Rychlé nastavení po instalaci", page: "03", anchor: "#rychle-nastaveni",
    tags: ["rychlé nastavení", "checklist", "po instalaci", "doporučené nastavení", "quick setup", "first setup"] },
  { id: "03-nastaveni", title: "Kompletní průvodce nastavením (Settings)", page: "03", anchor: "#nastaveni",
    tags: ["nastavení", "settings", "menu settings", "všechna nastavení", "complete settings guide", "preferences", "customize", "platform"] },
  { id: "03-nastaveni-vsude", title: "General (obecné): vzhled, hlas, upozornění", page: "03", anchor: "#nastaveni-general",
    tags: ["profile", "billing", "theme", "color mode", "font", "voice", "notifications", "time and focus", "artifacts", "inline visualizations", "code execution", "memory", "connectors", "tool access", "privacy", "log out"] },
  { id: "03-toolaccess", title: "Tool access (režim přístupu k nástrojům: Auto, On demand, Always available)", page: "03", anchor: "#toolaccess",
    tags: ["tool access", "tool access mode", "auto", "on demand", "always available", "load tools when needed", "konektory", "nástroje", "connector tools"] },
  { id: "03-nastaveni-webapp", title: "Account (účet): profil, instrukce, relace, zařízení", page: "03", anchor: "#nastaveni-account",
    tags: ["account", "instructions for claude", "trusted devices", "passkey", "active sessions", "export data", "shared chats", "location metadata", "ai-powered artifacts", "allow network egress", "reflect", "skills", "plugins", "transcript width", "motion"] },
  { id: "03-nastaveni-katalogy", title: "Customize: Skills, Connectors, Plugins (stránky nastavení)", page: "03", anchor: "#nastaveni-customize",
    tags: ["skills", "connectors", "plugins", "customize", "discover", "yours", "add", "katalog", "from anthropic & partners", "skill-creator"] },
  { id: "03-reflect", title: "Reflect (zpětný pohled, měsíční přehled)", page: "03", anchor: "#nastaveni-reflect",
    tags: ["reflect", "paměť", "přehled používání", "memory required", "usage recap", "monthly recap"] },
  { id: "03-nastaveni-claudecode", title: "Nastavení Claude Code v aplikaci", page: "03", anchor: "#nastaveni-claudecode",
    tags: ["claude code", "classify session states", "pull requests", "branch prefix", "auto-fix pull requests", "authorization tokens", "delete sessions", "code appearance", "transcript view", "settings claude code"] },
  { id: "03-nastaveni-web", title: "Platform: API keys (jen web)", page: "03", anchor: "#nastaveni-platform",
    tags: ["api keys", "platform", "claude platform", "vývojář", "developer account"] },
  { id: "03-nastaveni-mobil", title: "Nastavení jen na mobilu (Android)", page: "03", anchor: "#nastaveni-mobil",
    tags: ["permissions", "haptic feedback", "sharing", "shared links", "always share to a new chat", "web search", "product updates", "voice carousel", "mobilní nastavení", "android settings"] },
  { id: "03-nastaveni-aplikace", title: "Nastavení jen v aplikaci (This computer)", page: "03", anchor: "#nastaveni-aplikace",
    tags: ["this computer", "system", "run on startup", "quick entry", "dictation shortcut", "system tray", "keep computer awake", "storage", "extensions", "developer", "local mcp servers", "computer use"] },
  { id: "03-computer-use", title: "Computer use (ovládání počítače, beta)", page: "03", anchor: "#computer-use",
    tags: ["computer use", "enable computer use", "ovládání počítače", "myš klávesnice", "riziko", "beta", "control screen"] },
  { id: "03-caste-chyby", title: "Časté chyby: instalace, přihlášení, hlas, nastavení", page: "03", anchor: "#caste-chyby",
    tags: ["časté chyby", "chyby", "plánované úlohy nefungují", "hlas anglicky", "vzhled nesdílený", "common mistakes", "troubleshooting settings"] },
  { id: "03-nastaveni-privacy", title: "Privacy (soukromí)", page: "03", anchor: "#nastaveni-privacy",
    tags: ["privacy", "soukromí", "help improve our ai models", "trénování", "export data", "shared chats", "shared artifacts", "uploaded files", "your feedback", "location metadata", "incognito"] },
  { id: "03-nastaveni-billing", title: "Billing (fakturace)", page: "03", anchor: "#nastaveni-billing",
    tags: ["billing", "fakturace", "plán", "upgrade plan", "free plan", "předplatné"] },
  { id: "03-nastaveni-capabilities", title: "Capabilities (schopnosti)", page: "03", anchor: "#nastaveni-capabilities",
    tags: ["capabilities", "artifacts", "ai-powered artifacts", "inline visualizations", "code execution", "allow network egress", "tool access mode", "connector search", "switch models", "web search"] },
  { id: "03-nastaveni-memory", title: "Memory (paměť): Generate memory from chats", page: "03", anchor: "#nastaveni-memory",
    tags: ["memory", "paměť", "generate memory from chats", "pozastavit paměť", "resetovat paměť", "include sensitive topics", "incognito"] },
  { id: "03-nastaveni-time", title: "Time and focus (čas a soustředění)", page: "03", anchor: "#nastaveni-time",
    tags: ["time and focus", "wellbeing", "break reminders", "quiet hours", "připomínky pauzy", "tiché hodiny"] },
  { id: "03-propojeni-cloud", title: "Cloudová nebo lokální relace", page: "03", anchor: "#propojeni-cloud",
    tags: ["cloudová relace", "lokální relace", "cloud session", "local session", "cowork"] },
  { id: "03-propojeni-dispatch", title: "Zadání úkolu z telefonu do počítače (Dispatch)", page: "03", anchor: "#propojeni-dispatch",
    tags: ["dispatch", "zadání z telefonu", "spárování", "pair desktop mobile", "cowork", "assign tasks"] },
  { id: "03-propojeni-remote", title: "Claude Code z telefonu (Remote Control)", page: "03", anchor: "#propojeni-remote",
    tags: ["remote control", "trusted devices", "passkey", "claude code z telefonu", "windows hello"] },
  { id: "03-propojeni-limity", title: "Dopad propojení na limity", page: "03", anchor: "#propojeni-limity",
    tags: ["limity", "společný limit", "shared limit", "usage"] },
  { id: "03-s-theme", title: "Theme (téma)", page: "03", anchor: "#s-theme",
    tags: ["theme", "téma", "general", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings", "color mode (barevný režim"] },
  { id: "03-s-interface-font", title: "Interface font (písmo rozhraní)", page: "03", anchor: "#s-interface-font",
    tags: ["interface font", "písmo rozhraní", "general", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-response-font", title: "Response font (písmo odpovědí)", page: "03", anchor: "#s-response-font",
    tags: ["response font", "písmo odpovědí", "general", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-transcript-text-size", title: "Transcript text size (velikost textu v konverzaci)", page: "03", anchor: "#s-transcript-text-size",
    tags: ["transcript text size", "velikost textu v konverzaci", "general", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-transcript-width", title: "Transcript width (šířka konverzace)", page: "03", anchor: "#s-transcript-width",
    tags: ["transcript width", "šířka konverzace", "general", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-motion", title: "Motion (pohyb)", page: "03", anchor: "#s-motion",
    tags: ["motion", "pohyb", "general", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-language", title: "Language (jazyk hlasu)", page: "03", anchor: "#s-language",
    tags: ["language", "jazyk hlasu", "general", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-style", title: "Style (styl hlasu)", page: "03", anchor: "#s-style",
    tags: ["style", "styl hlasu", "general", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings", "karusel hlasů"] },
  { id: "03-s-speed", title: "Speed (rychlost)", page: "03", anchor: "#s-speed",
    tags: ["speed", "rychlost", "general", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings", "pace (tempo"] },
  { id: "03-s-response-completions", title: "Response completions (dokončení odpovědi)", page: "03", anchor: "#s-response-completions",
    tags: ["response completions", "dokončení odpovědi", "general", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings", "replies (odpovědi"] },
  { id: "03-s-mentions-and-replies", title: "Mentions and replies (zmínky a odpovědi)", page: "03", anchor: "#s-mentions-and-replies",
    tags: ["mentions and replies", "zmínky a odpovědi", "general", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-comments-on-your-artifacts", title: "Comments on your artifacts (komentáře k tvým artifacts)", page: "03", anchor: "#s-comments-on-your-artifacts",
    tags: ["comments on your artifacts", "komentáře k tvým artifacts", "general", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-artifacts-shared-with-you", title: "Artifacts shared with you (artifacts sdílené s tebou)", page: "03", anchor: "#s-artifacts-shared-with-you",
    tags: ["artifacts shared with you", "artifacts sdílené s tebou", "general", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-product-updates", title: "Product updates (novinky)", page: "03", anchor: "#s-product-updates",
    tags: ["product updates", "novinky", "general", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-profile", title: "Profile (profil)", page: "03", anchor: "#s-profile",
    tags: ["profile", "profil", "account", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-instructions-for-claude", title: "Instructions for Claude (instrukce pro Claude)", page: "03", anchor: "#s-instructions-for-claude",
    tags: ["instructions for claude", "instrukce pro claude", "account", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-log-out-of-all-devices", title: "Log out of all devices (odhlásit na všech zařízeních)", page: "03", anchor: "#s-log-out-of-all-devices",
    tags: ["log out of all devices", "odhlásit na všech zařízeních", "account", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings", "log out (odhlásit"] },
  { id: "03-s-delete-your-account", title: "Delete your account (smazat účet)", page: "03", anchor: "#s-delete-your-account",
    tags: ["delete your account", "smazat účet", "account", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-organization-id", title: "Organization ID (ID organizace)", page: "03", anchor: "#s-organization-id",
    tags: ["organization id", "id organizace", "account", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-trusted-devices", title: "Trusted devices (důvěryhodná zařízení)", page: "03", anchor: "#s-trusted-devices",
    tags: ["trusted devices", "důvěryhodná zařízení", "account", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-passkey", title: "Passkey (přístupový klíč)", page: "03", anchor: "#s-passkey",
    tags: ["passkey", "přístupový klíč", "account", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-active-sessions", title: "Active sessions (aktivní relace)", page: "03", anchor: "#s-active-sessions",
    tags: ["active sessions", "aktivní relace", "account", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-how-we-protect-your-data", title: "How we protect your data (jak chráníme tvoje data)", page: "03", anchor: "#s-how-we-protect-your-data",
    tags: ["how we protect your data", "jak chráníme tvoje data", "privacy", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-location-metadata", title: "Location metadata (metadata o poloze)", page: "03", anchor: "#s-location-metadata",
    tags: ["location metadata", "metadata o poloze", "privacy", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-help-improve-our-ai-models", title: "Help improve our AI models (pomoci zlepšit modely AI)", page: "03", anchor: "#s-help-improve-our-ai-models",
    tags: ["help improve our ai models", "pomoci zlepšit modely ai", "privacy", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-export-data", title: "Export data (exportovat data)", page: "03", anchor: "#s-export-data",
    tags: ["export data", "exportovat data", "privacy", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-shared-chats", title: "Shared chats (sdílené konverzace)", page: "03", anchor: "#s-shared-chats",
    tags: ["shared chats", "sdílené konverzace", "privacy", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings", "sharing → shared links (sdílení → sdílené odkazy"] },
  { id: "03-s-shared-artifacts", title: "Shared artifacts (sdílené artifacts)", page: "03", anchor: "#s-shared-artifacts",
    tags: ["shared artifacts", "sdílené artifacts", "privacy", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-uploaded-files", title: "Uploaded files (nahrané soubory)", page: "03", anchor: "#s-uploaded-files",
    tags: ["uploaded files", "nahrané soubory", "privacy", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-your-feedback", title: "Your feedback (tvoje zpětná vazba)", page: "03", anchor: "#s-your-feedback",
    tags: ["your feedback", "tvoje zpětná vazba", "privacy", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-memory-preferences", title: "Memory preferences (předvolby paměti)", page: "03", anchor: "#s-memory-preferences",
    tags: ["memory preferences", "předvolby paměti", "privacy", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-billing", title: "Billing (fakturace)", page: "03", anchor: "#s-billing",
    tags: ["billing", "fakturace", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-connector-search", title: "Connector search (vyhledávání konektorů)", page: "03", anchor: "#s-connector-search",
    tags: ["connector search", "vyhledávání konektorů", "capabilities", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings", "connector discovery (objevování konektorů"] },
  { id: "03-s-switch-models-when-a-message-is-flagged", title: "Switch models when a message is flagged (přepnout model při označené zprávě)", page: "03", anchor: "#s-switch-models-when-a-message-is-flagged",
    tags: ["switch models when a message is flagged", "přepnout model při označené zprávě", "capabilities", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-artifacts", title: "Artifacts (artifacts)", page: "03", anchor: "#s-artifacts",
    tags: ["artifacts", "capabilities", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-ai-powered-artifacts", title: "AI-powered artifacts (artifacts s AI)", page: "03", anchor: "#s-ai-powered-artifacts",
    tags: ["ai-powered artifacts", "artifacts s ai", "capabilities", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-inline-visualizations", title: "Inline visualizations (vložené vizualizace)", page: "03", anchor: "#s-inline-visualizations",
    tags: ["inline visualizations", "vložené vizualizace", "capabilities", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-code-execution-and-file-creation", title: "Code execution and file creation (spouštění kódu a tvorba souborů)", page: "03", anchor: "#s-code-execution-and-file-creation",
    tags: ["code execution and file creation", "spouštění kódu a tvorba souborů", "capabilities", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-allow-network-egress", title: "Allow network egress (povolit síťový přístup)", page: "03", anchor: "#s-allow-network-egress",
    tags: ["allow network egress", "povolit síťový přístup", "capabilities", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-web-search", title: "Web search (vyhledávání na webu)", page: "03", anchor: "#s-web-search",
    tags: ["web search", "vyhledávání na webu", "capabilities", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-generate-memory-from-chats", title: "Generate memory from chats (vytvářet paměť z konverzací)", page: "03", anchor: "#s-generate-memory-from-chats",
    tags: ["generate memory from chats", "vytvářet paměť z konverzací", "memory", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-reflect", title: "Reflect (zpětný pohled)", page: "03", anchor: "#s-reflect",
    tags: ["reflect", "zpětný pohled", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-break-reminders", title: "Break reminders (připomínky pauzy)", page: "03", anchor: "#s-break-reminders",
    tags: ["break reminders", "připomínky pauzy", "time and focus", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-quiet-hours", title: "Quiet hours (tiché hodiny)", page: "03", anchor: "#s-quiet-hours",
    tags: ["quiet hours", "tiché hodiny", "time and focus", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-classify-session-states", title: "Classify session states (třídit stavy relací)", page: "03", anchor: "#s-classify-session-states",
    tags: ["classify session states", "třídit stavy relací", "claude code", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-switch-models-when-a-message-is-flagged-2", title: "Switch models when a message is flagged (přepnout model při označené zprávě)", page: "03", anchor: "#s-switch-models-when-a-message-is-flagged-2",
    tags: ["switch models when a message is flagged", "přepnout model při označené zprávě", "claude code", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-code-appearance", title: "Code appearance (vzhled kódu)", page: "03", anchor: "#s-code-appearance",
    tags: ["code appearance", "vzhled kódu", "claude code", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-default-transcript-view", title: "Default transcript view (výchozí pohled na přepis)", page: "03", anchor: "#s-default-transcript-view",
    tags: ["default transcript view", "výchozí pohled na přepis", "claude code", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-branch-prefix", title: "Branch prefix (předpona větve)", page: "03", anchor: "#s-branch-prefix",
    tags: ["branch prefix", "předpona větve", "claude code", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-create-pull-requests-automatically", title: "Create pull requests automatically (vytvářet pull requesty automaticky)", page: "03", anchor: "#s-create-pull-requests-automatically",
    tags: ["create pull requests automatically", "vytvářet pull requesty automaticky", "claude code", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-auto-fix-pull-requests", title: "Auto-fix pull requests (automaticky opravovat pull requesty)", page: "03", anchor: "#s-auto-fix-pull-requests",
    tags: ["auto-fix pull requests", "automaticky opravovat pull requesty", "claude code", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-authorization-tokens", title: "Authorization tokens (autorizační tokeny)", page: "03", anchor: "#s-authorization-tokens",
    tags: ["authorization tokens", "autorizační tokeny", "claude code", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-delete-sessions-stored-by-anthropic", title: "Delete sessions stored by Anthropic (smazat relace uložené u Anthropic)", page: "03", anchor: "#s-delete-sessions-stored-by-anthropic",
    tags: ["delete sessions stored by anthropic", "smazat relace uložené u anthropic", "claude code", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-skills", title: "Skills (dovednosti)", page: "03", anchor: "#s-skills",
    tags: ["skills", "dovednosti", "customize", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-connectors", title: "Connectors (konektory)", page: "03", anchor: "#s-connectors",
    tags: ["connectors", "konektory", "customize", "web", "aplikace", "desktop", "windows", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-plugins", title: "Plugins (pluginy)", page: "03", anchor: "#s-plugins",
    tags: ["plugins", "pluginy", "customize", "web", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-api-keys", title: "API keys (API klíče)", page: "03", anchor: "#s-api-keys",
    tags: ["api keys", "api klíče", "platform", "web", "nastavení", "settings"] },
  { id: "03-s-desktop-app-version", title: "Desktop app version (verze aplikace)", page: "03", anchor: "#s-desktop-app-version",
    tags: ["desktop app version", "verze aplikace", "this computer", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-run-on-startup", title: "Run on startup (spustit při startu)", page: "03", anchor: "#s-run-on-startup",
    tags: ["run on startup", "spustit při startu", "this computer", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-quick-entry-keyboard-shortcut", title: "Quick Entry keyboard shortcut (zkratka pro rychlé zadání)", page: "03", anchor: "#s-quick-entry-keyboard-shortcut",
    tags: ["quick entry keyboard shortcut", "zkratka pro rychlé zadání", "this computer", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-dictation-shortcut", title: "Dictation shortcut (zkratka diktování)", page: "03", anchor: "#s-dictation-shortcut",
    tags: ["dictation shortcut", "zkratka diktování", "this computer", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-system-tray", title: "System tray (oznamovací oblast)", page: "03", anchor: "#s-system-tray",
    tags: ["system tray", "oznamovací oblast", "this computer", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-keep-computer-awake", title: "Keep computer awake (udržet počítač vzhůru)", page: "03", anchor: "#s-keep-computer-awake",
    tags: ["keep computer awake", "udržet počítač vzhůru", "this computer", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-storage", title: "Storage (úložiště)", page: "03", anchor: "#s-storage",
    tags: ["storage", "úložiště", "this computer", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-extensions", title: "Extensions (rozšíření)", page: "03", anchor: "#s-extensions",
    tags: ["extensions", "rozšíření", "this computer", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-developer", title: "Developer (vývojář)", page: "03", anchor: "#s-developer",
    tags: ["developer", "vývojář", "this computer", "aplikace", "desktop", "windows", "nastavení", "settings"] },
  { id: "03-s-permissions", title: "Permissions (oprávnění)", page: "03", anchor: "#s-permissions",
    tags: ["permissions", "oprávnění", "jen v mobilní aplikaci", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-sharing", title: "Sharing (sdílení)", page: "03", anchor: "#s-sharing",
    tags: ["sharing", "sdílení", "jen v mobilní aplikaci", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-haptic-feedback", title: "Haptic feedback (haptická odezva)", page: "03", anchor: "#s-haptic-feedback",
    tags: ["haptic feedback", "haptická odezva", "jen v mobilní aplikaci", "mobil", "android", "nastavení", "settings"] },
  { id: "03-s-upgrade", title: "Upgrade", page: "03", anchor: "#s-upgrade",
    tags: ["upgrade", "jen v mobilní aplikaci", "mobil", "android", "nastavení", "settings"] },

  // ----------------------------------------------------------
  // 04 · ZÁKLADY OVLÁDÁNÍ
  // ----------------------------------------------------------
  { id: "kap-04", title: "Základy: konverzace a prompty", page: "04", anchor: "",
    tags: ["základy", "konverzace", "prompt", "historie", "archivace", "export", "basics", "conversation", "prompt", "chat history", "archive", "export", "search chats", "edit message"] },
  { id: "kap-04a", title: "Výběr modelu, Effort a thinking", page: "04a", anchor: "",
    tags: ["model", "effort", "úroveň úsilí", "thinking", "přemýšlení", "výběr modelu", "spotřeba limitu", "model picker", "effort", "extended thinking", "low", "medium", "high", "extra high", "xhigh", "max", "fable", "opus", "sonnet", "haiku", "more models", "model selection"] },
  { id: "kap-04b", title: "Základní příklady promptů", page: "04b", anchor: "",
    tags: ["příklady", "základní prompty", "jednoduché úkoly", "examples", "basic prompts", "simple tasks", "prompt examples"] },
  { id: "kap-04c", title: "Claude ve všedním dni", page: "04c", anchor: "",
    tags: ["všední den", "každodenní použití", "plánování", "nákupy", "e-maily", "everyday use", "daily tasks", "planning", "shopping", "emails", "quick questions"] },

  // ----------------------------------------------------------
  // 05 · ROZŠÍŘENÍ PROMPTŮ
  // ----------------------------------------------------------
  { id: "kap-05", title: "Rozšíření konverzací a promptů", page: "05", anchor: "",
    tags: ["role", "kontext", "tón", "formát výstupu", "iterace", "lepší prompt", "advanced prompting", "role prompting", "context", "tone", "output format", "few-shot", "iteration", "prompt engineering"] },
  { id: "kap-05a", title: "Psaní a komunikace", page: "05a", anchor: "",
    tags: ["e-maily", "dopisy", "překlady", "korektura", "stylizace", "životopis", "sociální sítě", "emails", "letters", "translation", "proofreading", "style", "resume", "cv", "social media", "writing"] },
  { id: "kap-05b", title: "Dokumenty, práce a analýza", page: "05b", anchor: "",
    tags: ["dokumenty", "zprávy", "shrnutí", "tabulky", "plánování", "rozhodování", "učení", "studium", "documents", "reports", "summary", "tables", "planning", "decision making", "analysis", "learning", "study"] },
  { id: "kap-05c", title: "Web, tvorba a technické úlohy", page: "05c", anchor: "",
    tags: ["web", "html", "css", "javascript", "skripty", "vzorce", "tvůrčí psaní", "brainstorming", "website", "web development", "html", "css", "javascript", "scripts", "formulas", "excel", "creative writing", "brainstorming"] },

  // ----------------------------------------------------------
  // 06 · PROJEKTY
  // ----------------------------------------------------------
  { id: "kap-06", title: "Projekty: základy", page: "06", anchor: "",
    tags: ["projekty", "instrukce projektu", "znalosti", "sdílení", "projects", "project instructions", "project knowledge", "sharing"] },
  { id: "kap-06a", title: "Projekty: příprava", page: "06a", anchor: "",
    tags: ["příprava projektu", "instrukce", "soubory projektu", "zadání", "project setup", "instructions", "project files", "goal"] },
  { id: "kap-06b", title: "Projekty: rozšíření", page: "06b", anchor: "",
    tags: ["rozšíření projektu", "týmové sdílení", "oprávnění", "údržba", "extend project", "team sharing", "permissions", "maintenance", "memory", "skills", "connectors"] },
  { id: "kap-06c", title: "Projekty v praxi", page: "06c", anchor: "",
    tags: ["projekty v praxi", "příklady projektů", "šablony", "project examples", "templates", "real-world projects"] },

  // ----------------------------------------------------------
  // 07 · SOUBORY A ARTIFACTS
  // ----------------------------------------------------------
  { id: "kap-07", title: "Soubory, obrázky a Artifacts", page: "07", anchor: "",
    tags: ["soubory", "obrázky", "artifacts", "nahrávání", "vytváření souborů", "publikace", "files", "images", "artifacts", "upload", "create files", "publish", "share"] },

  // ----------------------------------------------------------
  // 08 · VYHLEDÁVÁNÍ A RESEARCH
  // ----------------------------------------------------------
  { id: "kap-08", title: "Web search, Deep Research a extended thinking", page: "08", anchor: "",
    tags: ["vyhledávání", "deep research", "web search", "extended thinking", "zdroje", "web search", "deep research", "research", "extended thinking", "sources", "citations"] },

  // ----------------------------------------------------------
  // 09 · PAMĚŤ A INSTRUKCE
  // ----------------------------------------------------------
  { id: "kap-09", title: "Paměť, vlastní instrukce a styly", page: "09", anchor: "",
    tags: ["paměť", "vlastní instrukce", "styly", "preference", "memory", "custom instructions", "styles", "preferences"] },

  // ----------------------------------------------------------
  // 10 · SKILLS A KONEKTORY
  // ----------------------------------------------------------
  { id: "kap-10", title: "Skills, konektory a pluginy", page: "10", anchor: "",
    tags: ["skills", "konektory", "pluginy", "integrace", "skills", "connectors", "plugins", "integrations", "extensions"] },
  { id: "kap-10a", title: "Skills v praxi", page: "10a", anchor: "",
    tags: ["skills v praxi", "použití skills", "příklady skills", "skills in practice", "using skills", "skill examples"] },
  { id: "kap-10b", title: "Rozšíření skillů: vlastní Skills", page: "10b", anchor: "",
    tags: ["vlastní skill", "tvorba skillu", "správa skills", "custom skill", "create skill", "skill creator", "skill.md"] },
  { id: "kap-10c", title: "Konektory a pluginy v praxi", page: "10c", anchor: "",
    tags: ["gmail", "google drive", "kalendář", "připojení konektoru", "pluginy", "gmail", "google drive", "google calendar", "connect connector", "plugins", "permissions"] },

  // ----------------------------------------------------------
  // 11 · COWORK A AGENTI
  // ----------------------------------------------------------
  { id: "kap-11", title: "Cowork a agenti: automatizace", page: "11", anchor: "",
    tags: ["cowork", "agenti", "automatizace", "oprávnění", "cowork", "agents", "automation", "permissions", "first task"] },
  { id: "kap-11a", title: "Cowork v praxi", page: "11a", anchor: "",
    tags: ["cowork v praxi", "příklady úloh", "zadávání úkolů", "cowork in practice", "task examples", "assigning tasks"] },
  { id: "kap-11b", title: "Plánované a opakované úlohy", page: "11b", anchor: "",
    tags: ["plánované úlohy", "opakované úlohy", "z mobilu", "scheduled tasks", "recurring tasks", "mobile dispatch"] },
  { id: "kap-11c", title: "Složité scénáře", page: "11c", anchor: "",
    tags: ["složité scénáře", "vícekrokové úlohy", "ladění", "complex scenarios", "multi-step tasks", "debugging", "end to end"] },

  // ----------------------------------------------------------
  // 12 · APLIKACE A 3D TISK
  // ----------------------------------------------------------
  { id: "kap-12", title: "Claude v aplikacích a 3D tisk", page: "12", anchor: "",
    tags: ["aplikace", "integrace", "chrome", "excel", "powerpoint", "word", "slack", "3d tisk", "apps", "integrations", "claude in chrome", "claude in excel", "claude in powerpoint", "claude in word", "google workspace", "slack", "3d printing"] },
  { id: "kap-12a", title: "Claude a 3D tisk", page: "12a", anchor: "",
    tags: ["3d tisk", "tisk", "vady tisku", "pomoc s tiskem", "filament", "kalibrace", "teplota", "retrakce", "modely", "náčrt", "foto", "generování", "openscad", "3d printing", "print problems", "troubleshooting prints", "fdm", "filament", "calibration", "temperature", "retraction", "flow", "pla", "petg", "3d models", "sketch", "photo to model", "generate", "openscad", "svg"] },
  { id: "kap-12b", title: "Modelování a propojení programů", page: "12b", anchor: "",
    tags: ["fusion 360", "meshmixer", "blender", "slicer", "export", "stl", "fusion 360", "meshmixer", "blender", "slicer", "stl", "3mf", "workflow"] },
  { id: "kap-12c", title: "Další aplikace a jejich použití", page: "12c", anchor: "",
    tags: ["aplikace", "chrome", "excel", "powerpoint", "word", "slack", "google workspace", "apps", "claude in chrome", "claude in excel", "claude in powerpoint", "claude in word", "google workspace", "slack", "integrations"] },

  // ----------------------------------------------------------
  // 13 · CLAUDE CODE
  // ----------------------------------------------------------
  { id: "kap-13", title: "Claude Code: základy", page: "13", anchor: "",
    tags: ["claude code", "terminál", "desktop", "web", "mobil", "editor", "claude code", "terminal", "cli", "desktop app", "web", "mobile", "vs code", "jetbrains", "ide"] },

  // ----------------------------------------------------------
  // 14 · BEZPEČNOST
  // ----------------------------------------------------------
  { id: "kap-14", title: "Bezpečnost a soukromí", page: "14", anchor: "",
    tags: ["bezpečnost", "soukromí", "data", "smazání dat", "security", "privacy", "data", "data deletion", "training data", "permissions"] },

  // ----------------------------------------------------------
  // 15 · TROUBLESHOOTING
  // ----------------------------------------------------------
  { id: "kap-15", title: "Troubleshooting a pomoc", page: "15", anchor: "",
    tags: ["chyby", "pomoc", "řešení problémů", "stav služby", "troubleshooting", "errors", "help", "support", "status", "bug report"] },

  // ----------------------------------------------------------
  // ŠABLONY (zakomentováno): záznam sekce a pod dílu
  // ----------------------------------------------------------
  // Sekce hlavního dílu (anchor = id nadpisu h2/h3 na stránce):
  //   { id: "06-co-jsou-projekty", title: "Co jsou projekty", page: "06", anchor: "#co-jsou-projekty",
  //     tags: ["projekty", "co je projekt", "projects", "project"] },
  // Sekce pod dílu:
  //   { id: "10a-priklad-dokument", title: "Příklad: dokument ze Skillu", page: "10a", anchor: "#priklad-dokument",
  //     tags: ["dokument", "word", "skill"] },
];
