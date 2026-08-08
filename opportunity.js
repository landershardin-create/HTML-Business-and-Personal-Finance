// engines/opportunity.js

import { EngineContracts } from '../engine-contracts.js';

EngineContracts.opportunity.execute = function (state, deps) {
    const { risk, trends } = deps;

    const opportunities = computeOpportunities(state, risk, trends);
    const score = computeOpportunityScore(opportunities);

    return {
        opportunities,
        score
    };
};

function computeOpportunities(state, risk, trends) {
    const list = [];

    if (risk.level < 0.5 && trends.direction === 'up') {
        list.push('expand_savings');
        list.push('invest_growth');
    }

    if (state.expenses < state.income * 0.7) {
        list.push('increase_retirement_contributions');
    }

    return list;
}

function computeOpportunityScore(opportunities) {
    return Math.min(opportunities.length * 0.25, 1);
}