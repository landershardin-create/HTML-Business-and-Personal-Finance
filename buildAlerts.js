// engines/alerts/buildAlerts.js

import { buildEntityAlerts } from "./entityAlerts.js";
import { buildTrendAlerts } from "./trendAlerts.js";
import { buildPredictiveAlerts } from "./predictiveAlerts.js";
import { buildDragAlerts } from "./dragAlerts.js";
import { buildPriorityAlerts } from "./priorityAlerts.js";

export function buildAlerts(entity, trendProfile, predictive, dragMap, priorityScore) {
    return [
        ...buildEntityAlerts(entity),
        ...buildTrendAlerts(trendProfile),
        ...buildPredictiveAlerts(predictive),
        ...buildDragAlerts(entity.entity_id, dragMap),
        ...buildPriorityAlerts(priorityScore)
    ];
}