// orchestrators/synthesisOrchestrator.js

import { buildPredictiveProfile } from "../engines/predictive/predictiveEngine.js";

export function updateUnifiedFinancialTruth(entities) {
    const unified = unifiedFinancialState(entities);

    unified.entities = unified.entities.map(e => ({
        ...e,
        predictive: buildPredictiveProfile(e)
    }));

    return unified;
}