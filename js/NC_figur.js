// ================================================================
//  NC_figur.js (Gruppe 1: NC-Suite — Figurlogik)
//  Erzeugt die geometrischen Grundformen, die im Projekt vorkommen:
//  die 3 Screen-Positionen bei 0°/120°/240°, und optional eine
//  Diamant-Punktwolke. Reine, nachvollziehbare Geometrie.
// ================================================================
import { Vec3 } from './vec.js';

export const SCREEN_BASE_ANGLES = [0, 120, 240];

export function triangleScreenPositions(radius = 150) {
  return SCREEN_BASE_ANGLES.map(angle => ({ angle, pos: Vec3.fromAngleRadius(angle, radius) }));
}

// Diamant nur als einfache 6-Punkt-Bipyramide (kein "CAD-1/1000mm"-Anspruch,
// sondern parametrisierbare Form: size in beliebiger Einheit deiner Wahl)
export function diamondPoints(size = 1) {
  return {
    top:    new Vec3(0,  size, 0),
    bottom: new Vec3(0, -size, 0),
    right:  new Vec3( size * 0.7, 0, 0),
    left:   new Vec3(-size * 0.7, 0, 0),
    front:  new Vec3(0, 0,  size * 0.7),
    back:   new Vec3(0, 0, -size * 0.7),
  };
}
