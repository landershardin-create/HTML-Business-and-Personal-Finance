// automation/updatePipeline.js

import { calculateUnifiedOpportunity } from "../opportunity/calcUnifiedOpportunity.js";

export function runUnifiedUpdate(reason, entity = null) {
    const entities = window.entities || [];

    const unified = updateUnifiedFinancialTruth(entities);

    const trendProfiles = {
        liquidity: buildTrendProfile(trends.latest("liquidity")),
        leverage: buildTrendProfile(trends.latest("leverage")),
        profitability: buildTrendProfile(trends.latest("profitability")),
        cashflow: buildTrendProfile(trends.latest("cashflow"))
    };

    const risk = calculateUnifiedRisk(unified.entities);
    const opportunity = calculateUnifiedOpportunity(unified.entities, trendProfiles);

    unified_state.add({
        ...unified,
        risk,
        opportunity,
        update_reason: reason
    });

    return unified;
}