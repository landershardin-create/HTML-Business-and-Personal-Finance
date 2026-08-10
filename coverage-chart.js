// coverage-chart.js
// Reactive Coverage Zone Visual Chart
// Displays income-before-expense coverage zones across the 60-day timeline.

import Format from '../../data/format.js';

export const CoverageChart = {

    render(state, analytics) {
        const sync = analytics.cashFlowSynchronizer;
        const container = document.getElementById('chart-container');

        container.innerHTML = `
            <div class="coverage-chart-header">
                <h2>Coverage Zones (Income Before Expenses)</h2>
                <div class="coverage-summary">
                    Total Coverage Days: <span>${sync.coverage.length}</span>
                </div>
            </div>

            <div class="coverage-chart-grid">
                ${sync.timeline.map(day => this.renderDay(day, sync)).join('')}
            </div>
        `;
    },

    /* ---------------------------------------------------------
     * RENDER A SINGLE DAY BAR
     * --------------------------------------------------------- */
    renderDay(day, sync) {
        const isCoverage = sync.coverage.some(c => c.day === day.day);

        return `
            <div class="coverage-bar ${isCoverage ? 'coverage' : ''}">
                <div class="coverage-bar-fill" style="height:${isCoverage ? '100%' : '10%'}"></div>
                <div class="coverage-bar-label">Day ${day.day}</div>
            </div>
        `;
    }
};

export default CoverageChart;