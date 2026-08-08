// engine-scaffolding.js
// Provides standardized scaffolding for all analytics engines.
// Enforces purity, contracts, versioning, dependency resolution, and telemetry.

import Telemetry from '../system/telemetry.js';
import { EngineContracts } from './engine-contracts.js';

export const EngineScaffolding = {

    /* ---------------------------------------------------------
     * RUN ENGINE (Pure, Contract‑Driven)
     * --------------------------------------------------------- */
    run(engineName, unifiedState, engines) {
        const contract = EngineContracts[engineName];

        if (!contract) {
            Telemetry.error('engine:contract-missing', { engineName });
            throw new Error(`Missing engine contract: ${engineName}`);
        }

        const start = performance.now();

        try {
            // Resolve dependencies
            const deps = this.resolveDependencies(contract, engines);

            // Execute engine
            const result = contract.execute(unifiedState, deps);

            // Validate output shape
            this.validateOutput(engineName, result, contract.output);

            const end = performance.now();

            Telemetry.log('engine:run', {
                engine: engineName,
                version: contract.version,
                durationMs: end - start,
                dependencies: contract.dependencies
            });

            return result;

        } catch (err) {
            Telemetry.error('engine:run-error', {
                engine: engineName,
                error: err.message
            });
            throw err;
        }
    },

    /* ---------------------------------------------------------
     * RESOLVE DEPENDENCIES
     * --------------------------------------------------------- */
    resolveDependencies(contract, engines) {
        const resolved = {};

        for (const dep of contract.dependencies) {
            if (!engines[dep]) {
                throw new Error(`Missing dependency engine: ${dep}`);
            }
            resolved[dep] = engines[dep];
        }

        return resolved;
    },

    /* ---------------------------------------------------------
     * VALIDATE ENGINE OUTPUT
     * --------------------------------------------------------- */
    validateOutput(engineName, result, expectedShape) {
        for (const key in expectedShape) {
            if (!(key in result)) {
                throw new Error(
                    `Engine ${engineName} missing output field: ${key}`
                );
            }
        }
    }
};

export default EngineScaffolding;