// engines/risk/riskScore.js

export function calculateRiskScore(f) {
    let score = 0;

    // Current danger
    score += (f.liquidity < 0) ? 20 : 0;
    score += (f.leverage > 4) ? 20 : 0;
    score += (f.profitability < 0) ? 15 : 0;
    score += (f.cashflow < 0) ? 15 : 0;

    // Predictive danger
    score += (f.predictive_cashflow < 0) ? 25 : 0;
    score += (f.predictive_volatility > 50) ? 20 : 0;

    // Trend acceleration danger
    score += (f.liquidity_slope < 0) ? 10 : 0;
    score += (f.leverage_slope > 0) ? 10 : 0;
    score += (f.profitability_slope < 0) ? 10 : 0;
    score += (f.cashflow_slope < 0) ? 10 : 0;
    score += (f.drag_slope > 0) ? 15 : 0;

    // Structural drag
    score += (f.drag > 100) ? 20 : 0;

    return Math.min(score, 100);
}