// engines/drag/calcDragIndex.js

export function calculateDragIndex(entity_id, comparisons) {
    const peers = comparisons[entity_id];
    let drag = 0;

    Object.values(peers).forEach(diff => {
        // Negative differences mean the entity is weaker than peers
        if (diff.liquidity_diff < 0) drag += Math.abs(diff.liquidity_diff);
        if (diff.leverage_diff > 0) drag += diff.leverage_diff; // higher leverage = drag
        if (diff.profitability_diff < 0) drag += Math.abs(diff.profitability_diff);
        if (diff.cashflow_diff < 0) drag += Math.abs(diff.cashflow_diff);
        if (diff.predictive_diff < 0) drag += Math.abs(diff.predictive_diff);
    });

    return drag;
}