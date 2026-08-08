// engines/alerts/trendAlerts.js

export function buildTrendAlerts(trendProfile) {
    const alerts = [];

    if (trendProfile.liquidity.slope < 0) alerts.push("Liquidity trending downward");
    if (trendProfile.leverage.slope > 0) alerts.push("Leverage trending upward");
    if (trendProfile.profitability.slope < 0) alerts.push("Profitability trending downward");
    if (trendProfile.cashflow.slope < 0) alerts.push("Cash-flow trending downward");

    if (trendProfile.drag.slope > 0) alerts.push("Drag increasing");

    return alerts;
}