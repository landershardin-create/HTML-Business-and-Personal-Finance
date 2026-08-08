// automation/updatePipeline.js

import { buildEntityTrendProfiles } from "../engines/trends/buildEntityTrendProfiles.js";

export function runUnifiedUpdate(reason, entity = null) {
    const entities = loadEntities(); // replace window.entities

    const unified = updateUnifiedFinancialTruth(entities);

    const trendProfiles = buildEntityTrendProfiles(unified.entities);

    unified.entity_trends = trendProfiles;

    unified_state.add({
        ...unified,
        update_reason: reason
    });

    return unified;
}