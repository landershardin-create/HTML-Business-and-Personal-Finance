// engines/crossEntity.js

export function computeCrossEntityDrag(entities) {
    const results = [];

    for (let i = 0; i < entities.length; i++) {
        for (let j = 0; j < entities.length; j++) {
            if (i === j) continue;

            const A = entities[i];
            const B = entities[j];

            const A_profit = A.metrics.revenue - A.metrics.overhead - A.metrics.payroll;
            const B_profit = B.metrics.revenue - B.metrics.overhead - B.metrics.payroll;

            const subsidy_index = A_profit > 0 && B_profit < 0
                ? Math.abs(B_profit) / A_profit
                : 0;

            const drag_index = A_profit < 0 && B_profit > 0
                ? Math.abs(A_profit) / B_profit
                : 0;

            const net_contribution = A_profit - B_profit;

            results.push({
                from_entity: A.id,
                to_entity: B.id,
                subsidy_index,
                drag_index,
                net_contribution
            });
        }
    }

    return results;
}
