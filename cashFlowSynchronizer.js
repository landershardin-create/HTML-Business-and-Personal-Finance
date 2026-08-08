// engines/cashFlowSynchronizer.js
// Multi-Entity Cash-Flow Synchronizer Engine
// Builds 60-day timelines, detects collision zones, aligns income/expenses,
// computes liquidity stability, and outputs synchronization analytics.

import { EngineContracts } from '../engine-contracts.js';

EngineContracts.cashFlowSynchronizer.execute = function (state, deps) {
    const timeline = buildTimeline(state);
    const collisions = detectCollisions(timeline);
    const coverage = detectCoverageZones(timeline);
    const volatilityGap = computeVolatilityGap(timeline);
    const liquidityBuffer = computeLiquidityBuffer(volatilityGap, timeline);
    const stabilityScore = computeStabilityScore(collisions, timeline);

    const recommendations = generateRecommendations(collisions, coverage);

    return {
        timeline,
        collisions,
        coverage,
        volatilityGap,
        liquidityBuffer,
        stabilityScore,
        recommendations
    };
};

/* ---------------------------------------------------------
 * BUILD 60-DAY TIMELINE
 * --------------------------------------------------------- */
function buildTimeline(state) {
    const days = [];

    for (let i = 0; i < 60; i++) {
        days.push({
            day: i + 1,
            personal: getEvents(state.finance, i),
            business: getEvents(state.business, i),
            vending: getEvents(state.inventory, i),
            architecture: getEvents(state.contributors, i),
            system: getEvents(state.system, i)
        });
    }

    return days;
}

function getEvents(domain, dayIndex) {
    if (!domain || !domain.events) return [];
    return domain.events.filter(e => e.day === dayIndex + 1);
}

/* ---------------------------------------------------------
 * DETECT COLLISION ZONES
 * --------------------------------------------------------- */
function detectCollisions(timeline) {
    return timeline.filter(day => {
        const totalEvents =
            day.personal.length +
            day.business.length +
            day.vending.length +
            day.architecture.length +
            day.system.length;

        return totalEvents >= 3; // collision threshold
    });
}

/* ---------------------------------------------------------
 * DETECT COVERAGE ZONES (Income before expenses)
 * --------------------------------------------------------- */
function detectCoverageZones(timeline) {
    return timeline.filter(day => {
        const incomeEvents = day.personal.filter(e => e.type === 'income').length +
                             day.business.filter(e => e.type === 'income').length +
                             day.architecture.filter(e => e.type === 'income').length;

        const expenseEvents = day.personal.filter(e => e.type === 'expense').length +
                              day.business.filter(e => e.type === 'expense').length +
                              day.vending.filter(e => e.type === 'expense').length;

        return incomeEvents > 0 && expenseEvents > 0;
    });
}

/* ---------------------------------------------------------
 * VOLATILITY GAP
 * --------------------------------------------------------- */
function computeVolatilityGap(timeline) {
    let income = 0;
    let expenses = 0;

    timeline.forEach(day => {
        day.personal.forEach(e => e.type === 'income' ? income += e.amount : expenses += e.amount);
        day.business.forEach(e => e.type === 'income' ? income += e.amount : expenses += e.amount);
        day.vending.forEach(e => e.type === 'income' ? income += e.amount : expenses += e.amount);
        day.architecture.forEach(e => e.type === 'income' ? income += e.amount : expenses += e.amount);
    });

    return expenses - income;
}

/* ---------------------------------------------------------
 * LIQUIDITY BUFFER MODEL
 * --------------------------------------------------------- */
function computeLiquidityBuffer(volatilityGap, timeline) {
    const totalExpenses = timeline.reduce((sum, day) => {
        return sum +
            day.personal.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0) +
            day.business.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0) +
            day.vending.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
    }, 0);

    const ODF = totalExpenses * 0.15; // operational drag factor
    const ESF = totalExpenses * 0.25; // emergency shock factor

    return volatilityGap + ODF + ESF;
}

/* ---------------------------------------------------------
 * STABILITY SCORE
 * --------------------------------------------------------- */
function computeStabilityScore(collisions, timeline) {
    const totalDays = timeline.length;
    const collisionDays = collisions.length;

    return Math.max(0, 1 - collisionDays / totalDays);
}

/* ---------------------------------------------------------
 * RECOMMENDATIONS
 * --------------------------------------------------------- */
function generateRecommendations(collisions, coverage) {
    const recs = [];

    if (collisions.length > 10) {
        recs.push('Shift flexible expenses out of collision zones.');
    }

    if (coverage.length < 5) {
        recs.push('Align income events earlier in the cycle.');
    }

    recs.push('Increase liquidity buffer to reduce volatility impact.');

    return recs;
}