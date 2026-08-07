// risk/calcEntityRisk.js

import { riskFactors } from "./factors.js";
import { normalizeRisk } from "./normalize.js";

export function calculateEntityRisk(entity) {
    const liquidityRisk = normalizeRisk(entity.liquidity, "liquidity");
    const leverageRisk = normalizeRisk(entity.leverage, "leverage");
    const profitabilityRisk = normalizeRisk(entity.profitability_strength, "profitability");
    const cashflowRisk = normalizeRisk(entity.predictive_cashflow, "cashflow");
    const volatilityRisk = normalizeRisk(entity.predictive_details.volatility, "volatility");

    const score =
        (liquidityRisk * riskFactors.liquidity_weight) +
        (leverageRisk * riskFactors.leverage_weight) +
        (profitabilityRisk * riskFactors.profitability_weight) +
        (cashflowRisk * riskFactors.cashflow_weight) +
        (volatilityRisk * riskFactors.volatility_weight);

    return {
        entity_id: entity.entity_id,
        score,
        breakdown: {
            liquidityRisk,
            leverageRisk,
            profitabilityRisk,
            cashflowRisk,
            volatilityRisk
        }
    };
}
