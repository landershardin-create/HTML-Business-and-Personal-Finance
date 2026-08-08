// engines/comparative/detectClusters.js

export function detectClusters(comparisonTable) {
    const clusters = {
        stable: [],
        volatile: [],
        rising: [],
        declining: []
    };

    Object.entries(comparisonTable).forEach(([entity_id, v]) => {
        if (v.risk < 30 && v.drag < 30) clusters.stable.push(entity_id);
        if (v.risk > 60 || v.drag > 60) clusters.volatile.push(entity_id);
        if (v.opportunity > 60) clusters.rising.push(entity_id);
        if (v.priority > 60 && v.opportunity < 40) clusters.declining.push(entity_id);
    });

    return clusters;
}