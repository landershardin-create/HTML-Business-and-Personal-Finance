// automation/updatePipeline.js

import { loadEntitiesFromStorage } from "../storage/loadEntities.js";
import { unified_state } from "../storage/unifiedState.js";
import { updateUnifiedFinancialTruth } from "../orchestrators/synthesisOrchestrator.js";

export function runUnifiedUpdate(reason = "manual") {
    // 1. Load entities safely
    const entities = loadEntitiesFromStorage();

    // 2. Run full intelligence stack
    const unified = updateUnifiedFinancialTruth(entities);

    // 3. Persist unified snapshot
    unified_state.add({
        ...unified,
        update_reason: reason
    });

    // 4. Return unified state
    return unified;
}