// ================================================================
//  NC_time.js (Gruppe 1: NC-Suite — Zeitlogik)
//  Eine echte Uhr für den Render-Loop: Delta-Zeit zwischen zwei
//  Frames, Gesamtlaufzeit. Das ist Standard-Animationstechnik,
//  hier sauber gekapselt statt in jeder Datei neu erfunden.
// ================================================================

export class Clock {
  constructor() {
    this.start = performance.now();
    this.last = this.start;
    this.elapsed = 0;
    this.delta = 0;
  }
  tick() {
    const now = performance.now();
    this.delta = now - this.last;
    this.last = now;
    this.elapsed = now - this.start;
    return this.delta;
  }
}
