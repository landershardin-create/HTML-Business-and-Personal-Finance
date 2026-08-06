// orchestrators/synthesisOrchestrator.js

import { unifiedFinancialState } from "../synthesis/unifiedFinancialState.js";
import { unified_state } from "../storage/unified_state.js";
import { trends } from "../storage/trends.js";

export function updateUnifiedFinancialTruth(entities) {
    const state = unifiedFinancialState(entities);

    // Store trends
    trends.add("liquidity", state.totals.liquidity);
    trends.add("leverage", state.totals.leverage);
    trends.add("profitability", state.totals.profitability);
    trends.add("cashflow", state.totals.cashflow);

    unified_state.add(state);
    return unified_state.latest();
}