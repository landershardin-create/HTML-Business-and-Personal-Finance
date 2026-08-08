// persistence.js
// Unified load/save layer for Business + Personal Finance dashboard.
// The ONLY module allowed to touch localStorage or external storage.
// Applies schema, normalization, validation, and versioning automatically.

import Schema from './schema.js';
import Normalize from './normalize.js';
import Validate from './validate.js';

import Events from '../system/events.js';
import Telemetry from '../system/telemetry.js';

const STORAGE_KEY = 'LN-Finance-State-v' + Schema.version;

export const Persistence = {

    /* ---------------------------------------------------------
     * LOAD STATE FROM STORAGE
     * --------------------------------------------------------- */
    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);

            if (!raw) {
                Telemetry.log('persistence:load-empty', { key: STORAGE_KEY });
                return this.applyDefaults();
            }

            const parsed = JSON.parse(raw);

            // Apply schema defaults + versioning
            const versioned = this.applySchema(parsed);

            // Normalize values
            const normalized = this.normalize(versioned);

            // Validate values
            const validated = this.validate(normalized);

            Telemetry.log('persistence:load-success', {
                key: STORAGE_KEY,
                timestamp: Date.now()
            });

            return validated;

        } catch (err) {
            Telemetry.error('persistence:load-error', err);
            return this.applyDefaults();
        }
    },

    /* ---------------------------------------------------------
     * SAVE STATE TO STORAGE
     * --------------------------------------------------------- */
    save(state) {
        try {
            // Normalize before saving
            const normalized = this.normalize(state);

            // Validate before saving
            const validated = this.validate(normalized);

            localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));

            Telemetry.log('persistence:save-success', {
                key: STORAGE_KEY,
                timestamp: Date.now()
            });

            Events.emit('persistence:saved', validated);

        } catch (err) {
            Telemetry.error('persistence:save-error', err);
            Events.emit('persistence:error', err);
        }
    },

    /* ---------------------------------------------------------
     * CLEAR STORAGE
     * --------------------------------------------------------- */
    clear() {
        localStorage.removeItem(STORAGE_KEY);

        Telemetry.log('persistence:clear', {
            key: STORAGE_KEY,
            timestamp: Date.now()
        });

        Events.emit('persistence:cleared');
    },

    /* ---------------------------------------------------------
     * APPLY SCHEMA DEFAULTS
     * --------------------------------------------------------- */
    applyDefaults() {
        const defaults = {};

        for (const key in Schema.model) {
            defaults[key] = Schema.model[key].default;
        }

        defaults.__schemaVersion = Schema.version;

        return defaults;
    },

    /* ---------------------------------------------------------
     * APPLY SCHEMA (Defaults + Versioning)
     * --------------------------------------------------------- */
    applySchema(rawState) {
        const output = {};

        for (const key in Schema.model) {
            const def = Schema.model[key];

            if (rawState[key] === undefined) {
                output[key] = def.default;
            } else {
                output[key] = rawState[key];
            }
        }

        output.__schemaVersion = Schema.version;

        return output;
    },

    /* ---------------------------------------------------------
     * NORMALIZE VALUES
     * --------------------------------------------------------- */
    normalize(state) {
        const normalized = {};

        for (const key in state) {
            const value = state[key];
            const def = Schema.model[key];

            if (def?.normalize) {
                normalized[key] = Normalize[def.normalize](value);
            } else {
                normalized[key] = Normalize.auto(value);
            }
        }

        normalized.__schemaVersion = state.__schemaVersion;

        return normalized;
    },

    /* ---------------------------------------------------------
     * VALIDATE VALUES
     * --------------------------------------------------------- */
    validate(state) {
        const validated = { ...state };

        for (const key in state) {
            const value = state[key];
            const def = Schema.model[key];

            if (def?.validate) {
                const ok = Validate[def.validate](value);

                if (!ok) {
                    Telemetry.warn('persistence:validation-failed', {
                        key,
                        value,
                        rule: def.validate
                    });

                    validated[key] = def.default;
                }
            }
        }

        return validated;
    }
};

export default Persistence;