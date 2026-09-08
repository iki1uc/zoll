// ================================================================
//  VEC-SYSTEM (Gruppe 2) — echte 3D-Vektor-Mathematik
//  Kein Platzhalter: add/sub/scale/dot/length/normalize sind
//  Standard-Vektorrechnung, hier real implementiert.
// ================================================================

export class Vec3 {
  constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }

  add(v) { return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z); }
  sub(v) { return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z); }
  scale(s) { return new Vec3(this.x * s, this.y * s, this.z * s); }
  dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
  length() { return Math.sqrt(this.dot(this)); }
  normalize() { const l = this.length() || 1; return this.scale(1 / l); }
  lerp(v, t) { return this.add(v.sub(this).scale(t)); }

  // Punkt auf einem Kreis um die Y-Achse (für 120°-Screens, Orbit-Positionen)
  static fromAngleRadius(angleDeg, radius, y = 0) {
    const rad = angleDeg * Math.PI / 180;
    return new Vec3(Math.sin(rad) * radius, y, Math.cos(rad) * radius);
  }
}
