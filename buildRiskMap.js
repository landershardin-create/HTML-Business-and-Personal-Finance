// engines/risk/buildRiskMap.js

import { extractRiskFactors } from "./riskFactors.js";
import { calculateRiskScore } from "./riskScore.js";

export function buildRiskMap(entities, trends, predictiveMap, dragMap) {
    const riskMap = {};

    entities.forEach(e => {
        const factors = extractRiskFactors(
            e,
            trends[e.entity_id],
            predictiveMap[e.entity_id],
            dragMap[e.entity_id]
        );

        riskMap[e.entity_id] = calculateRiskScore(factors);
    });

    return riskMap;
}