// engines/trends/slope.js

export function computeSlope(history) {
    if (history.length < 2) return 0;

    const first = history[0].value;
    const last = history[history.length - 1].value;

    return last - first; // positive = improving, negative = declining
}