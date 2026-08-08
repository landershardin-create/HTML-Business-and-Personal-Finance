// engines/trends/normalizeHistoricalTrends.js

import { normalizeTrendSlope } from "./normalizeTrend.js";

export function normalizeHistoricalTrends(historyMap, historicalTrends) {
    const normalized = {};

    Object.keys(historicalTrends).forEach(entity_id => {
        const hist = historicalTrends[entity_id];
        const latest = historyMap[entity_id]?.slice(-1)?.[0];

        if (!latest) return;

        normalized[entity_id] = {
            liquidity: {
                slope: normalizeTrendSlope(hist.liquidity.slope, latest.liquidity)
            },
            leverage: {
                slope: normalizeTrendSlope(hist.leverage.slope, latest.leverage)
            },
            profitability: {
                slope: normalizeTrendSlope(hist.profitability.slope, latest.profitability)
            },
            cashflow: {
                slope: normalizeTrendSlope(hist.cashflow.slope, latest.cashflow)
            },
            predictive_cashflow: {
                slope: normalizeTrendSlope(hist.predictive_cashflow.slope, latest.predictive_cashflow)
            },
            predictive_volatility: {
                slope: normalizeTrendSlope(hist.predictive_volatility.slope, latest.predictive_volatility)
            },
            predictability_score: {
                slope: normalizeTrendSlope(hist.predictability_score.slope, latest.predictability_score)
            },
            drag: {
                slope: normalizeTrendSlope(hist.drag.slope, latest.drag)
            }
        };
    });

    return normalized;
}