// engines/risk/riskFactors.js

export function extractRiskFactors(entity, trends, predictive, drag) {
    return {
        liquidity: entity.liquidity,
        leverage: entity.leverage,
        profitability: entity.profitability_strength,
        cashflow: entity.cashflow_stability,

        // Predictive
        predictive_cashflow: predictive.predictive_cashflow,
        predictive_volatility: predictive.predictive_volatility,

        // Trend acceleration
        liquidity_slope: trends.liquidity.slope,
        leverage_slope: trends.leverage.slope,
        profitability_slope: trends.profitability.slope,
        cashflow_slope: trends.cashflow.slope,
        drag_slope: trends.drag.slope,

        // Drag
        drag
    };
}