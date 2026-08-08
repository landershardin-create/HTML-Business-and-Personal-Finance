// engines/alerts/predictiveAlerts.js

export function buildPredictiveAlerts(predictive) {
    const alerts = [];

    if (predictive.predictive_cashflow < 0)
        alerts.push("Future cash-flow predicted negative");

    if (predictive.predictive_volatility > 50)
        alerts.push("Predictive volatility dangerously high");

    if (predictive.predictability_score < 0)
        alerts.push("Predictability score indicates future instability");

    return alerts;
}