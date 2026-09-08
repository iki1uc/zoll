// ================================================================
//  hdf/resolver.js (Gruppe 3: HDF-ROM-System)
//  "ROM" = ein eigener localStorage-Namensraum pro Buchstabe
//  (d/e/i/n/o/r/s/u/w). romWrite/romRead speichern und lesen
//  echte Werte, resolve() sucht einen Befehl über alle ROMs.
//  Das ist ein reales, wenn auch simples Speicher-/Lookup-System —
//  kein "Gedächtnis" im mystischen Sinn, sondern Key-Value-Storage.
// ================================================================

export const ROMS = ['d','e','i','n','o','r','s','u','w'];

function storeKey(rom) { return `hdf.${rom}`; }

export function romWrite(rom, key, value) {
  if (!ROMS.includes(rom)) throw new Error(`unbekanntes ROM: ${rom}`);
  const data = JSON.parse(localStorage.getItem(storeKey(rom)) || '{}');
  data[key] = value;
  localStorage.setItem(storeKey(rom), JSON.stringify(data));
}

export function romRead(rom, key) {
  const data = JSON.parse(localStorage.getItem(storeKey(rom)) || '{}');
  return data[key];
}

// Sucht einen Befehl/Key über alle ROMs hinweg (einfacher Resolver)
export function resolve(command) {
  for (const rom of ROMS) {
    const val = romRead(rom, command);
    if (val !== undefined) return { rom, value: val };
  }
  return null;
}

// Beispielhafte Vorbelegung, damit RESOLVE sofort etwas findet
export function seedDefaults() {
  romWrite('s', '#SLIDE', 'SLIDE.hdf');
  romWrite('r', '#HDFRESPO', 'HDFRESPO.hdf');
  romWrite('i', '#ID', 'ID.hdf');
}
