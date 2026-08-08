// engines/drag/compareEntities.js

export function compareEntities(entities) {
    const comparisons = {};

    entities.forEach(a => {
        comparisons[a.entity_id] = {};

        entities.forEach(b => {
            if (a.entity_id === b.entity_id) return;

            comparisons[a.entity_id][b.entity_id] = {
                liquidity_diff: a.liquidity - b.liquidity,
                leverage_diff: a.leverage - b.leverage,
                profitability_diff: a.profitability_strength - b.profitability_strength,
                cashflow_diff: a.cashflow_stability - b.cashflow_stability,
                predictive_diff: a.predictive.predictive_cashflow - b.predictive.predictive_cashflow
            };
        });
    });

    return comparisons;
}