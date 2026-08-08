// engines/alerts/dragAlerts.js

export function buildDragAlerts(entity_id, dragMap) {
    const drag = dragMap[entity_id];
    const alerts = [];

    if (drag > 100)
        alerts.push("Entity drag dangerously high");

    return alerts;
}