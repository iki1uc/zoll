// ================================================================
//  modules/dreieck/dreieck.js (Gruppe 5: Dreieck-Screen / Körper-
//  Geometrie / 3-Spiegel-120°)
//  Liefert den CSS-Transform-String für ein Screen bei einem
//  Basiswinkel (0/120/240) plus Zusatzrotation/Radius. Genau die
//  Logik aus der vorherigen "Dreieck-Raum"-Datei, hier als
//  wiederverwendbares Modul statt Inline-Skript.
// ================================================================
import { SCREEN_BASE_ANGLES } from './NC_figur.js';

export { SCREEN_BASE_ANGLES };

export function screenTransform({ baseAngle, extraRotY = 0, rotX = 0, radius = 150 }) {
  const totalAngle = baseAngle + extraRotY;
  return `rotateY(${totalAngle}deg) translateZ(${radius}px) rotateX(${rotX}deg)`;
}

export function createScreenStates(radius = 150) {
  const states = {};
  SCREEN_BASE_ANGLES.forEach((base, i) => {
    states[i] = { base, rotY: 0, rotX: 0, radius, locked: false };
  });
  return states;
}
