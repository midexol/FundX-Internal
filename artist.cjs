#!/usr/bin/env node

/**
 * 🎭 CODE ARTIST v2 — Temporal Mutation Engine
 * ─────────────────────────────────────────────
 * Mutates your codebase every 45s with weighted intelligence.
 * Remembers what it touched. Restores randomly. Tells the story.
 *
 * Usage:  node artist.js ./src
 *         node artist.js ./src 30000     (custom interval ms)
 */

'use strict';
const fs   = require('fs');
const path = require('path');

// ══════════════════════════════════════════════════════
//  CONFIG
// ══════════════════════════════════════════════════════
const TARGET_DIR            = process.argv[2] || './src';
const MUTATION_INTERVAL_MS  = parseInt(process.argv[3], 10) || 45_000;
const MIN_RESTORE           = 3;
const MAX_RESTORE           = 9;
const RESTORE_SUSPENSE_MS   = () => rand(4_000, 18_000);
const SKIP_DIRS             = new Set(['node_modules', '.git', 'dist', 'build', 'coverage', '.next', '.cache']);
const VALID_EXT             = /\.(js|jsx|ts|tsx)$/;
const KEYWORDS              = new Set([
  'const','let','var','function','return','import','export','default',
  'if','else','for','while','class','new','this','super','true','false',
  'null','undefined','async','await','try','catch','throw','typeof','instanceof',
]);

// ══════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════
const archive     = {};
const mutationLog = [];
let mutationCount    = 0;
let restoreThreshold = 0;
let restorePending   = false;
let currentState     = 'ORDER';

const memory = {
  recentFiles  : [],
  ignoredBias  : {},
  actionHistory: [],
};

// ══════════════════════════════════════════════════════
//  UTILS
// ══════════════════════════════════════════════════════
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pad(n, w = 2) { return String(n).padStart(w, '0'); }

const startTime = Date.now();

function elapsed() {
  const s = Math.floor((Date.now() - startTime) / 1000);
  return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
}

function log(msg, type = 'INFO') {
  const icons = { CHAOS: '🔴', ORDER: '🟢', INFO: '⚙️ ', WARN: '⚠️ ', MUSE: '🎭' };
  const ts = new Date().toLocaleTimeString('en-US', { hour12: false });
  console.log(`[${ts} +${elapsed()}] ${icons[type] || '  '} [${type.padEnd(5)}]  ${msg}`);
}

function statusBar() {
  const fill  = Math.min(mutationCount, restoreThreshold);
  const empty = restoreThreshold - fill;
  const pct   = Math.round((fill / restoreThreshold) * 100);
  const bar   = '█'.repeat(fill) + '░'.repeat(empty);
  const label = currentState === 'CHAOS' ? '🔴 CHAOS' : '🟢 ORDER';
  console.log(`           ${label}  [${bar}] ${pct}%  (${mutationCount}/${restoreThreshold})`);
}

// ══════════════════════════════════════════════════════
//  FILE DISCOVERY & ARCHIVE
// ══════════════════════════════════════════════════════
function getAllFiles(dir) {
  let results = [];
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return results; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && !SKIP_DIRS.has(e.name))  results = results.concat(getAllFiles(full));
    else if (e.isFile() && VALID_EXT.test(e.name))   results.push(full);
  }
  return results;
}

function archiveFiles() {
  const files = getAllFiles(TARGET_DIR);
  if (!files.length) {
    console.error(`❌  No JS/TS files found in: ${path.resolve(TARGET_DIR)}`);
    process.exit(1);
  }
  files.forEach(f => {
    archive[f]            = fs.readFileSync(f, 'utf8');
    memory.ignoredBias[f] = 1;
  });
  log(`Archived ${files.length} files  →  ${path.resolve(TARGET_DIR)}`, 'INFO');
}

// ══════════════════════════════════════════════════════
//  WEIGHTED FILE PICKER
// ══════════════════════════════════════════════════════
function pickFile() {
  const files  = Object.keys(archive);
  const recent = new Set(memory.recentFiles.slice(-2));
  const pool   = files.filter(f => !recent.has(f));
  const source = pool.length > 0 ? pool : files;

  const total = source.reduce((s, f) => s + (memory.ignoredBias[f] || 1), 0);
  let r = Math.random() * total;
  for (const f of source) {
    r -= (memory.ignoredBias[f] || 1);
    if (r <= 0) return f;
  }
  return source[source.length - 1];
}

function updateMemory(file) {
  memory.recentFiles.push(file);
  if (memory.recentFiles.length > 5) memory.recentFiles.shift();
  memory.ignoredBias[file] = 0;
  Object.keys(memory.ignoredBias).forEach(f => {
    if (f !== file) memory.ignoredBias[f] = (memory.ignoredBias[f] || 0) + 1;
  });
}

// ══════════════════════════════════════════════════════
//  MUTATIONS  (all syntax-safe)
// ══════════════════════════════════════════════════════

function shuffleImports(content) {
  const lines = content.split('\n');
  const idxs  = lines.map((l, i) => i).filter(i => /^import\s/.test(lines[i].trim()));
  if (idxs.length < 2) return null;
  const orig = idxs.map(i => lines[i]);
  const shuf = shuffle(orig);
  if (shuf.join() === orig.join()) return null;
  const out  = [...lines];
  idxs.forEach((li, pos) => { out[li] = shuf[pos]; });
  return out.join('\n');
}

function shuffleFunctions(content) {
  const FUNC   = /^(export\s+)?(default\s+)?(async\s+)?function\s+\w+|^(export\s+)?const\s+\w+\s*=\s*(async\s*)?\(/m;
  const blocks = content.split(/\n{2,}/);
  if (blocks.length < 3) return null;
  const fidxs  = blocks.map((b, i) => i).filter(i => FUNC.test(blocks[i].trim()));
  if (fidxs.length < 2) return null;
  const orig   = fidxs.map(i => blocks[i]);
  const shuf   = shuffle(orig);
  if (shuf.join() === orig.join()) return null;
  const out    = [...blocks];
  fidxs.forEach((bi, pos) => { out[bi] = shuf[pos]; });
  return out.join('\n\n');
}

function renameVariable(content) {
  const matches = [...content.matchAll(/\b([a-z][a-zA-Z0-9]{2,14})\b/g)];
  const freq    = {};
  matches.forEach(m => { if (!KEYWORDS.has(m[1])) freq[m[1]] = (freq[m[1]] || 0) + 1; });
  const candidates = Object.entries(freq)
    .filter(([, c]) => c >= 2 && c <= 8)
    .map(([name]) => name);
  if (!candidates.length) return null;
  const pick   = candidates[rand(0, candidates.length - 1)];
  const result = content.replace(new RegExp(`\\b${pick}\\b`, 'g'), `${pick}_`);
  return result === content ? null : result;
}

// Reads from archive (not disk) — safe cross-file echo
function echoFragment(file, content) {
  const donors = Object.keys(archive).filter(f => f !== file);
  if (!donors.length) return null;
  const donor   = donors[rand(0, donors.length - 1)];
  const lines   = archive[donor].split('\n').filter(l => l.trim().length > 0);
  if (!lines.length) return null;
  const start   = rand(0, Math.max(0, lines.length - 6));
  const snippet = lines.slice(start, start + rand(2, 5))
                       .map(l => `// ${l}`)
                       .join('\n');
  const label   = path.relative('.', donor);
  return content + `\n\n// ⟳ echo · ${label}\n${snippet}`;
}

function annotate(content) {
  const lines = content.split('\n');
  if (lines.length < 5) return null;
  const pos   = rand(1, lines.length - 2);
  const notes = [
    '// ← the muse was here',
    '// ← structural drift',
    '// ← temporal anomaly',
    '// ← chaos fingerprint',
    '// ← echo residue',
  ];
  const out = [...lines];
  out.splice(pos, 0, notes[rand(0, notes.length - 1)]);
  return out.join('\n');
}

// Strategy table — [name, weight, fn(content, file)]
const STRATEGIES = [
  { name: 'shuffled imports',        weight: 25, fn: (c)    => shuffleImports(c)    },
  { name: 'shuffled function order', weight: 20, fn: (c)    => shuffleFunctions(c)  },
  { name: 'renamed variable',        weight: 25, fn: (c)    => renameVariable(c)    },
  { name: 'echo fragment',           weight: 15, fn: (c, f) => echoFragment(f, c)   },
  { name: 'chaos annotation',        weight: 15, fn: (c)    => annotate(c)          },
];

function pickStrategy(file) {
  // Continuity: if file was recently echoed into, prefer annotation next
  const lastAction = memory.actionHistory.slice(-5).find(a => a.file === file);
  const pool = STRATEGIES.map(s => ({
    ...s,
    weight: (lastAction?.strategy === 'echo fragment' && s.name === 'chaos annotation')
      ? s.weight * 3
      : s.weight,
  }));
  const total = pool.reduce((s, p) => s + p.weight, 0);
  let r = Math.random() * total;
  for (const s of pool) {
    r -= s.weight;
    if (r <= 0) return s;
  }
  return pool[pool.length - 1];
}

// ══════════════════════════════════════════════════════
//  MUTATION LOOP
// ══════════════════════════════════════════════════════
function mutate() {
  if (restorePending) return;

  const file     = pickFile();
  const content  = archive[file];
  const strategy = pickStrategy(file);
  const result   = strategy.fn(content, file);

  if (!result || result === content) {
    log(`skipped  ${path.relative('.', file)}  (no valid mutation)`, 'INFO');
    return;
  }

  fs.writeFileSync(file, result, 'utf8');
  mutationCount++;
  currentState = 'CHAOS';

  const entry = { file, strategy: strategy.name, n: mutationCount };
  mutationLog.push(entry);
  memory.actionHistory.push({ file, strategy: strategy.name });
  if (memory.actionHistory.length > 20) memory.actionHistory.shift();
  updateMemory(file);

  log(`mutation #${mutationCount}  →  ${path.relative('.', file)}  [${strategy.name}]`, 'CHAOS');
  statusBar();

  if (mutationCount >= restoreThreshold && !restorePending) {
    restorePending   = true;
    const delay      = RESTORE_SUSPENSE_MS();
    log(`Threshold reached — restoring in ${(delay / 1000).toFixed(1)}s …`, 'WARN');
    setTimeout(restore, delay);
  }
}

// ══════════════════════════════════════════════════════
//  RESTORE
// ══════════════════════════════════════════════════════
function restore(silent = false) {
  if (!silent) {
    console.log();
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'ORDER');
    log('RESTORING — returning to original state  🟢', 'ORDER');
  }

  let count = 0;
  for (const [file, content] of Object.entries(archive)) {
    try   { fs.writeFileSync(file, content, 'utf8'); count++; }
    catch (e) { log(`Failed: ${file} — ${e.message}`, 'WARN'); }
  }

  if (!silent && mutationLog.length) {
    log('─── Chaos Story ──────────────────────────', 'ORDER');
    mutationLog.forEach(e =>
      log(`  #${pad(e.n)}  ${path.relative('.', e.file).padEnd(42)} ${e.strategy}`, 'ORDER')
    );
  }

  mutationLog.length = 0;
  mutationCount      = 0;
  restorePending     = false;
  currentState       = 'ORDER';
  restoreThreshold   = rand(MIN_RESTORE, MAX_RESTORE);
  memory.recentFiles = [];

  if (!silent) {
    log(`Restored ${count} files ✅`, 'ORDER');
    log(`Next cycle restores after ${restoreThreshold} mutations`, 'ORDER');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'ORDER');
    console.log();
  }
}

// ══════════════════════════════════════════════════════
//  ENTRY
// ══════════════════════════════════════════════════════
function main() {
  console.log('\n🎭  CODE ARTIST  v2  — Temporal Mutation Engine');
  console.log('═══════════════════════════════════════════════');
  console.log(`  Target   : ${path.resolve(TARGET_DIR)}`);
  console.log(`  Interval : every ${MUTATION_INTERVAL_MS / 1000}s`);
  console.log(`  Restore  : after ${MIN_RESTORE}–${MAX_RESTORE} mutations (random + suspense delay)`);
  console.log('  Ctrl+C   : stop and restore immediately\n');

  if (!fs.existsSync(TARGET_DIR)) {
    console.error(`❌  Directory not found: ${TARGET_DIR}`);
    process.exit(1);
  }

  archiveFiles();
  restoreThreshold = rand(MIN_RESTORE, MAX_RESTORE);

  log(`First mutation in ${MUTATION_INTERVAL_MS / 1000}s. Standing by…`, 'MUSE');
  statusBar();
  console.log();

  process.on('SIGINT', () => {
    console.log('\n');
    log('Interrupt — restoring before exit…', 'WARN');
    restore(true);
    log('All files restored. Goodbye 🎭\n', 'ORDER');
    process.exit(0);
  });

  setInterval(mutate, MUTATION_INTERVAL_MS);
}

main();
