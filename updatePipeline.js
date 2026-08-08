// automation/updatePipeline.js

import { calculateUnifiedPriority } from "../priority/calcUnifiedPriority.js";

export function runUnifiedUpdate(reason, entity = null) {
    const entities = window.entities || [];

    const unified = updateUnifiedFinancialTruth(entities);

    const trendProfiles = buildEntityTrendProfiles(entities); // FIX from Step 8 errors

    const risk = calculateUnifiedRisk(unified.entities);
    const opportunity = calculateUnifiedOpportunity(unified.entities, trendProfiles);
    const dragMap = buildDragMap(unified.entities); // FIX from Step 7 errors

    const priority = calculateUnifiedPriority(
        unified.entities,
        risk,
        opportunity,
        trendProfiles,
        dragMap
    );

    unified_state.add({
        ...unified,
        risk,
        opportunity,
        priority,
        update_reason: reason
    });

    return unified;
}