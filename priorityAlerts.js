// engines/alerts/priorityAlerts.js

export function buildPriorityAlerts(priorityScore) {
    const alerts = [];

    if (priorityScore > 70)
        alerts.push("Entity requires immediate attention");

    return alerts;
}