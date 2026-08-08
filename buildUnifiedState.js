// engines/synthesis/buildUnifiedState.js

export function buildUnifiedState({
    totals,
    entities,
    entity_map,
    predictive_map,
    drag_map,
    entity_trends,
    historical_trends,
    risk_map,
    opportunity_map,
    priority_map,
    alerts,
    entity_history
}) {
    return {
        totals,
        entities,
        entity_map,

        predictive_map,
        drag_map,

        entity_trends,
        historical_trends,

        risk_map,
        opportunity_map,
        priority_map,

        alerts,

        entity_history
    };
}