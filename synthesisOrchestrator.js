// orchestrators/synthesisOrchestrator.js

import { buildComparisonTable } from "../engines/comparative/buildComparisonTable.js";
import { detectOutliers } from "../engines/comparative/detectOutliers.js";
import { detectClusters } from "../engines/comparative/detectClusters.js";
import { buildCrossEntityAlerts } from "../engines/comparative/buildCrossEntityAlerts.js";

const comparison_table = buildComparisonTable(
    unified.risk_map,
    unified.opportunity_map,
    unified.priority_map,
    unified.drag_map
);

const outliers = detectOutliers(comparison_table);
const clusters = detectClusters(comparison_table);
const cross_entity_alerts = buildCrossEntityAlerts(outliers, clusters);

unified.comparative = {
    comparison_table,
    outliers,
    clusters,
    alerts: cross_entity_alerts
};

import { normalizeEntityTrendProfiles } from "../engines/trends/normalizeEntityTrends.js";
import { normalizeHistoricalTrends } from "../engines/trends/normalizeHistoricalTrends.js";

const normalized_entity_trends = {};
Object.keys(entity_trends).forEach(id => {
    normalized_entity_trends[id] = normalizeEntityTrendProfiles(
        enriched.find(e => e.entity_id === id),
        entity_trends[id]
    );
});

const normalized_historical_trends = normalizeHistoricalTrends(entityHistory.map, historical_trends);

unified.entity_trends_normalized = normalized_entity_trends;
unified.historical_trends_normalized = normalized_historical_trends;

import { unifiedFinancialState } from "../engines/synthesis/unifiedFinancialState.js";
import { buildPredictiveProfile } from "../engines/predictive/predictiveEngine.js";
import { buildPredictiveMap } from "../engines/predictive/buildPredictiveMap.js";

import { buildDragMap } from "../engines/drag/buildDragMap.js";

import { buildEntityTrendProfiles } from "../engines/trends/buildEntityTrendProfiles.js";
import { buildHistoricalTrends } from "../engines/history/buildHistoricalTrends.js";

import { buildRiskMap } from "../engines/risk/buildRiskMap.js";
import { buildOpportunityMap } from "../engines/opportunity/buildOpportunityMap.js";

import { buildPriorityMap } from "../engines/priority/buildPriorityMap.js";
import { rankPriority } from "../engines/priority/rankPriority.js";

import { buildAlerts } from "../engines/alerts/buildAlerts.js";

import { entityHistory } from "../storage/entityHistory.js";
import { buildEntitySnapshot } from "../engines/history/buildEntitySnapshot.js";

import { buildUnifiedState } from "../engines/synthesis/buildUnifiedState.js";

export function updateUnifiedFinancialTruth(entities) {
    // 1. Predictive enrichment
    const enriched = entities.map(e => ({
        ...e,
        predictive: buildPredictiveProfile(e)
    }));

    // 2. Synthesis
    const unified = unifiedFinancialState(enriched);

    // 3. Intelligence layers
    const predictive_map = buildPredictiveMap(enriched);
    const drag_map = buildDragMap(enriched);
    const entity_trends = buildEntityTrendProfiles(enriched);

    // 4. Entity history
    enriched.forEach(e => {
        entityHistory.addSnapshot(e.entity_id, buildEntitySnapshot(e));
    });

    const historical_trends = buildHistoricalTrends(entityHistory.map);

    // 5. Risk / Opportunity / Priority
    const risk_map = buildRiskMap(enriched, entity_trends, predictive_map, drag_map);
    const opportunity_map = buildOpportunityMap(enriched, entity_trends, predictive_map, drag_map);

    const priority_map = buildPriorityMap(
        enriched,
        risk_map,
        opportunity_map,
        drag_map,
        entity_trends,
        predictive_map
    );

    const priority = rankPriority(priority_map);

    // 6. Alerts
    const alerts = {};
    enriched.forEach(e => {
        alerts[e.entity_id] = buildAlerts(
            e,
            entity_trends[e.entity_id],
            predictive_map[e.entity_id],
            drag_map,
            priority_map[e.entity_id]
        );
    });

    // 7. Final unified state
    return buildUnifiedState({
        totals: unified.totals,
        entities: enriched,
        entity_map: unified.entity_map,

        predictive_map,
        drag_map,

        entity_trends,
        historical_trends,

        risk_map,
        opportunity_map,
        priority_map,

        alerts,

        entity_history: entityHistory.map
    });
}