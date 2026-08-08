// state.js
// The single source of truth for the entire application.
// All reads/writes flow through this module.
// Emits events, integrates persistence, and enforces immutability.

import Events from './events.js';
import Telemetry from './telemetry.js';
import Persistence from '../data/persistence.js';

class StateManager {
    constructor() {
        // Load initial state from persistence
        this.state = Persistence.load();

        Telemetry.log('state:initialized', {
            timestamp: Date.now(),
            keys: Object.keys(this.state)
        });
    }

    /* ---------------------------------------------------------
     * GET FULL STATE (Immutable Copy)
     * --------------------------------------------------------- */
    getAll() {
        return JSON.parse(JSON.stringify(this.state));
    }

    /* ---------------------------------------------------------
     * GET SINGLE KEY
     * --------------------------------------------------------- */
    get(key) {
        return this.state[key];
    }

    /* ---------------------------------------------------------
     * UPDATE SINGLE KEY
     * --------------------------------------------------------- */
    update(key, value) {
        try {
            const oldValue = this.state[key];
            this.state[key] = value;

            Telemetry.log('state:update', {
                key,
                oldValue,
                newValue: value,
                timestamp: Date.now()
            });

            // Persist new state
            Persistence.save(this.state);

            // Emit event for unified-state + orchestrator + UI
            Events.emit('state:updated', {
                key,
                value,
                fullState: this.getAll()
            });

        } catch (err) {
            Telemetry.error('state:update-error', err);
            Events.emit('state:error', err);
        }
    }

    /* ---------------------------------------------------------
     * BULK UPDATE (Atomic)
     * --------------------------------------------------------- */
    updateMany(updates) {
        try {
            const oldState = this.getAll();

            for (const key in updates) {
                this.state[key] = updates[key];
            }

            Telemetry.log('state:update-many', {
                updates,
                timestamp: Date.now()
            });

            Persistence.save(this.state);

            Events.emit('state:updated', {
                updates,
                fullState: this.getAll()
            });

        } catch (err) {
            Telemetry.error('state:update-many-error', err);
            Events.emit('state:error', err);
        }
    }

    /* ---------------------------------------------------------
     * RESET STATE TO DEFAULTS
     * --------------------------------------------------------- */
    reset() {
        try {
            const defaults = Persistence.applyDefaults();
            this.state = defaults;

            Persistence.save(defaults);

            Telemetry.log('state:reset', {
                timestamp: Date.now()
            });

            Events.emit('state:updated', {
                fullState: this.getAll()
            });

        } catch (err) {
            Telemetry.error('state:reset-error', err);
            Events.emit('state:error', err);
        }
    }
}

const State = new StateManager();
export default State;