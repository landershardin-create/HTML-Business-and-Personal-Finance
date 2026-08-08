// engines/history/buildEntitySnapshot.js

export function buildEntitySnapshot(entity) {
    return {
        liquidity: entity.liquidity,
        leverage: entity.leverage,
        profitability: entity.profitability_strength,
        cashflow: entity.cashflow_stability,

        predictive_cashflow: entity.predictive?.predictive_cashflow ?? 0,
        predictive_volatility: entity.predictive?.predictive_volatility ?? 0,
        predictability_score: entity.predictive?.predictability_score ?? 0,

        drag: entity.dragIndex ?? 0
    };
}