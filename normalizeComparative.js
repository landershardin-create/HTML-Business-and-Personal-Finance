// engines/comparative/normalizeComparative.js

export function normalizeComparativeValue(value) {
    return Math.min(Math.max(value, 0), 100);
}