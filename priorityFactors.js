// engines/priority/priorityFactors.js

export function extractPriorityFactors(entity, risk, opportunity, drag, trends, predictive) {
    return {
        risk,
        opportunity,
        drag,

        // Trend danger
        liquidity_slope: trends.liquidity.slope,
        leverage_slope: trends.leverage.slope,
        profitability_slope: trends.profitability.slope,
        cashflow_slope: trends.cashflow.slope,
        drag_slope: trends.drag.slope,

        // Predictive danger
        predictive_cashflow: predictive.predictive_cashflow,
        predictive_volatility: predictive.predictive_volatility,
        predictability_score: predictive.predictability_score
    };
}