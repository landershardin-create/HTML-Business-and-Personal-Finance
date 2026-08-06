// engines/leverage.js

export function computeLeverage(entity) {
    const liabilities = entity.balance.liabilities || 0;
    const equity = entity.balance.equity || 1; // avoid division by zero
    const trendSlope = entity.trends.leverage_slope || 0;

    const leverage_risk = (liabilities / equity) - trendSlope;

    return leverage_risk;
}
