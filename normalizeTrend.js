// engines/trends/normalizeTrend.js

export function normalizeTrendSlope(slope, baseline) {
    if (baseline === 0) baseline = 1;

    // Normalize slope relative to baseline magnitude
    const normalized = slope / Math.abs(baseline);

    // Scale to 0–100 range
    return Math.min(Math.max(normalized * 100, -100), 100);
}