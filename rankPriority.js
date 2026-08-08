// engines/priority/rankPriority.js

export function rankPriority(priorityMap) {
    const ranked = Object.entries(priorityMap)
        .map(([entity_id, priority]) => ({ entity_id, priority }))
        .sort((a, b) => b.priority - a.priority);

    return {
        ranked,
        highest: ranked[0],
        lowest: ranked[ranked.length - 1]
    };
}