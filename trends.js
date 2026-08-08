// storage/trends.js

export const trends = {
    entities: {},

    ensure(entity_id) {
        if (!this.entities[entity_id]) {
            this.entities[entity_id] = {
                liquidity: [],
                leverage: [],
                profitability: [],
                cashflow: [],
                drag: []
            };
        }
    },

    add(entity_id, type, value) {
        this.ensure(entity_id);
        this.entities[entity_id][type].push({
            value,
            timestamp: Date.now()
        });
    },

    latest(entity_id, type, count = 10) {
        this.ensure(entity_id);
        return this.entities[entity_id][type].slice(-count);
    }
};