// risk/normalize.js

export function normalizeRisk(value, type) {
    switch (type) {
        case "liquidity":
            return value < 0 ? Math.abs(value) : 0;

        case "leverage":
            return value > 2.5 ? value - 2.5 : 0;

        case "profitability":
            return value < 0 ? Math.abs(value) : 0;

        case "cashflow":
            return value < -500 ? Math.abs(value + 500) : 0;

        case "volatility":
            return value > 1000 ? value - 1000 : 0;

        default:
            return 0;
    }
    
// opportunity/normalize.js

export function normalizeOpportunity(value, type) {
    switch (type) {
        case "profitability":
            return value > 0 ? value : 0;

        case "liquidity":
            return value > 0 ? value : 0;

        case "leverage":
            return value < 0 ? Math.abs(value) : 0;

        case "cashflow":
            return value > 0 ? value : 0;

        case "volatility":
            return value < 0 ? Math.abs(value) : 0;

        default:
            return 0;
    }

}