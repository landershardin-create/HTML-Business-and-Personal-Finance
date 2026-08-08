// engines/trends/normalizeEntityTrends.js

import { normalizeTrendSlope } from "./normalizeTrend.js";

export function normalizeEntityTrendProfiles(entity, trendProfile) {
    return {
        liquidity: {
            slope: normalizeTrendSlope(trendProfile.liquidity.slope, entity.liquidity)
        },
        leverage: {
            slope: normalizeTrendSlope(trendProfile.leverage.slope, entity.leverage)
        },
        profitability: {
            slope: normalizeTrendSlope(trendProfile.profitability.slope, entity.profitability_strength)
        },
        cashflow: {
            slope: normalizeTrendSlope(trendProfile.cashflow.slope, entity.cashflow_stability)
        },
        drag: {
            slope: normalizeTrendSlope(trendProfile.drag.slope, entity.dragIndex ?? 1)
        }
    };
}