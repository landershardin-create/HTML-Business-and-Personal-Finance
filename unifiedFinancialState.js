// engines/synthesis/unifiedFinancialState.js

export function unifiedFinancialState(entities) {
    const totals = {
        liquidity: 0,
        leverage: 0,
        profitability: 0,
        cashflow: 0,
        predictive_cashflow: 0
    };

    const entity_map = {};

    entities.forEach(e => {
        const synthesis = {
            liquidity: e.liquidity,
            leverage: e.leverage,
            profitability: e.profitability_strength,
            cashflow: e.cashflow_stability,
            predictive_cashflow: e.predictive.predictive_cashflow
        };

        entity_map[e.entity_id] = synthesis;

        totals.liquidity += synthesis.liquidity;
        totals.leverage += synthesis.leverage;
        totals.profitability += synthesis.profitability;
        totals.cashflow += synthesis.cashflow;
        totals.predictive_cashflow += synthesis.predictive_cashflow;
    });

    return {
        totals,
        entities,
        entity_map
    };
}