// orchestrators/synthesisOrchestrator.js

import { buildAlerts } from "../engines/alerts/buildAlerts.js";

export function updateUnifiedFinancialTruth(entities) {
    const enriched = entities.map(e => ({
        ...e,
        predictive: buildPredictiveProfile(e)
    }));

    const unified = unifiedFinancialState(enriched);

    unified.drag_map = buildDragMap(enriched);
    unified.entity_trends = buildEntityTrendProfiles(enriched);

    unified.alerts = {};

    enriched.forEach(e => {
        unified.alerts[e.entity_id] = buildAlerts(
            e,
            unified.entity_trends[e.entity_id],
            e.predictive,
            unified.drag_map,
            unified.priority?.ranked?.find(p => p.entity_id === e.entity_id)?.priority || 0
        );
    });

    return unified;
}