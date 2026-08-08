// engines/opportunity/buildOpportunityMap.js

import { extractOpportunityFactors } from "./opportunityFactors.js";
import { calculateOpportunityScore } from "./opportunityScore.js";

export function buildOpportunityMap(entities, trends, predictiveMap, dragMap) {
    const opportunityMap = {};

    entities.forEach(e => {
        const factors = extractOpportunityFactors(
            e,
            trends[e.entity_id],
            predictiveMap[e.entity_id],
            dragMap[e.entity_id]
        );

        opportunityMap[e.entity_id] = calculateOpportunityScore(factors);
    });

    return opportunityMap;
}