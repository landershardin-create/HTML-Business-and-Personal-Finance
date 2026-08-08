// charts.js
// Reactive chart renderer for Business + Personal Finance dashboard.
// Works with controller.js, unified-state.js, orchestrator.js, and analytics outputs.

import Telemetry from '../system/telemetry.js';
import { UIComponents } from './components.js';

export const Charts = {

    /* ---------------------------------------------------------
     * CHART REGISTRY
     * --------------------------------------------------------- */
    registry: {
        incomeVsExpenses: renderIncomeVsExpenses,
        revenueVsCOGS: renderRevenueVsCOGS,
        netWorthTrend: renderNetWorthTrend,
        riskGauge: renderRiskGauge,
        priorityScore: renderPriorityScore
    },

    /* ---------------------------------------------------------
     * RENDER CHARTS (Reactive)
     * --------------------------------------------------------- */
    render(unifiedState, analytics = null) {
        try {
            const chartContainer = UIComponents.getChartContainer();
            chartContainer.innerHTML = ''; // Clear old charts

            for (const chartName in this.registry) {
                const chartFn = this.registry[chartName];

                const chartHTML = chartFn(unifiedState, analytics);

                chartContainer.insertAdjacentHTML('beforeend', chartHTML);
            }

            Telemetry.log('ui:charts-render', {
                timestamp: Date.now(),
                charts: Object.keys(this.registry)
            });

        } catch (err) {
            UIComponents.showErrorBanner('Chart rendering failed');
            Telemetry.error('ui:charts-render-error', err);
        }
    }
};

export default Charts;





/* -------------------------------------------------------------
 * CHART IMPLEMENTATIONS
 * ------------------------------------------------------------- */

function renderIncomeVsExpenses(state) {
    return `
        <div class="chart">
            <h3>Income vs Expenses</h3>
            <canvas data-chart="income-expenses"
                data-income="${state.income}"
                data-expenses="${state.expenses}">
            </canvas>
        </div>
    `;
}

function renderRevenueVsCOGS(state) {
    return `
        <div class="chart">
            <h3>Revenue vs COGS</h3>
            <canvas data-chart="revenue-cogs"
                data-revenue="${state.revenue}"
                data-cogs="${state.costOfGoods}">
            </canvas>
        </div>
    `;
}

function renderNetWorthTrend(state) {
    const history = state.accounts?.history ?? [];

    return `
        <div class="chart">
            <h3>Net Worth Trend</h3>
            <canvas data-chart="net-worth-trend"
                data-history='${JSON.stringify(history)}'>
            </canvas>
        </div>
    `;
}

function renderRiskGauge(state, analytics) {
    const level = analytics?.risk?.level ?? 0;

    return `
        <div class="chart">
            <h3>Risk Gauge</h3>
            <canvas data-chart="risk-gauge"
                data-level="${level}">
            </canvas>
        </div>
    `;
}

function renderPriorityScore(state, analytics) {
    const score = analytics?.priority?.score ?? 0;

    return `
        <div class="chart">
            <h3>Priority Score</h3>
            <canvas data-chart="priority-score"
                data-score="${score}">
            </canvas>
        </div>
    `;
}