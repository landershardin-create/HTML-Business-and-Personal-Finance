// engines/cashflow/inflowModel.js

export function predictInflow(entity) {
    const history = entity.history.revenue || [];
    const receivables = entity.metrics.receivable_30 || 0;

    const avgRevenue = history.length
        ? history.reduce((a, b) => a + b, 0) / history.length
        : 0;

    const trend = history.length > 1
        ? history[history.length - 1] - history[history.length - 2]
        : 0;

    const inflowPrediction = avgRevenue + trend + receivables;

    return inflowPrediction;
}