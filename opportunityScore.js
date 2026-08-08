// engines/opportunity/opportunityScore.js

export function calculateOpportunityScore(f) {
    let score = 0;

    // Current strengths
    score += (f.profitability > 0) ? 20 : 0;
    score += (f.cashflow > 0) ? 20 : 0;

    // Trend improvement
    score += (f.profitability_slope > 0) ? 15 : 0;
    score += (f.cashflow_slope > 0) ? 15 : 0;

    // Predictive improvement
    score += (f.predictive_cashflow > 0) ? 20 : 0;
    score += (f.predictability_score > 0) ? 20 : 0;

    // Drag reduction potential
    score += (f.drag < 50) ? 10 : 0;
    score += (f.drag_slope < 0) ? 10 : 0;

    return Math.min(score, 100);
}