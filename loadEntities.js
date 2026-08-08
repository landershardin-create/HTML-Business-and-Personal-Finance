// data/loadEntities.js

import { validateEntity } from "./schema/validateEntity.js";
import { normalizeEntity } from "./schema/normalizeEntity.js";

export function prepareEntities(rawEntities) {
    return rawEntities.map(e => {
        const errors = validateEntity(e);

        if (errors.length > 0) {
            console.warn("Entity validation errors:", errors);
        }

        return normalizeEntity(e);
    });
}