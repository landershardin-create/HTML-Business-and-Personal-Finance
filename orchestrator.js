// orchestrator.js
// Full analytics pipeline orchestrator for Business + Personal Finance dashboard.
// Runs engines in dependency order, enforces contracts, validates outputs,
// logs telemetry, and returns unified analytics.

import { EngineContracts } from '../engines/engine-contracts.js';
import EngineScaffolding from '../engines/engine-scaffolding.js';
import GlobalErrorBoundary from '../system/global-error-boundary.js';
import Telemetry from '../system/telemetry.js';

export const Orchestrator = {

    /* ---------------------------------------------------------
     * RUN FULL ANALYTICS PIPELINE
     * --------------------------------------------------------- */
    run(unifiedState) {
        try {
            const analytics = {};

            // Resolve execution order based on dependencies
            const order = this.resolveExecutionOrder();

            const engineInstances = {};

            // Execute engines in correct order
            for (const engineName of order) {
                const result = EngineScaffolding.run(
                    engineName,
                    unifiedState,
                    engineInstances
                );

                engineInstances[engineName] = result;
                analytics[engineName] = result;
            }

            Telemetry.log('orchestrator:run', {
                timestamp: Date.now(),
                engines: order
            });

            return analytics;

        } catch (err) {
            GlobalErrorBoundary.capture('orchestrator', {
                error: err.message
            });
            throw err;
        }
    },

    /* ---------------------------------------------------------
     * RESOLVE ENGINE EXECUTION ORDER
     * --------------------------------------------------------- */
    resolveExecutionOrder() {
        const contracts = EngineContracts;
        const visited = new Set();
        const order = [];

        const visit = name => {
            if (visited.has(name)) return;

            const contract = contracts[name];
            if (!contract) throw new Error(`Unknown engine: ${name}`);

            // Visit dependencies first
            for (const dep of contract.dependencies) {
                visit(dep);
            }

            visited.add(name);
            order.push(name);
        };

        // Visit all engines
        for (const name in contracts) {
            visit(name);
        }

        return order;
    }
};

export default Orchestrator;