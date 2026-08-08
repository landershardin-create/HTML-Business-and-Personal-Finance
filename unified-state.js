// unified-state.js
// The single canonical view of application state.
// Normalizes, validates, and version-aligns all data before engines consume it.

import State from '../../system/state.js';
import Events from '../../system/events.js';
import Telemetry from '../../system/telemetry.js';

import Schema from '../../data/schema.js';
import Validate from '../../data/validate.js';
import Normalize from '../../data/normalize.js';

export const UnifiedState = {

    /* ---------------------------------------------------------
     * GET UNIFIED STATE (Primary Entry Point)
     * --------------------------------------------------------- */
    get() {
        try {
            const raw = State.getAll();

            // 1. Apply schema defaults + versioning
            const versioned = this.applySchema(raw);

            // 2. Normalize all values (currency, numbers, arrays, objects)
            const normalized = this.normalize(versioned);

            // 3. Validate the normalized state
            const validated = this.validate(normalized);

            // 4. Emit event for debugging / telemetry
            Events.emit('unified-state:generated', validated);
            Telemetry.log('unified-state:generated', {
                timestamp: Date.now(),
                version: Schema.version
            });

            return validated;

        } catch (err) {
            Telemetry.error('unified-state:error', err);
            Events.emit('unified-state:error', err);
            return {}; // fail-safe
        }
    },

    /* ---------------------------------------------------------
     * APPLY SCHEMA (Defaults + Versioning)
     * --------------------------------------------------------- */
    applySchema(rawState) {
        const output = {};

        for (const key in Schema.model) {
            const definition = Schema.model[key];

            // If missing, apply default
            if (rawState[key] === undefined) {
                output[key] = definition.default;
                continue;
            }

            // If present, keep raw value
            output[key] = rawState[key];
        }

        // Attach schema version
        output.__schemaVersion = Schema.version;

        return output;
    },

    /* ---------------------------------------------------------
     * NORMALIZE (Canonical Formatting)
     * --------------------------------------------------------- */
    normalize(state) {
        const normalized = {};

        for (const key in state) {
            const value = state[key];
            const definition = Schema.model[key];

            // If schema has a normalization rule, apply it
            if (definition?.normalize) {
                normalized[key] = Normalize[definition.normalize](value);
            } else {
                normalized[key] = Normalize.auto(value);
            }
        }

        normalized.__schemaVersion = state.__schemaVersion;

        return normalized;
    },

    /* ---------------------------------------------------------
     * VALIDATE (Strict Rules)
     * --------------------------------------------------------- */
    validate(state) {
        const validated = { ...state };

        for (const key in state) {
            const value = state[key];
            const definition = Schema.model[key];

            if (definition?.validate) {
                const isValid = Validate[definition.validate](value);

                if (!isValid) {
                    Telemetry.warn('unified-state:validation-failed', {
                        key,
                        value,
                        rule: definition.validate
                    });

                    // Apply fallback default
                    validated[key] = definition.default;
                }
            }
        }

        return validated;
    },

    /* ---------------------------------------------------------
     * SUBSCRIBE TO STATE CHANGES
     * --------------------------------------------------------- */
    initialize() {
        Events.on('state:updated', () => {
            // Regenerate unified state whenever raw state changes
            const unified = this.get();
            Events.emit('unified-state:updated', unified);
        });

        Telemetry.log('unified-state:initialized', {
            timestamp: Date.now(),
            version: Schema.version
        });
    }
};

export default UnifiedState;