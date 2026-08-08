// engines/risk.js

import { EngineContracts } from '../engine-contracts.js';

EngineContracts.risk.execute = function (state, deps) {
    const { predictive, trends } = deps;

    const level = computeRiskLevel(state, predictive, trends);
    const factors = computeRiskFactors(state);

    return {
        level,
        factors
    };
};

function computeRiskLevel(state, predictive, trends) {
    const expenses = state.expenses ?? 0;
    const income = state.income ?? 0;

    const ratio = expenses / (income || 1);

    let base = ratio > 0.8 ? 0.7 : 0.3;

    if (trends.direction === 'down') base += 0.1;
    if (predictive.confidence < 0.5) base += 0.1;

    return Math.min(base, 1);
}

function computeRiskFactors(state) {
    const factors = [];

    if (state.expenses > state.income) factors.push('expenses_exceed_income');
    if ((state.accounts?.history ?? []).length < 3) factors.push('insufficient_history');

    return factors;
}