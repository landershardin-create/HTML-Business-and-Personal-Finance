// storage/entity_relations.js

export const entity_relations = {
    records: [],

    add(entry) {
        this.records.push({
            from_entity: entry.from_entity,
            to_entity: entry.to_entity,
            subsidy_index: entry.subsidy_index,
            drag_index: entry.drag_index,
            net_contribution: entry.net_contribution,
            timestamp: Date.now()
        });
    },

    latestFor(entity_id) {
        return this.records
            .filter(r => r.from_entity === entity_id)
            .sort((a, b) => b.timestamp - a.timestamp);
    }
};
