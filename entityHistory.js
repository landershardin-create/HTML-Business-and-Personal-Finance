// storage/entityHistory.js

export const entityHistory = {
    map: {},

    ensure(entity_id) {
        if (!this.map[entity_id]) {
            this.map[entity_id] = [];
        }
    },

    addSnapshot(entity_id, snapshot) {
        this.ensure(entity_id);
        this.map[entity_id].push({
            ...snapshot,
            timestamp: Date.now()
        });
    },

    latest(entity_id, count = 10) {
        this.ensure(entity_id);
        return this.map[entity_id].slice(-count);
    }
};