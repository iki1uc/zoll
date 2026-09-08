// ================================================================
//  modules/respo/respo.js (Gruppe 4: RESPO-System)
//  81 Slots (9×9). Jeder Slot nähert sich per Federkraft (NC_kraft)
//  seinem Zielwert an; Score = 1 - Abweichung von "truth" (0).
//  Das ist dieselbe, jetzt sauber modularisierte Logik wie in den
//  vorherigen ATOM-/Dreieck-Dateien — Ursache (targetValue) →
//  Wirkung (value nähert sich an) → Score.
// ================================================================
import { springForce, clamp } from './NC_kraft.js';
import { rowColToAxis } from './coord.js';

export function createMesh(cols = 9, rows = 9) {
  const slots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const v = Math.sin(idx * 0.2 + 0.5);
      const axis = rowColToAxis(r, c);
      slots.push({ row: r, col: c, x: axis.x, z: axis.z, value: v, targetValue: v, truth: 0, score: 1 });
    }
  }
  return slots;
}

// Ein Simulationsschritt: gibt den Ø-Score aller Slots zurück
export function stepMesh(slots, stiffness = 0.05) {
  let sum = 0;
  for (const s of slots) {
    s.value += springForce(s.value, s.targetValue, stiffness);
    const deviation = Math.abs(s.value - s.truth);
    s.score = clamp(1 - Math.min(deviation, 1), 0, 1);
    sum += s.score;
  }
  return sum / slots.length;
}

// Referenzkurve anlegen (entspricht dem früheren "FIT")
export function fitToReference(slots, time = 0) {
  slots.forEach((s, i) => { s.targetValue = Math.sin(i * 0.2 + time * 0.0003) * 0.9; });
}
