// ================================================================
//  respo-master.js — INDUSTRIE-6.0 / RUN3 / RUN21 / WORLD-HUB
// ================================================================

const CHANNEL_NAME = 'mainboard-respo-master';
const STORAGE_KEY  = 'mainboard.respoMaster.state';
const TTL          = 12000;     // Module sterben nach 12s Inaktivität
const DEBOUNCE_MS  = 80;        // Broadcast-Debounce
const SENDER_ID    = crypto.randomUUID();  // eindeutige Tab-ID

let channel = null;
try { channel = new BroadcastChannel(CHANNEL_NAME); }
catch { channel = null; }

// ---------------------------------------------------------------
// Speicher laden/sichern
// ---------------------------------------------------------------
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch {}
}

// ---------------------------------------------------------------
// Broadcast-Debounce + Duplicate-Filter
// ---------------------------------------------------------------
let lastBroadcast = 0;
const seen = new Set();

function safeBroadcast(msg) {
  const now = Date.now();
  if (now - lastBroadcast < DEBOUNCE_MS) return;
  lastBroadcast = now;

  const key = msg.name + ':' + msg.version;
  if (seen.has(key)) return;
  seen.add(key);

  if (channel) channel.postMessage(msg);
}

// ---------------------------------------------------------------
// REPORT — Module melden echte Systemwerte
// ---------------------------------------------------------------
export function report(name, payload) {
  const version = Date.now();

  const state = loadState();
  state[name] = { payload, ts: version };
  saveState(state);

  safeBroadcast({
    type: 'update',
    name,
    payload,
    version,
    sender: SENDER_ID
  });
}

// ---------------------------------------------------------------
// GLOBALER STATUS — mit TTL-Filter
// ---------------------------------------------------------------
export function getGlobalStatus() {
  const now = Date.now();
  const state = loadState();
  const filtered = {};

  for (const [name, entry] of Object.entries(state)) {
    if (now - entry.ts <= TTL) filtered[name] = entry;
  }

  return { modules: filtered };
}

// ---------------------------------------------------------------
// Live-Updates abonnieren
// ---------------------------------------------------------------
export function onUpdate(callback) {
  if (!channel) return () => {};

  const handler = (e) => {
    const data = e.data;
    if (!data || data.sender === SENDER_ID) return; // kein Echo
    callback(data);
  };

  channel.addEventListener('message', handler);
  return () => channel.removeEventListener('message', handler);
}

// ---------------------------------------------------------------
// Automatisches Melden
// ---------------------------------------------------------------
export function autoReport(name, getPayloadFn, intervalMs = 3000) {
  report(name, getPayloadFn());
  return setInterval(() => report(name, getPayloadFn()), intervalMs);
}
