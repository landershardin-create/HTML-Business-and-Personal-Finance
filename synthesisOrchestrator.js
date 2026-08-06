// orchestrators/synthesisOrchestrator.js

import { unifiedFinancialState } from "../synthesis/unifiedFinancialState.js";
import { unified_state } from "../storage/unified_state.js";

export function updateUnifiedFinancialTruth(entities) {
    const state = unifiedFinancialState(entities);
    unified_state.add(state);
    return unified_state.latest();
}