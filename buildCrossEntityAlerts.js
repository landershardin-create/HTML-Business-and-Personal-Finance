// engines/comparative/buildCrossEntityAlerts.js

export function buildCrossEntityAlerts(outliers, clusters) {
    const alerts = [];

    if (outliers.high_risk.length > 0)
        alerts.push(`High-risk entities detected: ${outliers.high_risk.join(", ")}`);

    if (outliers.high_drag.length > 0)
        alerts.push(`High-drag entities detected: ${outliers.high_drag.join(", ")}`);

    if (clusters.volatile.length > 0)
        alerts.push(`Volatile cluster detected: ${clusters.volatile.join(", ")}`);

    if (clusters.rising.length > 0)
        alerts.push(`Rising opportunity cluster: ${clusters.rising.join(", ")}`);

    return alerts;
}