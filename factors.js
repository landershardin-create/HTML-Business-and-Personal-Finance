// risk/factors.js

export const riskFactors = {
    liquidity_weight: 0.30,
    leverage_weight: 0.25,
    profitability_weight: 0.20,
    cashflow_weight: 0.15,
    volatility_weight: 0.10
};

// opportunity/factors.js
export const opportunityFactors = {
    profitability_weight: 0.30,
    liquidity_weight: 0.25,
    leverage_weight: 0.20,
    cashflow_weight: 0.15,
    volatility_weight: 0.10
};

// priority/factors.js

export const priorityFactors = {
    risk_weight: 0.45,
    opportunity_weight: 0.25,
    drag_weight: 0.20,
    trend_weight: 0.10
};