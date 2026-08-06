// engines/cashflow/cycleAlignment.js

export function computeCycleAlignment(entity) {
    const inflowDay = entity.cycles.inflow_day || 15;
    const outflowDay = entity.cycles.outflow_day || 1;

    const alignmentScore = Math.abs(inflowDay - outflowDay);

    return alignmentScore; // lower = better alignment
}