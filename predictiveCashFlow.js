// engines/cashflow/predictiveCashflow.js

import { predictInflow } from "./inflowModel.js";
import { clusterOutflows } from "./outflowCluster.js";
import { computeCycleAlignment } from "./cycleAlignment.js";
import { computeVolatility } from "./volatility.js";

export function computePredictiveCashflow(entity) {
    const inflow = predictInflow(entity);
    const outflow = clusterOutflows(entity);
    const alignment = computeCycleAlignment(entity);
    const volatility = computeVolatility(entity);

    const predictabilityScore =
        inflow - outflow - (alignment * 0.5) - (volatility * 0.3);

    return {
        inflow,
        outflow,
        alignment,
        volatility,
        predictabilityScore
    };
}