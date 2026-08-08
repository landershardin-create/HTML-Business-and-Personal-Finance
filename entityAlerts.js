// engines/alerts/entityAlerts.js

export function buildEntityAlerts(entity) {
    const alerts = [];

    if (entity.liquidity < 0) alerts.push("Liquidity below zero");
    if (entity.leverage > 4) alerts.push("Leverage dangerously high");
    if (entity.profitability_strength < 0) alerts.push("Profitability negative");
    if (entity.cashflow_stability < 0) alerts.push("Cash-flow instability detected");

    return alerts;
}