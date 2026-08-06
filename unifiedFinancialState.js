// synthesis/unifiedFinancialState.js

import { synthesizeEntity } from "./financialBrain.js";

export function unifiedFinancialState(entities) {
    const results = entities.map(e => synthesizeEntity(e));

    const totals = {
        liquidity: results.reduce((a, b) => a + b.liquidity, 0),
        leverage: results.reduce((a, b) => a + b.leverage, 0),
        profitability: results.reduce((a, b) => a + b.profitability_strength, 0),
        cashflow: results.reduce((a, b) => a + b.cashflow, 0),
        timestamp: Date.now()
    };

    return {
        entities: results,
        totals
    };
}