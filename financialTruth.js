// orchestrators/financialTruth.js

import { financial_synthesis } from "../storage/financial_synthesis.js";
import { computeLiquidity } from "../engines/liquidity.js";
import { computeLeverage } from "../engines/leverage.js";
import { computeProfitability } from "../engines/profitability.js";
import { computeCashFlow } from "../engines/cashflow.js";

export function computeFinancialTruth(entity) {
    const liquidity_score = computeLiquidity(entity);
    const leverage_risk = computeLeverage(entity);
    const { profitability_strength } = computeProfitability(entity);
    const cashflow_stability = computeCashFlow(entity);

    financial_synthesis.add({
        entity_id: entity.id,
        liquidity_score,
        leverage_risk,
        profitability_strength,
        cashflow_stability
    });

    return financial_synthesis.latest(entity.id);
}
