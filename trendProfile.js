// engines/trends/trendProfile.js

import { computeSlope } from "./slope.js";
import { computeMomentum } from "./momentum.js";
import { computeTrendVolatility } from "./volatility.js";

export function buildTrendProfile(history) {
    return {
        slope: computeSlope(history),
        momentum: computeMomentum(history),
        volatility: computeTrendVolatility(history),
        points: history
    };
}