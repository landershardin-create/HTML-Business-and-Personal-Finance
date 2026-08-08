// engines/priority/calcPriorityScore.js

import { normalizePriorityValue } from "./normalizePriority.js";

export function calculatePriorityScore(f) {
    const riskScore = normalizePriorityValue(f.risk, "risk");
    const opportunityScore = normalizePriorityValue(f.opportunity, "opportunity");
    const dragScore = normalizePriorityValue(f.drag, "drag");

    const trendDanger =
        normalizePriorityValue(f.liquidity_slope, "trend") +
        normalizePriorityValue(f.leverage_slope, "trend") +
        normalizePriorityValue(f.profitability_slope, "trend") +
        normalizePriorityValue(f.cashflow_slope, "trend") +
        normalizePriorityValue(f.drag_slope, "trend");

    const predictiveDanger =
        normalizePriorityValue(f.predictive_cashflow, "predictive") +
        normalizePriorityValue(f.predictive_volatility, "predictive") +
        normalizePriorityValue(f.predictability_score, "predictive");

    // Weighted priority score
    const priority =
        (riskScore * 0.45) +
        (opportunityScore * 0.25) +
        (dragScore * 0.15) +
        (trendDanger * 0.10) +
        (predictiveDanger * 0.05);

    return Math.min(priority, 100);
}