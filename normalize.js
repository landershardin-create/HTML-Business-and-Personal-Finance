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
    
// priority/normalize.js

export function normalizePriority(value, type) {
    switch (type) {
        case "risk":
            return value; // risk is already normalized

        case "opportunity":
            return value; // opportunity is already normalized

        case "drag":
            return value > 0 ? value : 0;

        case "trend":
            return value < 0 ? Math.abs(value) : 0; // negative slope = danger

        default:
            return 0;
    }

}