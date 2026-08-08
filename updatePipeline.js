// automation/updatePipeline.js

import { prepareEntities } from "../data/loadEntities.js";

export function runUnifiedUpdate(reason) {
    const raw = loadEntitiesFromStorage();   // your persistence layer
    const entities = prepareEntities(raw);   // schema + normalization

    const unified = updateUnifiedFinancialTruth(entities);

    unified_state.add({
        ...unified,
        update_reason: reason
    });

    return unified;
}