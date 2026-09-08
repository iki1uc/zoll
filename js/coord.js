// ================================================================
//  coord.js — Zeile/Spalte (Mesh-Index) zu Achsen-Koordinaten.
//  Trennt die "logische" Mesh-Adresse (row, col) von der
//  "physischen" Position im Raum (x, z). Achsenorientiert wie
//  gefordert: Spalte -> X, Zeile -> Z.
// ================================================================

export function rowColToAxis(row, col, spacing = 26, cols = 9, rows = 9) {
  return {
    x: (col - (cols - 1) / 2) * spacing,
    z: (row - (rows - 1) / 2) * spacing,
  };
}
