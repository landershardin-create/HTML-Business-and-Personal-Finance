// alerts/alertEngine.js

import { thresholds } from "./thresholds.js";

export function evaluateAlerts(unified, trends) {
    const alerts = [];

    // Liquidity danger
    if (unified.totals.liquidity < thresholds.liquidity_low) {
        alerts.push({
            type: "liquidity",
            message: "Liquidity has fallen below safe levels."
        });
    }

    // Leverage danger
    if (unified.totals.leverage > thresholds.leverage_high) {
        alerts.push({
            type: "leverage",
            message: "Leverage risk is dangerously high."
        });
    }

    // Profitability danger
    if (unified.totals.profitability < thresholds.profitability_low) {
        alerts.push({
            type: "profitability",
            message: "Profitability has turned negative."
        });
    }

    // Predictive cash-flow danger
    if (unified.totals.cashflow < thresholds.cashflow_unstable) {
        alerts.push({
            type: "cashflow",
            message: "Predictive cash-flow indicates instability ahead."
        });
    }

    // Trend volatility danger
    if (trends.cashflow.volatility > thresholds.volatility_high) {
        alerts.push({
            type: "volatility",
            message: "Cash-flow volatility is rising sharply."
        });
    }

    return alerts;
}