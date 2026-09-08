// ================================================================
//  respo-master.js — REORG-Version für WORLD-HUB / KOOP / NC-MOVE
// ================================================================

const CHANNEL_NAME = 'mainboard-respo-master';
const STORAGE_KEY  = 'mainboard.respoMaster.state';

let channel = null;
try { channel = new BroadcastChannel(CHANNEL_NAME); }
catch (e) { channel = null; }

// --- Speicher laden/sichern ---
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch (e) { return {}; }
}
function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// --- REORG: Module melden echte Systemwerte ---
export function report(name, payload) {
  const state = loadState();
  state[name] = { payload, ts: Date.now() };
  saveState(state);

  if (channel) {
    channel.postMessage({
      type: 'update',
      name,
      payload,
      ts: state[name].ts
    });
  }
}

// --- Globaler Zustand aller Module ---
export function getGlobalStatus() {
  const state = loadState();
  return { modules: state };
}

// --- Live-Updates abonnieren ---
export function onUpdate(callback) {
  if (!channel) return () => {};
  const handler = (e) => callback(e.data);
  channel.addEventListener('message', handler);
  return () => channel.removeEventListener('message', handler);
}

// --- Automatisches Melden ---
export function autoReport(name, getPayloadFn, intervalMs = 3000) {
  report(name, getPayloadFn());
  return setInterval(() => report(name, getPayloadFn()), intervalMs);
}
