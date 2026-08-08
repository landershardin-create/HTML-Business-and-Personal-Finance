// engines/opportunity/opportunityFactors.js

export function extractOpportunityFactors(entity, trends, predictive, drag) {
    return {
        profitability: entity.profitability_strength,
        cashflow: entity.cashflow_stability,

        // Trend acceleration
        profitability_slope: trends.profitability.slope,
        cashflow_slope: trends.cashflow.slope,
        drag_slope: trends.drag.slope,

        // Predictive improvement
        predictive_cashflow: predictive.predictive_cashflow,
        predictability_score: predictive.predictability_score,

        // Drag reduction potential
        drag
    };
}