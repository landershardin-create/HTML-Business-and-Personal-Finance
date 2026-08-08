// orchestrators/synthesisOrchestrator.js

import { buildRiskMap } from "../engines/risk/buildRiskMap.js";
import { buildOpportunityMap } from "../engines/opportunity/buildOpportunityMap.js";

unified.risk_map = buildRiskMap(enriched, unified.entity_trends, unified.predictive_map, unified.drag_map);
unified.opportunity_map = buildOpportunityMap(enriched, unified.entity_trends, unified.predictive_map, unified.drag_map);

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