// storage/trends.js

export const trends = {
    liquidity: [],
    leverage: [],
    profitability: [],
    cashflow: [],
    drag: [],

    add(type, value) {
        this[type].push({
            value,
            timestamp: Date.now()
        });
    },

    latest(type) {
        return this[type].slice(-10); // last 10 points
    }
};