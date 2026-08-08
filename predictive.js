// engines/predictive.js

import { EngineContracts } from '../engine-contracts.js';

EngineContracts.predictive.execute = function (state, deps) {
    const history = state.accounts?.history ?? [];

    const forecast = computeForecast(history);
    const confidence = computeConfidence(history);

    return {
        forecast,
        confidence
    };
};

function computeForecast(history) {
    if (!history.length) return { nextMonth: 0, trend: 'flat' };

    const last = history[history.length - 1];
    const avg = history.reduce((a, b) => a + b, 0) / history.length;

    return {
        nextMonth: avg * 1.03,
        trend: last > avg ? 'up' : 'down'
    };
}

function computeConfidence(history) {
    if (history.length < 3) return 0.4;
    return 0.75;
}