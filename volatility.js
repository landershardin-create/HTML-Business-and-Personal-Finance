// engines/cashflow/predictive_volatility.js

export function computeVolatility(entity) {
    const history = entity.history.cashflow || [];

    if (history.length < 2) return 0;

    const diffs = history.slice(1).map((v, i) => Math.abs(v - history[i]));
    const avgVolatility = diffs.reduce((a, b) => a + b, 0) / diffs.length;

    return avgVolatility;
 }
}
// engines/trends/trends_volatility.js

export function computeTrendVolatility(history) {
    if (history.length < 2) return 0;

    const diffs = history.slice(1).map((h, i) => Math.abs(h.value - history[i].value));
    const volatility = diffs.reduce((a, b) => a + b, 0) / diffs.length;

    return volatility; // higher = unstable
}