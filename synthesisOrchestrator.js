// orchestrators/synthesisOrchestrator.js

import { entityHistory } from "../storage/entityHistory.js";
import { buildEntitySnapshot } from "../engines/history/buildEntitySnapshot.js";

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