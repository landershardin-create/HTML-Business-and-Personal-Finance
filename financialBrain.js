// synthesis/financialBrain.js

import { computeLiquidity } from "../engines/liquidity.js";
import { computeLeverage } from "../engines/leverage.js";
import { computeProfitability } from "../engines/profitability.js";
import { computeCashFlow } from "../engines/cashflow.js";

export function synthesizeEntity(entity) {
    const liquidity = computeLiquidity(entity);
    const leverage = computeLeverage(entity);
    const { profitability_strength, dragIndex } = computeProfitability(entity);
    const cashflow = computeCashFlow(entity);

    return {
        entity_id: entity.id,
        liquidity,
        leverage,
        profitability_strength,
        dragIndex,
        cashflow,
        timestamp: Date.now()
    };
}
// synthesis/financialBrain.js

import { computePredictiveCashflow } from "../engines/cashflow/predictiveCashflow.js";

export function synthesizeEntity(entity) {
    const predictive = computePredictiveCashflow(entity);

    return {
        entity_id: entity.id,
        liquidity: computeLiquidity(entity),
        leverage: computeLeverage(entity),
        profitability_strength: computeProfitability(entity).profitability_strength,
        cashflow_stability: computeCashFlow(entity),
        predictive_cashflow: predictive.predictabilityScore,
        predictive_details: predictive,
        timestamp: Date.now()
    };
}