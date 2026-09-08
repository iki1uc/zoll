// ================================================================
//  respo-master.js — der "Stand-der-Dinge"-Kern (Master-Respo)
//
//  Technisch ist das:
//  1) Ein BroadcastChannel, über den jede offene Seite (STAGE,
//     BRAIN, künftige Module) ihren eigenen Score meldet — echte
//     Live-Kommunikation zwischen Browser-Tabs derselben Origin,
//     keine Fantasie-Vernetzung.
//  2) Ein localStorage-Fallback, damit eine Seite, die gerade erst
//     geöffnet wird, sofort den letzten bekannten Stand aller
//     anderen Module sieht (nicht nur zukünftige Broadcasts).
//
//  Jede Seite, die "mitmachen" soll, importiert dieses eine File
//  und ruft report(name, score) auf (oder autoReport für
//  automatisches, periodisches Melden).
// ================================================================

const CHANNEL_NAME = 'mainboard-respo-master';
const STORAGE_KEY  = 'mainboard.respoMaster.state';

let channel = null;
try { channel = new BroadcastChannel(CHANNEL_NAME); }
catch (e) { channel = null; /* Browser ohne BroadcastChannel: läuft trotzdem, nur ohne Live-Push */ }

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch (e) { return {}; }
}
function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Ein Modul meldet seinen aktuellen Score (0..1) unter seinem Namen.
export function report(name, score) {
  const state = loadState();
  state[name] = { score, ts: Date.now() };
  saveState(state);
  if (channel) channel.postMessage({ type: 'update', name, score, ts: state[name].ts });
}

// Gesamtstand: Durchschnitt aller gemeldeten Module + Einzelwerte.
export function getGlobalStatus() {
  const state = loadState();
  const entries = Object.entries(state);
  if (entries.length === 0) return { avg: null, modules: {} };
  const avg = entries.reduce((sum, [, v]) => sum + v.score, 0) / entries.length;
  return { avg, modules: state };
}

// Live-Updates von anderen Tabs/Seiten abonnieren.
// Gibt eine Funktion zurück, mit der man sich wieder abmeldet.
export function onUpdate(callback) {
  if (!channel) return () => {};
  const handler = (e) => callback(e.data);
  channel.addEventListener('message', handler);
  return () => channel.removeEventListener('message', handler);
}

// Bequemlichkeit: eine Quelle automatisch alle paar Sekunden melden lassen.
// getScoreFn ist eine Funktion, die aktuell den Score (0..1) liefert.
export function autoReport(name, getScoreFn, intervalMs = 3000) {
  report(name, getScoreFn());
  return setInterval(() => report(name, getScoreFn()), intervalMs);
}
