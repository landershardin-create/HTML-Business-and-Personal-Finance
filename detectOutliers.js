// engines/comparative/detectOutliers.js

export function detectOutliers(comparisonTable) {
    const outliers = {
        high_risk: [],
        high_priority: [],
        high_drag: [],
        high_opportunity: []
    };

    const values = Object.values(comparisonTable);

    const avgRisk = values.reduce((a, v) => a + v.risk, 0) / values.length;
    const avgPriority = values.reduce((a, v) => a + v.priority, 0) / values.length;
    const avgDrag = values.reduce((a, v) => a + v.drag, 0) / values.length;
    const avgOpportunity = values.reduce((a, v) => a + v.opportunity, 0) / values.length;

    Object.entries(comparisonTable).forEach(([entity_id, v]) => {
        if (v.risk > avgRisk * 1.5) outliers.high_risk.push(entity_id);
        if (v.priority > avgPriority * 1.5) outliers.high_priority.push(entity_id);
        if (v.drag > avgDrag * 1.5) outliers.high_drag.push(entity_id);
        if (v.opportunity > avgOpportunity * 1.5) outliers.high_opportunity.push(entity_id);
    });

    return outliers;
}