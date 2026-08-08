// storage/loadEntities.js

import { validateEntity } from "../data/schema/validateEntity.js";
import { normalizeEntity } from "../data/schema/normalizeEntity.js";

export function loadEntitiesFromStorage() {
    const raw = localStorage.getItem("entities");

    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        return parsed.map(e => {
            const errors = validateEntity(e);
            if (errors.length > 0) {
                console.warn("Entity validation errors:", errors);
            }
            return normalizeEntity(e);
        });
    } catch (err) {
        console.error("Failed to parse entity storage:", err);
        return [];
    }
}