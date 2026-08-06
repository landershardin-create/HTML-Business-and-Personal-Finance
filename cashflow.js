// engines/cashflow.js

export function computeCashFlow(entity) {
    const inflowPredict = entity.metrics.inflow_predict || 0;
    const outflowCluster = entity.metrics.outflow_cluster || 0;
    const entityDrag = entity.metrics.entity_drag || 0;

    const cashflow_stability = inflowPredict - outflowCluster - entityDrag;

    return cashflow_stability;
}
