// controller.js
// The UI brain: reacts to state changes, triggers orchestrator,
// updates dashboard panels, and handles user interactions.

import State from '../system/state.js';
import Events from '../system/events.js';
import Telemetry from '../system/telemetry.js';

import UnifiedState from '../engines/synthesis/unified-state.js';
import Orchestrator from '../engines/synthesis/orchestrator.js';

import { renderDashboard } from './render-dashboard.js';
import { renderPanels } from './render-panels.js';
import { updateCharts } from './charts.js';
import { UIComponents } from './components.js';

export const Controller = {

    /* ---------------------------------------------------------
     * INITIALIZE UI CONTROLLER
     * --------------------------------------------------------- */
    initialize() {
        Telemetry.log('controller:initialize', { timestamp: Date.now() });

        // 1. Bind UI events (buttons, inputs, etc.)
        this.bindUIEvents();

        // 2. Listen for unified-state updates
        Events.on('unified-state:updated', (unified) => {
            this.updateUI(unified);
        });

        // 3. Listen for analytics updates
        Events.on('analytics:updated', (analytics) => {
            this.updateAnalyticsUI(analytics);
        });

        // 4. Listen for errors
        Events.on('analytics:error', (err) => {
            this.showError(err);
        });

        // 5. Initial render
        const unified = UnifiedState.get();
        renderDashboard(unified);
        renderPanels(unified);
        updateCharts(unified);

        // 6. Kick off orchestrator pipeline
        Orchestrator.runPipeline();
    },

    /* ---------------------------------------------------------
     * BIND UI EVENTS
     * --------------------------------------------------------- */
    bindUIEvents() {
        // Example: user updates a financial input
        UIComponents.onInputChange((key, value) => {
            State.update(key, value);
            Telemetry.log('controller:input-change', { key, value });
        });

        // Example: user triggers manual analytics refresh
        UIComponents.onRefreshClick(() => {
            Orchestrator.runPipeline();
            Telemetry.log('controller:manual-refresh', { timestamp: Date.now() });
        });

        // Example: user switches dashboard panels
        UIComponents.onPanelSwitch((panel) => {
            renderPanels(UnifiedState.get(), panel);
            Telemetry.log('controller:panel-switch', { panel });
        });
    },

    /* ---------------------------------------------------------
     * UPDATE UI WHEN UNIFIED STATE CHANGES
     * --------------------------------------------------------- */
    updateUI(unified) {
        try {
            renderDashboard(unified);
            renderPanels(unified);
            updateCharts(unified);

            Telemetry.log('controller:update-ui', {
                timestamp: Date.now(),
                keys: Object.keys(unified)
            });

        } catch (err) {
            this.showError(err);
        }
    },

    /* ---------------------------------------------------------
     * UPDATE UI WHEN ANALYTICS CHANGE
     * --------------------------------------------------------- */
    updateAnalyticsUI(analytics) {
        try {
            // Panels that depend on analytics
            renderPanels(UnifiedState.get(), null, analytics);

            // Charts that depend on analytics
            updateCharts(UnifiedState.get(), analytics);

            Telemetry.log('controller:update-analytics-ui', {
                timestamp: Date.now(),
                engines: Object.keys(analytics)
            });

        } catch (err) {
            this.showError(err);
        }
    },

    /* ---------------------------------------------------------
     * SHOW ERRORS IN UI
     * --------------------------------------------------------- */
    showError(err) {
        UIComponents.showErrorBanner(err.message || 'Unknown error');
        Telemetry.error('controller:error', err);
    }
};

export default Controller;