// opportunity/calcEntityOpportunity.js

import { opportunityFactors } from "./factors.js";
import { normalizeOpportunity } from "./normalize.js";

export function calculateEntityOpportunity(entity, trends) {
    const profitabilityOpp = normalizeOpportunity(trends.profitability.momentum, "profitability");
    const liquidityOpp = normalizeOpportunity(trends.liquidity.slope, "liquidity");
    const leverageOpp = normalizeOpportunity(trends.leverage.slope, "leverage");
    const cashflowOpp = normalizeOpportunity(trends.cashflow.momentum, "cashflow");
    const volatilityOpp = normalizeOpportunity(-trends.cashflow.volatility, "volatility");

    const score =
        (profitabilityOpp * opportunityFactors.profitability_weight) +
        (liquidityOpp * opportunityFactors.liquidity_weight) +
        (leverageOpp * opportunityFactors.leverage_weight) +
        (cashflowOpp * opportunityFactors.cashflow_weight) +
        (volatilityOpp * opportunityFactors.volatility_weight);

    return {
        entity_id: entity.entity_id,
        score,
        breakdown: {
            profitabilityOpp,
            liquidityOpp,
            leverageOpp,
            cashflowOpp,
            volatilityOpp
        }
    };
}
