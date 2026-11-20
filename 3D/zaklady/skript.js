// skript.js — sdílené skripty stránek průvodce (funkce pro konkrétní stránky)
// Každá část je označena ZAČÁTEK / KONEC a uvádí stránku, kam patří.
// Každá část běží jen tehdy, když na stránce najde své prvky; jiným stránkám nevadí.

// ===== ZAČÁTEK: 08b · III Adaptive PA — generátor hodnot testu a pracovní tabulka =====
document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const genBtn = $('apa-gen-btn');
  if (!genBtn) return;
  const KEY = 'apa-test-08b';
  const num = (v) => String(v || '').trim().replace(',', '.');
  const list = (v) => String(v || '').split(/[,;\s]+/).map((x) => x.trim()).filter(Boolean);
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const save = (d) => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) { /* nic */ } };

  const rowsBody = $('apa-rows');
  const outAcc = $('apa-out-acc');
  const outSpeeds = $('apa-out-speeds');
  const outZapis = $('apa-out-zapis');

  const currentValues = () => {
    const v = {};
    rowsBody.querySelectorAll('tr').forEach((tr) => {
      const k = tr.dataset.acc + '|' + tr.dataset.speed;
      v[k] = { flow: tr.querySelector('.apa-flow').value, pa: tr.querySelector('.apa-pa').value };
    });
    return v;
  };

  const updateOutput = () => {
    const lines = [];
    rowsBody.querySelectorAll('tr').forEach((tr) => {
      const pa = num(tr.querySelector('.apa-pa').value) || '?.???';
      const flow = num(tr.querySelector('.apa-flow').value) || '??.??';
      const line = pa + ' , ' + flow + ' , ' + tr.dataset.acc;
      tr.querySelector('.apa-row-out').textContent = line;
      lines.push(line);
    });
    outZapis.textContent = lines.join('\n');
    const d = load(); d.values = currentValues(); save(d);
  };

  const build = (accs, speeds, values) => {
    outAcc.textContent = accs.join(',');
    outSpeeds.textContent = speeds.join(',');
    rowsBody.innerHTML = '';
    let n = 0;
    accs.forEach((a) => speeds.forEach((s) => {
      n += 1;
      const v = (values || {})[a + '|' + s] || {};
      const tr = document.createElement('tr');
      tr.dataset.acc = a; tr.dataset.speed = s;
      tr.innerHTML = '<td>' + n + '</td><td>' + a + '</td><td>' + s + '</td>' +
        '<td><input class="apa-input apa-flow" type="text" inputmode="decimal" placeholder="??.??"></td>' +
        '<td><input class="apa-input apa-pa" type="text" inputmode="decimal" placeholder="?.???"></td>' +
        '<td class="apa-row-out"></td>';
      tr.querySelector('.apa-flow').value = v.flow || '';
      tr.querySelector('.apa-pa').value = v.pa || '';
      rowsBody.appendChild(tr);
    }));
    updateOutput();
  };

  const generate = () => {
    const accs = ['apa-acc-1', 'apa-acc-2', 'apa-acc-3'].map((id) => num($(id).value).replace(/\D/g, '')).filter(Boolean);
    const speeds = list($('apa-speeds').value).map((x) => x.replace(/\D/g, '')).filter(Boolean);
    if (!accs.length || !speeds.length) return;
    const d = load(); d.accs = accs; d.speeds = speeds; save(d);
    build(accs, speeds, currentValues());
  };

  genBtn.addEventListener('click', generate);
  rowsBody.addEventListener('input', updateOutput);
  $('apa-clear-btn').addEventListener('click', () => {
    rowsBody.querySelectorAll('input').forEach((i) => { i.value = ''; });
    updateOutput();
  });
  // Tisk jen pracovní tabulky: kopie tabulky se dočasně vloží přímo do <body>, zbytek stránky se při tisku skryje
  const cleanupPrint = () => {
    document.documentElement.classList.remove('apa-print');
    const old = document.getElementById('apa-print-area');
    if (old) old.remove();
  };
  window.addEventListener('afterprint', cleanupPrint);
  $('apa-print-btn').addEventListener('click', () => {
    cleanupPrint();
    const sheet = document.querySelector('.apa-sheet');
    const clone = sheet.cloneNode(true);
    const src = sheet.querySelectorAll('input');
    clone.querySelectorAll('input').forEach((inp, i) => { inp.setAttribute('value', src[i].value); });
    clone.querySelectorAll('.apa-btn').forEach((btn) => btn.remove());
    clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    const area = document.createElement('div');
    area.id = 'apa-print-area';
    area.appendChild(clone);
    document.body.appendChild(area);
    document.documentElement.classList.add('apa-print');
    window.print();
  });

  const d = load();
  if (d.accs && d.speeds) {
    ['apa-acc-1', 'apa-acc-2', 'apa-acc-3'].forEach((id, i) => { $(id).value = d.accs[i] || ''; });
    $('apa-speeds').value = d.speeds.join(',');
    build(d.accs, d.speeds, d.values);
  } else {
    build(['2000', '5000', '10000'], ['50', '100', '150', '200'], d.values);
  }
});
// ===== KONEC: 08b · III Adaptive PA — generátor hodnot testu a pracovní tabulka =====
