// engines/comparative.js

import { EngineContracts } from '../engine-contracts.js';

EngineContracts.comparative.execute = function (state, deps) {
    const { trends } = deps;

    const clusters = computeClusters(state);
    const outliers = computeOutliers(state);

    return {
        clusters,
        outliers
    };
};

function computeClusters(state) {
    const values = state.accounts?.history ?? [];
    if (!values.length) return [];

    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    return values.filter(v => v > avg);
}

function computeOutliers(state) {
    const values = state.accounts?.history ?? [];
    if (!values.length) return [];

    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    return values.filter(v => Math.abs(v - avg) > avg * 0.5);
}