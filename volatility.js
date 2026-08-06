// engines/cashflow/volatility.js

export function computeVolatility(entity) {
    const history = entity.history.cashflow || [];

    if (history.length < 2) return 0;

    const diffs = history.slice(1).map((v, i) => Math.abs(v - history[i]));
    const avgVolatility = diffs.reduce((a, b) => a + b, 0) / diffs.length;

    return avgVolatility;
}