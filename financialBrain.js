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