// engines/priority/buildPriorityMap.js

import { extractPriorityFactors } from "./priorityFactors.js";
import { calculatePriorityScore } from "./calcPriorityScore.js";

export function buildPriorityMap(entities, riskMap, opportunityMap, dragMap, trends, predictiveMap) {
    const priorityMap = {};

    entities.forEach(e => {
        const factors = extractPriorityFactors(
            e,
            riskMap[e.entity_id],
            opportunityMap[e.entity_id],
            dragMap[e.entity_id],
            trends[e.entity_id],
            predictiveMap[e.entity_id]
        );

        priorityMap[e.entity_id] = calculatePriorityScore(factors);
    });

    return priorityMap;
}