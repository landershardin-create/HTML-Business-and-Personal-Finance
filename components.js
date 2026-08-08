// components.js
// Reactive UI components for Business + Personal Finance dashboard.
// Provides safe DOM update functions, event bindings, and component helpers.

import Telemetry from '../system/telemetry.js';

export const UIComponents = {

    /* ---------------------------------------------------------
     * PANEL CONTAINER
     * --------------------------------------------------------- */
    getPanelContainer() {
        return document.querySelector('#panel-container');
    },

    updatePanelContainer(html) {
        const container = this.getPanelContainer();
        if (!container) return;

        container.innerHTML = html;

        Telemetry.log('ui:panel-container:update', {
            timestamp: Date.now()
        });
    },

    /* ---------------------------------------------------------
     * CHART CONTAINER
     * --------------------------------------------------------- */
    getChartContainer() {
        return document.querySelector('#chart-container');
    },

    /* ---------------------------------------------------------
     * ERROR BANNER
     * --------------------------------------------------------- */
    showErrorBanner(message) {
        const banner = document.querySelector('#error-banner');
        if (!banner) return;

        banner.textContent = message;
        banner.style.display = 'block';

        Telemetry.error('ui:error-banner', { message });
    },

    hideErrorBanner() {
        const banner = document.querySelector('#error-banner');
        if (!banner) return;

        banner.style.display = 'none';
    },

    /* ---------------------------------------------------------
     * INPUT HANDLING (Reactive)
     * --------------------------------------------------------- */
    onInputChange(callback) {
        document.querySelectorAll('[data-input]').forEach(input => {
            input.addEventListener('input', e => {
                const key = e.target.getAttribute('data-input');
                const value = e.target.value;

                callback(key, value);

                Telemetry.log('ui:input-change', {
                    key,
                    value,
                    timestamp: Date.now()
                });
            });
        });
    },

    /* ---------------------------------------------------------
     * REFRESH BUTTON
     * --------------------------------------------------------- */
    onRefreshClick(callback) {
        const btn = document.querySelector('#refresh-btn');
        if (!btn) return;

        btn.addEventListener('click', () => {
            callback();

            Telemetry.log('ui:refresh-click', {
                timestamp: Date.now()
            });
        });
    },

    /* ---------------------------------------------------------
     * PANEL SWITCHING
     * --------------------------------------------------------- */
    onPanelSwitch(callback) {
        document.querySelectorAll('[data-panel]').forEach(btn => {
            btn.addEventListener('click', e => {
                const panel = e.target.getAttribute('data-panel');

                callback(panel);

                Telemetry.log('ui:panel-switch', {
                    panel,
                    timestamp: Date.now()
                });
            });
        });
    },

    /* ---------------------------------------------------------
     * LOADING SPINNER
     * --------------------------------------------------------- */
    showLoading() {
        const spinner = document.querySelector('#loading-spinner');
        if (!spinner) return;

        spinner.style.display = 'block';
    },

    hideLoading() {
        const spinner = document.querySelector('#loading-spinner');
        if (!spinner) return;

        spinner.style.display = 'none';
    }
};

export default UIComponents;