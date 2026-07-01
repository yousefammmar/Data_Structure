// shared.js — Syntax highlighting, code copy, theme, solution toggles
// Works on both local file:// and GitHub Pages

(function () {
  // ── THEME ──
  function initTheme() {
    const saved = localStorage.getItem('ds-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      const lbl = document.getElementById('themeLabel');
      if (lbl) lbl.textContent = 'LIGHT';
    }
  }

  window.toggleTheme = function () {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('ds-theme', isDark ? 'dark' : 'light');
    const lbl = document.getElementById('themeLabel');
    if (lbl) lbl.textContent = isDark ? 'LIGHT' : 'DARK';
  };

  // ── SYNTAX HIGHLIGHTING ──
  const CPP_KWS = ['int', 'void', 'return', 'class', 'public', 'private', 'protected',
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'default', 'new',
    'delete', 'using', 'namespace', 'const', 'static', 'bool', 'double', 'float',
    'char', 'string', 'true', 'false', 'nullptr', 'this', 'endl', 'cin', 'cout',
    'include', 'pragma', 'struct', 'operator', 'template', 'typename', 'virtual',
    'override', 'throw', 'try', 'catch', 'swap', 'nullptr'];

  window.hlCpp = function (code) {
    let html = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const tokens = [];
    const save = (regex, cls) => {
      html = html.replace(regex, (m) => {
        const id = `__T${tokens.length}__`;
        tokens.push(`<span class="${cls}">${m}</span>`);
        return id;
      });
    };

    save(/(\/\/[^\n]*)/g, 'cm');
    save(/(\/\*[\s\S]*?\*\/)/g, 'cm');
    save(/"([^"\\]*(\\.[^"\\]*)*)"/g, 'st');
    save(/'([^'\\]*(\\.[^'\\]*)*)'/g, 'st');
    save(/^(#\w+)/gm, 'pp');

    const re = new RegExp('\\b(' + CPP_KWS.join('|') + ')\\b', 'g');
    html = html.replace(re, '<span class="kw">$1</span>');
    html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="nu">$1</span>');
    html = html.replace(/\b(\w+)(?=\s*\()/g, '<span class="fn">$1</span>');

    for (let i = tokens.length - 1; i >= 0; i--) {
      html = html.replace(`__T${i}__`, tokens[i]);
    }
    return html;
  };

  // ── HIGHLIGHT ALL CODE BLOCKS ──
  function highlightAll() {
    document.querySelectorAll('pre.code-pre[data-code]').forEach(pre => {
      pre.innerHTML = hlCpp(pre.getAttribute('data-code'));
    });
  }

  // ── SOLUTION TOGGLES ──
  function initSolutionToggles() {
    document.querySelectorAll('.solution-toggle').forEach(btn => {
      const targetId = btn.getAttribute('data-target');
      const block = document.getElementById(targetId);
      if (!block) return;

      btn.addEventListener('click', () => {
        const isOpen = block.classList.toggle('visible');
        btn.classList.toggle('open', isOpen);
        btn.querySelector('.toggle-text').textContent = isOpen ? 'Hide Solution' : 'Show Solution';
      });
    });
  }

  // ── COPY BUTTONS ──
  function initCopyButtons() {
    document.querySelectorAll('.code-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        navigator.clipboard.writeText(code).then(() => {
          const old = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.color = '#e8c06e';
          btn.style.borderColor = '#e8c06e';
          setTimeout(() => {
            btn.textContent = old;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 1500);
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    highlightAll();
    initSolutionToggles();
    initCopyButtons();
  });
})();
