// priority/calcEntityPriority.js

import { priorityFactors } from "./factors.js";
import { normalizePriority } from "./normalize.js";

export function calculateEntityPriority(entity, risk, opportunity, trends, dragMap) {
    const riskScore = normalizePriority(
        risk.entities.find(r => r.entity_id === entity.entity_id).score,
        "risk"
    );

    const opportunityScore = normalizePriority(
        opportunity.entities.find(o => o.entity_id === entity.entity_id).score,
        "opportunity"
    );

    const dragScore = normalizePriority(
        dragMap[entity.entity_id] || 0,
        "drag"
    );

    const trendScore = normalizePriority(
        trends[entity.entity_id].profitability.slope,
        "trend"
    );

    const priority =
        (riskScore * priorityFactors.risk_weight) +
        (opportunityScore * priorityFactors.opportunity_weight) +
        (dragScore * priorityFactors.drag_weight) +
        (trendScore * priorityFactors.trend_weight);

    return {
        entity_id: entity.entity_id,
        priority,
        breakdown: {
            riskScore,
            opportunityScore,
            dragScore,
            trendScore
        }
    };
}
