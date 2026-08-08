// priority/calcUnifiedPriority.js

import { calculateEntityPriority } from "./calcEntityPriority.js";

export function calculateUnifiedPriority(entities, risk, opportunity, trends, dragMap) {
    const scores = entities.map(e =>
        calculateEntityPriority(e, risk, opportunity, trends, dragMap)
    );

    const ranked = scores.sort((a, b) => b.priority - a.priority);

    return {
        ranked,
        highest: ranked[0],
        lowest: ranked[ranked.length - 1]
    };
}