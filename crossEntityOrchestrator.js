// orchestrators/crossEntityOrchestrator.js

import { entity_relations } from "../storage/entity_relations.js";
import { computeCrossEntityDrag } from "../engines/crossEntity.js";

export function updateCrossEntityRelations(entities) {
    const results = computeCrossEntityDrag(entities);

    results.forEach(r => entity_relations.add(r));

    return results;
}
