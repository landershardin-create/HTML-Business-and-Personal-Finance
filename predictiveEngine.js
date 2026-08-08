// engines/predictive/predictiveEngine.js

import { extractCycles } from "./extractCycles.js";
import { buildInflowModel } from "./inflowModel.js";
import { buildOutflowCluster } from "./outflowCluster.js";

export function buildPredictiveProfile(entity) {
    const cycles = extractCycles(entity);
    const inflow = buildInflowModel(entity);
    const outflow = buildOutflowCluster(entity, cycles);

    // Normalized inflow/outflow
    const normalized_inflow = inflow.avg_inflow || 1;
    const normalized_outflow = (outflow.overhead + outflow.receivable_30 + outflow.avg_cycle_outflow) || 1;

    // Predictive cash-flow (normalized)
    const predictive_cashflow = normalized_inflow - normalized_outflow;

    // Predictive volatility (weighted)
    const predictive_volatility =
        (inflow.inflow_volatility * 0.7) +
        (Math.abs(outflow.avg_cycle_outflow - inflow.avg_inflow) * 0.3);

    // Predictability score (higher = more stable)
    const predictability_score =
        predictive_cashflow - predictive_volatility;

    return {
        cycles,
        inflow,
        outflow,
        predictive_cashflow,
        predictive_volatility,
        predictability_score
    };
}