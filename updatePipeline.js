// automation/updatePipeline.js

import { calculateUnifiedRisk } from "../risk/calcUnifiedRisk.js";

export function runUnifiedUpdate(reason, entity = null) {
    const entities = window.entities || [];

    const unified = updateUnifiedFinancialTruth(entities);

    const risk = calculateUnifiedRisk(unified.entities);

    unified_state.add({
        ...unified,
        risk,
        update_reason: reason
    });

    return unified;
}