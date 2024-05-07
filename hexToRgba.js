function hexToRgba(st, format = "array") {
    if(st.startsWith("#"))
        st = st.slice(1);

    const len = st.length;                              // I don't know how JS works, I suspect this is recalculated
    const has_alpha = BigInt(!(len % 4));
    if(len % 3 && !has_alpha)
        throw new Error("invalid hex code");

    var val = BigInt("0x" + st);                        // Only parsing the string once is faster than slicing constantly

    const depth = BigInt(Math.ceil(len / 4) << 2);      // Depth will be multiple of 4 bits
    const mask = (1n << depth) - 1n;                    // Will mask bottom color
    const m = Number(mask);

    let A = (val & mask) | ((has_alpha ^ 1n) * mask);   // Alpha will be 100% if none specified
    let B = (val >>= (depth * has_alpha)) & mask;       // Only shift when there is alpha
    let G = (val >>= depth) & mask;                     // Always shift for green and blue (red is always first)
    let R = (val >> depth) & mask;                      // Val is no longer needed; no need to store new value

    // 4bit to 8bit depth
    const four_bit = BigInt(depth == 4n) << 2n;         // Will not shift if depth > 4
    B = Number(B | (B << four_bit));
    G = Number(G | (G << four_bit));
    R = Number(R | (R << four_bit));
    A = Number(A | (A << four_bit));

    switch(format) {
        case "object":
            return {R, G, B, A};

        case "percent":
            return [
                R / m,
                G / m,
                B / m,
                A / m
            ];

        case "css":
            return `rgb(${R} ${G} ${B} / ${(A / m * 100).toFixed(2)}%)`;

        default:
            return [R, G, B, A];
    }
}

module.exports = hexToRgba;
