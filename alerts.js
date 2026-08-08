// engines/alerts.js

import { EngineContracts } from '../engine-contracts.js';

EngineContracts.alerts.execute = function (state, deps) {
    const { risk, priority } = deps;

    const items = computeAlerts(state, risk, priority);

    return {
        count: items.length,
        items
    };
};

function computeAlerts(state, risk, priority) {
    const alerts = [];

    if (risk.level > 0.7) alerts.push('high_risk');
    if (state.expenses > state.income) alerts.push('expenses_exceed_income');
    if (priority.score > 0.8) alerts.push('critical_priority');

    return alerts;
}