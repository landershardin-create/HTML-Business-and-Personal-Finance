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
// engines/predictive/inflowModel.js

export function buildInflowModel(entity) {
    const history = entity.history?.revenue || [];

    if (history.length < 2) {
        return {
            avg_inflow: 0,
            inflow_volatility: 0
        };
    }

    const avg_inflow = history.reduce((a, b) => a + b, 0) / history.length;

    let inflow_volatility = 0;
    for (let i = 1; i < history.length; i++) {
        inflow_volatility += Math.abs(history[i] - history[i - 1]);
    }

    return {
        avg_inflow,
        inflow_volatility
    };
}