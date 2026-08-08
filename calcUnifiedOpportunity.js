// opportunity/calcUnifiedOpportunity.js

import { calculateEntityOpportunity } from "./calcEntityOpportunity.js";

export function calculateUnifiedOpportunity(entities, trendProfiles) {
    const entityScores = entities.map(e =>
        calculateEntityOpportunity(e, trendProfiles[e.entity_id])
    );

    const totalOpportunity = entityScores.reduce((a, b) => a + b.score, 0);

    return {
        totalOpportunity,
        entities: entityScores
    };
}
