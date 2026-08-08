// render-panels.js
// Reactive panel renderer for the Business + Personal Finance dashboard.
// Works with controller.js, unified-state.js, orchestrator.js, and analytics outputs.

import Telemetry from '../system/telemetry.js';
import { UIComponents } from './components.js';

export const Panels = {

    /* ---------------------------------------------------------
     * PANEL REGISTRY
     * --------------------------------------------------------- */
    registry: {
        overview: renderOverviewPanel,
        finance: renderFinancePanel,
        business: renderBusinessPanel,
        analytics: renderAnalyticsPanel,
        inventory: renderInventoryPanel,
        vendors: renderVendorsPanel,
        settings: renderSettingsPanel
    },

    /* ---------------------------------------------------------
     * RENDER PANELS (Reactive)
     * --------------------------------------------------------- */
    render(unifiedState, activePanel = 'overview', analytics = null) {
        try {
            const panelFn = this.registry[activePanel];

            if (!panelFn) {
                console.warn(`Unknown panel: ${activePanel}`);
                return;
            }

            const html = panelFn(unifiedState, analytics);

            UIComponents.updatePanelContainer(html);

            Telemetry.log('ui:panel-render', {
                panel: activePanel,
                timestamp: Date.now()
            });

        } catch (err) {
            UIComponents.showErrorBanner('Panel rendering failed');
            Telemetry.error('ui:panel-render-error', err);
        }
    }
};

export default Panels;





/* -------------------------------------------------------------
 * PANEL IMPLEMENTATIONS
 * ------------------------------------------------------------- */

function renderOverviewPanel(state, analytics) {
    return `
        <div class="panel">
            <h2>Overview</h2>
            <p><strong>Income:</strong>

{state.income}</p>
            <p><strong>Expenses:</strong> 

{state.expenses}</p>
            <p><strong>Net Worth:</strong> $${state.netWorth}</p>

            ${analytics ? renderAnalyticsSummary(analytics) : ''}
        </div>
    `;
}

function renderFinancePanel(state, analytics) {
    return `
        <div class="panel">
            <h2>Personal Finance</h2>
            <p><strong>Income:</strong>

{state.income}</p>
            <p><strong>Expenses:</strong> 

{state.expenses}</p>
            <p><strong>Budget Categories:</strong> ${Object.keys(state.budget).length}</p>

            ${analytics ? renderAnalyticsSummary(analytics) : ''}
        </div>
    `;
}

function renderBusinessPanel(state, analytics) {
    return `
        <div class="panel">
            <h2>Business Finance</h2>
            <p><strong>Revenue:</strong>

{state.revenue}</p>
            <p><strong>COGS:</strong> 

{state.costOfGoods}</p>
            <p><strong>Operating Expenses:</strong> $${state.operatingExpenses}</p>

            ${analytics ? renderAnalyticsSummary(analytics) : ''}
        </div>
    `;
}

function renderInventoryPanel(state) {
    return `
        <div class="panel">
            <h2>Inventory</h2>
            <ul>
                ${state.inventory.map(item => `<li>${item.name} — ${item.quantity}</li>`).join('')}
            </ul>
        </div>
    `;
}

function renderVendorsPanel(state) {
    return `
        <div class="panel">
            <h2>Vendors</h2>
            <ul>
                ${state.vendors.map(v => `<li>${v.name} — ${v.cost}</li>`).join('')}
            </ul>
        </div>
    `;
}

function renderSettingsPanel(state) {
    return `
        <div class="panel">
            <h2>Settings</h2>
            <p><strong>Theme:</strong> ${state.settings.theme}</p>
            <p><strong>Currency:</strong> ${state.settings.currency}</p>
            <p><strong>Locale:</strong> ${state.settings.locale}</p>
        </div>
    `;
}



/* -------------------------------------------------------------
 * ANALYTICS OVERLAY (Reusable)
 * ------------------------------------------------------------- */

function renderAnalyticsSummary(analytics) {
    return `
        <div class="analytics-summary">
            <h3>Analytics Summary</h3>
            <p><strong>Risk Level:</strong> ${analytics.risk?.level ?? 'N/A'}</p>
            <p><strong>Priority Score:</strong> ${analytics.priority?.score ?? 'N/A'}</p>
            <p><strong>Alerts:</strong> ${analytics.alerts?.count ?? 0}</p>
        </div>
    `;
}