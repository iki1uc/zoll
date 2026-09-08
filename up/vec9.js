// vec9.js — 9D‑Vektoren mit exakt 729 Slots (9×9×9)

export class Vec9 {
    constructor(a1,a2,a3,a4,a5,a6,a7,a8,a9) {
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.a4 = a4;
        this.a5 = a5;
        this.a6 = a6;
        this.a7 = a7;
        this.a8 = a8;
        this.a9 = a9;
    }

    toString() {
        return `(${this.a1}, ${this.a2}, ${this.a3}, ${this.a4}, ${this.a5}, ${this.a6}, ${this.a7}, ${this.a8}, ${this.a9})`;
    }
}

// 9×9×9 = 729 Slots erzeugen
export const VEC9_729 = [];

for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
        for (let z = 0; z < 9; z++) {

            // 9 Achsen generieren
            const v = new Vec9(
                x,          // Achse 1
                y,          // Achse 2
                z,          // Achse 3
                x + y,      // Achse 4
                y + z,      // Achse 5
                x + z,      // Achse 6
                x * y,      // Achse 7
                y * z,      // Achse 8
                x * z       // Achse 9
            );

            VEC9_729.push(v);
        }
    }
}
