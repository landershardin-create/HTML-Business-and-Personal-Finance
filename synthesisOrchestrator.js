// orchestrators/synthesisOrchestrator.js

import { buildPredictiveProfile } from "../engines/predictive/predictiveEngine.js";
import { unifiedFinancialState } from "../engines/synthesis/unifiedFinancialState.js";

export function updateUnifiedFinancialTruth(entities) {
    const enriched = entities.map(e => ({
        ...e,
        predictive: buildPredictiveProfile(e)
    }));

    return unifiedFinancialState(enriched);
}