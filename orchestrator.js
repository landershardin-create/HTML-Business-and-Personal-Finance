// orchestrator.js
// Central coordinator for all analytics engines.
// Pure orchestration: no UI, no persistence, no domain logic.

import State from '../../system/state.js';
import Events from '../../system/events.js';
import Telemetry from '../../system/telemetry.js';

import UnifiedState from './unified-state.js';

// Engines
import Predictive from '../predictive/index.js';
import Trends from '../trends/index.js';
import Risk from '../risk/index.js';
import Opportunity from '../opportunity/index.js';
import Priority from '../priority/index.js';
import Alerts from '../alerts/index.js';
import Comparative from '../comparative/index.js';

export const Orchestrator = {

    /* ---------------------------------------------------------
     * RUN FULL PIPELINE
     * --------------------------------------------------------- */
    async runPipeline() {
        try {
            Telemetry.log('orchestrator:start', { timestamp: Date.now() });

            // 1. Pull unified, normalized state
            const unified = UnifiedState.get();

            // 2. Run engines in deterministic order
            const predictive = Predictive.run(unified);
            const trends = Trends.run(unified);
            const risk = Risk.evaluate(unified);
            const opportunity = Opportunity.scan(unified);
            const priority = Priority.rank(unified);
            const alerts = Alerts.generate(unified);
            const comparative = Comparative.analyze(unified);

            // 3. Merge engine outputs into system state
            const analytics = {
                predictive,
                trends,
                risk,
                opportunity,
                priority,
                alerts,
                comparative
            };

            State.update('analytics', analytics);

            // 4. Emit event for UI controller
            Events.emit('analytics:updated', analytics);

            Telemetry.log('orchestrator:complete', {
                timestamp: Date.now(),
                engines: Object.keys(analytics)
            });

        } catch (err) {
            Telemetry.error('orchestrator:error', err);
            Events.emit('analytics:error', err);
        }
    },

    /* ---------------------------------------------------------
     * RUN SINGLE ENGINE (for targeted updates)
     * --------------------------------------------------------- */
    async runEngine(name) {
        try {
            const unified = UnifiedState.get();
            let result = null;

            switch (name) {
                case 'predictive':
                    result = Predictive.run(unified);
                    break;
                case 'trends':
                    result = Trends.run(unified);
                    break;
                case 'risk':
                    result = Risk.evaluate(unified);
                    break;
                case 'opportunity':
                    result = Opportunity.scan(unified);
                    break;
                case 'priority':
                    result = Priority.rank(unified);
                    break;
                case 'alerts':
                    result = Alerts.generate(unified);
                    break;
                case 'comparative':
                    result = Comparative.analyze(unified);
                    break;
                default:
                    throw new Error(`Unknown engine: ${name}`);
            }

            // Update only that engine’s output
            State.update(`analytics.${name}`, result);

            // Emit targeted event
            Events.emit(`analytics:${name}:updated`, result);

            Telemetry.log('orchestrator:engine', {
                engine: name,
                timestamp: Date.now()
            });

        } catch (err) {
            Telemetry.error('orchestrator:engine:error', {
                engine: name,
                error: err
            });
            Events.emit(`analytics:${name}:error`, err);
        }
    },

    /* ---------------------------------------------------------
     * SUBSCRIBE TO STATE CHANGES
     * --------------------------------------------------------- */
    initialize() {
        // Anytime core state changes, rerun analytics
        Events.on('state:updated', () => {
            this.runPipeline();
        });

        Telemetry.log('orchestrator:initialized', {
            timestamp: Date.now()
        });
    }
};

export default Orchestrator;