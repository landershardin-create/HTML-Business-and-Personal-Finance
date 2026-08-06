// engines/liquidity.js

export function computeLiquidity(entity) {
    const cash = entity.accounts.cash || 0;
    const burn = entity.metrics.monthly_burn || 0;
    const receivable30 = entity.metrics.receivable_30 || 0;

    const liquidity_score = cash - (1.5 * burn) + receivable30;

    return liquidity_score;
}
