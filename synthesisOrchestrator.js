// orchestrators/synthesisOrchestrator.js

import { trends } from "../storage/trends.js";

export function updateUnifiedFinancialTruth(entities) {
    const unified = unifiedFinancialState(entities);

    unified.entities.forEach(e => {
        trends.add(e.entity_id, "liquidity", e.liquidity);
        trends.add(e.entity_id, "leverage", e.leverage);
        trends.add(e.entity_id, "profitability", e.profitability_strength);
        trends.add(e.entity_id, "cashflow", e.cashflow_stability);
        trends.add(e.entity_id, "drag", e.dragIndex || 0);
    });

    return unified;
}