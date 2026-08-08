// engines/drag/buildDragMap.js

import { compareEntities } from "./compareEntities.js";
import { calculateDragIndex } from "./calcDragIndex.js";

export function buildDragMap(entities) {
    const comparisons = compareEntities(entities);
    const dragMap = {};

    entities.forEach(e => {
        dragMap[e.entity_id] = calculateDragIndex(e.entity_id, comparisons);
    });

    return dragMap;
}