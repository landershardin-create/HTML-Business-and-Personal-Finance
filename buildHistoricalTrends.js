// engines/history/buildHistoricalTrends.js

import { buildTrendProfile } from "../trends/trendProfile.js";

export function buildHistoricalTrends(historyMap) {
    const profiles = {};

    Object.keys(historyMap).forEach(entity_id => {
        const snapshots = historyMap[entity_id];

        profiles[entity_id] = {
            liquidity: buildTrendProfile(snapshots.map(s => ({ value: s.liquidity }))),
            leverage: buildTrendProfile(snapshots.map(s => ({ value: s.leverage }))),
            profitability: buildTrendProfile(snapshots.map(s => ({ value: s.profitability }))),
            cashflow: buildTrendProfile(snapshots.map(s => ({ value: s.cashflow }))),
            predictive_cashflow: buildTrendProfile(snapshots.map(s => ({ value: s.predictive_cashflow }))),
            predictive_volatility: buildTrendProfile(snapshots.map(s => ({ value: s.predictive_volatility }))),
            predictability_score: buildTrendProfile(snapshots.map(s => ({ value: s.predictability_score }))),
            drag: buildTrendProfile(snapshots.map(s => ({ value: s.drag })))
        };
    });

    return profiles;
}