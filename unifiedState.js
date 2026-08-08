// storage/unified_state.js

export const unified_state = {
    records: [],

    add(state) {
        this.records.push(state);
    },

    latest() {
        return this.records.sort((a, b) => b.timestamp - a.timestamp)[0] || null;
    }
    unified.entity_trends = trendProfiles;
};
