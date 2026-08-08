// global-error-boundary.js
// System-wide error boundary for Business + Personal Finance dashboard.
// Captures orchestrator, engine, state, persistence, and UI errors.
// Ensures safe fallback behavior and telemetry logging.

import Telemetry from '../system/telemetry.js';
import UIComponents from '../ui/components.js';

export const GlobalErrorBoundary = {

    /* ---------------------------------------------------------
     * INITIALIZE GLOBAL ERROR HANDLERS
     * --------------------------------------------------------- */
    init() {
        // JS runtime errors
        window.onerror = (msg, src, line, col, err) => {
            this.capture('runtime', {
                message: msg,
                source: src,
                line,
                col,
                error: err?.stack || err
            });
        };

        // Promise rejections
        window.onunhandledrejection = event => {
            this.capture('promise', {
                message: event.reason?.message || 'Unhandled rejection',
                error: event.reason
            });
        };

        Telemetry.log('error-boundary:init', {
            timestamp: Date.now()
        });
    },

    /* ---------------------------------------------------------
     * CAPTURE ANY ERROR
     * --------------------------------------------------------- */
    capture(type, details) {
        Telemetry.error(`global:${type}`, details);

        // Show user-friendly UI message
        UIComponents.showErrorBanner('A system error occurred. Recovery engaged.');

        // Attempt safe fallback
        this.safeFallback();

        // Prevent crash
        return true;
    },

    /* ---------------------------------------------------------
     * SAFE FALLBACK RECOVERY
     * --------------------------------------------------------- */
    safeFallback() {
        try {
            // Hide loading spinner if stuck
            UIComponents.hideLoading();

            // Attempt to re-render last known good state
            const lastState = this.getLastKnownState();
            const lastAnalytics = this.getLastKnownAnalytics();

            if (lastState) {
                const Panels = require('../ui/render-panels.js').default;
                Panels.render(lastState, 'overview', lastAnalytics);
            }

            Telemetry.log('error-boundary:fallback', {
                timestamp: Date.now()
            });

        } catch (err) {
            Telemetry.error('error-boundary:fallback-error', err);
        }
    },

    /* ---------------------------------------------------------
     * LAST KNOWN GOOD STATE
     * --------------------------------------------------------- */
    getLastKnownState() {
        try {
            const raw = localStorage.getItem('lastKnownState');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    /* ---------------------------------------------------------
     * LAST KNOWN ANALYTICS
     * --------------------------------------------------------- */
    getLastKnownAnalytics() {
        try {
            const raw = localStorage.getItem('lastKnownAnalytics');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    /* ---------------------------------------------------------
     * STORE LAST KNOWN GOOD SNAPSHOTS
     * --------------------------------------------------------- */
    snapshot(state, analytics) {
        try {
            localStorage.setItem('lastKnownState', JSON.stringify(state));
            localStorage.setItem('lastKnownAnalytics', JSON.stringify(analytics));

            Telemetry.log('error-boundary:snapshot', {
                timestamp: Date.now()
            });

        } catch (err) {
            Telemetry.error('error-boundary:snapshot-error', err);
        }
    }
};

export default GlobalErrorBoundary;