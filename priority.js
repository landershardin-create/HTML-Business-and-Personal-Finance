// engines/priority.js

import { EngineContracts } from '../engine-contracts.js';

EngineContracts.priority.execute = function (state, deps) {
    const { risk, opportunity } = deps;

    const score = computePriorityScore(risk, opportunity);
    const ranking = computeRanking(risk, opportunity);

    return {
        score,
        ranking
    };
};

function computePriorityScore(risk, opportunity) {
    return Math.min(risk.level * 0.7 + opportunity.score * 0.3, 1);
}

function computeRanking(risk, opportunity) {
    const items = [];

    if (risk.level > 0.6) items.push('reduce_expenses');
    if (opportunity.score > 0.5) items.push('increase_investments');

    return items;
}