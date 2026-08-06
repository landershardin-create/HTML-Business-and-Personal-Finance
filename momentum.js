// engines/trends/momentum.js

export function computeMomentum(history) {
    if (history.length < 3) return 0;

    const diffs = history.slice(1).map((h, i) => h.value - history[i].value);
    const momentum = diffs.reduce((a, b) => a + b, 0) / diffs.length;

    return momentum; // positive = accelerating, negative = slowing
}