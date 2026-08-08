// storage/unifiedState.js

export const unified_state = {
    snapshots: [],

    add(snapshot) {
        this.snapshots.push({
            ...snapshot,
            timestamp: Date.now()
        });
    },

    latest(count = 1) {
        return this.snapshots.slice(-count);
    }
};