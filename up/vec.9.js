export const VEC_9x9x9 = {
    height: 9,
    width: 9,
    depth: 9,
    slots: 9 * 9 * 9,   // 729
    matrix: []
};

// Matrix erzeugen
for(let h=0; h<9; h++){
    for(let w=0; w<9; w++){
        for(let d=0; d<9; d++){
            VEC_9x9x9.matrix.push({ h, w, d });
        }
    }
}
