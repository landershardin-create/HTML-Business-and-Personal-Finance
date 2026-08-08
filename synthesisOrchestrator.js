// orchestrators/synthesisOrchestrator.js

import { trends } from "../storage/trends.js";
import { buildDragMap } from "../engines/drag/buildDragMap.js";

export function updateUnifiedFinancialTruth(entities) {
    const unified = unifiedFinancialState(entities);

    // Build drag map
    const dragMap = buildDragMap(unified.entities);
    unified.drag_map = dragMap;

    // Store drag trends
    unified.entities.forEach(e => {
        trends.add(e.entity_id, "drag", dragMap[e.entity_id]);
    });

    return unified;
}