// automation/updatePipeline.js

import { updateUnifiedFinancialTruth } from "../orchestrators/synthesisOrchestrator.js";
import { updateCrossEntityRelations } from "../orchestrators/crossEntityOrchestrator.js";
import { unified_state } from "../storage/unified_state.js";

export function runUnifiedUpdate(reason, entity = null) {
    console.log(`Running unified update due to: ${reason}`);

    // Load all entities from your persistence layer
    const entities = window.entities || []; // replace with your actual storage

    // Update unified financial truth
    const unified = updateUnifiedFinancialTruth(entities);

    // Update cross-entity drag map
    updateCrossEntityRelations(entities);

    // Log update
    unified_state.add({
        ...unified,
        update_reason: reason
    });

    return unified;
}