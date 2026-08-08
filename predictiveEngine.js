// engines/predictive/predictiveEngine.js

import { extractCycles } from "./extractCycles.js";
import { buildInflowModel } from "./inflowModel.js";
import { buildOutflowCluster } from "./outflowCluster.js";

export function buildPredictiveProfile(entity) {
    const cycles = extractCycles(entity);
    const inflow = buildInflowModel(entity);
    const outflow = buildOutflowCluster(entity, cycles);

    // Predictive cash-flow score
    const predictive_cashflow =
        inflow.avg_inflow -
        (outflow.overhead + outflow.receivable_30 + outflow.avg_cycle_outflow);

    // Predictive volatility score
    const predictive_volatility =
        inflow.inflow_volatility +
        Math.abs(outflow.avg_cycle_outflow - inflow.avg_inflow);

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