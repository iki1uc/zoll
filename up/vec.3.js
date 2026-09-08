// vec3.js — 3D‑Vektoren für IKI1UC · STAGE · RESPO.ai

export class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Betrag (Länge)
    magnitude() {
        return Math.sqrt(
            this.x*this.x +
            this.y*this.y +
            this.z*this.z
        );
    }

    // Addition
    add(v) {
        return new Vec3(
            this.x + v.x,
            this.y + v.y,
            this.z + v.z
        );
    }

    // Subtraktion
    sub(v) {
        return new Vec3(
            this.x - v.x,
            this.y - v.y,
            this.z - v.z
        );
    }

    // Skalar-Multiplikation
    scale(s) {
        return new Vec3(
            this.x * s,
            this.y * s,
            this.z * s
        );
    }

    // Komplexe Darstellung (Real + Imaginär)
    toComplex() {
        return `${this.x} + ${this.y}i + ${this.z}j`;
    }

    // Ausgabe
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}

// Beispiel-Vektoren (3→9→81 kompatibel)
export const VEC3_CORE = {
    HY:  new Vec3(3, 9, 81),
    PE:  new Vec3(9, 81, 756),
    PER: new Vec3(3, 9, 756),
    TMP: new Vec3(27, 81, 3)
};
