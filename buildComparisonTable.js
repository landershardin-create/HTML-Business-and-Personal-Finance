// engines/comparative/buildComparisonTable.js

import { normalizeComparativeValue } from "./normalizeComparative.js";

export function buildComparisonTable(risk_map, opportunity_map, priority_map, drag_map) {
    const table = {};

    Object.keys(risk_map).forEach(entity_id => {
        table[entity_id] = {
            risk: normalizeComparativeValue(risk_map[entity_id]),
            opportunity: normalizeComparativeValue(opportunity_map[entity_id]),
            priority: normalizeComparativeValue(priority_map[entity_id]),
            drag: normalizeComparativeValue(drag_map[entity_id])
        };
    });

    return table;
}