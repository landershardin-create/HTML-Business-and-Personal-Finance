// alerts/thresholds.js

export const thresholds = {
    liquidity_low: 0,              // below zero = danger
    leverage_high: 2.5,            // liabilities > 2.5x equity
    profitability_low: 0,          // negative profitability
    cashflow_unstable: -500,       // predictive score below -500
    volatility_high: 1000,         // high trend volatility
    drag_high: 0.5                 // drag index above 0.5
};