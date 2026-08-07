// risk/calcUnifiedRisk.js

import { calculateEntityRisk } from "./calcEntityRisk.js";

export function calculateUnifiedRisk(entities) {
    const entityScores = entities.map(e => calculateEntityRisk(e));

    const totalRisk = entityScores.reduce((a, b) => a + b.score, 0);

    return {
        totalRisk,
        entities: entityScores
    };
}