// engines/trends.js

import { EngineContracts } from '../engine-contracts.js';

EngineContracts.trends.execute = function (state) {
    const history = state.accounts?.history ?? [];

    return {
        movement: computeMovement(history),
        direction: computeDirection(history)
    };
};

function computeMovement(history) {
    if (history.length < 2) return 0;
    return history[history.length - 1] - history[history.length - 2];
}

function computeDirection(history) {
    if (history.length < 2) return 'flat';
    return history[history.length - 1] > history[history.length - 2] ? 'up' : 'down';
}