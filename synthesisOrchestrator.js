// orchestrators/synthesisOrchestrator.js

import { unifiedFinancialState } from "../engines/synthesis/unifiedFinancialState.js";
import { buildPredictiveProfile } from "../engines/predictive/predictiveEngine.js";
import { buildDragMap } from "../engines/drag/buildDragMap.js";
import { buildEntityTrendProfiles } from "../engines/trends/buildEntityTrendProfiles.js";

export function updateUnifiedFinancialTruth(entities) {
    // 1. Add predictive intelligence
    const enriched = entities.map(e => ({
        ...e,
        predictive: buildPredictiveProfile(e)
    }));

    // 2. Build unified synthesis
    const unified = unifiedFinancialState(enriched);

    // 3. Add drag intelligence
    unified.drag_map = buildDragMap(enriched);

    // 4. Add trend intelligence
    unified.entity_trends = buildEntityTrendProfiles(enriched);

    return unified;
}