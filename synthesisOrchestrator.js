// orchestrators/synthesisOrchestrator.js

import { entityHistory } from "../storage/entityHistory.js";
import { buildEntitySnapshot } from "../engines/history/buildEntitySnapshot.js";

import { buildPriorityMap } from "../engines/priority/buildPriorityMap.js";
import { rankPriority } from "../engines/priority/rankPriority.js";

unified.priority_map = buildPriorityMap(
    enriched,
    unified.risk_map,
    unified.opportunity_map,
    unified.drag_map,
    unified.entity_trends,
    unified.predictive_map
);

unified.priority = rankPriority(unified.priority_map);
export function updateUnifiedFinancialTruth(entities) {
    const enriched = entities.map(e => ({
        ...e,
        predictive: buildPredictiveProfile(e)
    }));

    const unified = unifiedFinancialState(enriched);

    unified.drag_map = buildDragMap(enriched);
    unified.entity_trends = buildEntityTrendProfiles(enriched);
    unified.predictive_map = buildPredictiveMap(enriched);

    // Store entity history snapshots
    enriched.forEach(e => {
        const snapshot = buildEntitySnapshot(e);
        entityHistory.addSnapshot(e.entity_id, snapshot);
    });

    unified.entity_history = entityHistory.map;

    return unified;
}