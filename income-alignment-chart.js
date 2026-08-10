// income-alignment-chart.js
// Multi-Entity Income Alignment Chart
// Displays aligned income streams across the 60-day synchronized timeline.

import Format from '../../data/format.js';

export const IncomeAlignmentChart = {

    render(state, analytics) {
        const sync = analytics.cashFlowSynchronizer;
        const container = document.getElementById('chart-container');

        const incomeData = this.buildIncomeData(sync.timeline);

        container.innerHTML = `
            <div class="income-chart-header">
                <h2>Multi-Entity Income Alignment</h2>
                <div class="income-chart-legend">
                    <span class="legend personal">Personal</span>
                    <span class="legend business">Business</span>
                    <span class="legend vending">Vending</span>
                    <span class="legend architecture">Architecture</span>
                    <span class="legend system">System</span>
                </div>
            </div>

            <svg class="income-chart" viewBox="0 0 1200 300">
                ${this.renderLines(incomeData)}
            </svg>
        `;
    },

    /* ---------------------------------------------------------
     * BUILD INCOME DATA FOR EACH ENTITY
     * --------------------------------------------------------- */
    buildIncomeData(timeline) {
        const extract = (day, domain) =>
            day[domain].filter(e => e.type === 'income')
                       .reduce((s, e) => s + e.amount, 0);

        return {
            personal: timeline.map(day => extract(day, 'personal')),
            business: timeline.map(day => extract(day, 'business')),
            vending: timeline.map(day => extract(day, 'vending')),
            architecture: timeline.map(day => extract(day, 'architecture')),
            system: timeline.map(day => extract(day, 'system'))
        };
    },

    /* ---------------------------------------------------------
     * RENDER SVG LINES
     * --------------------------------------------------------- */
    renderLines(data) {
        const domains = Object.keys(data);
        const colors = {
            personal: 'var(--success)',
            business: 'var(--accent)',
            vending: 'var(--warning)',
            architecture: 'var(--info)',
            system: 'var(--danger)'
        };

        return domains.map(domain => {
            const points = data[domain]
                .map((value, i) => `${i * 20},${300 - value / 10}`)
                .join(' ');

            return `
                <polyline 
                    points="${points}" 
                    fill="none" 
                    stroke="${colors[domain]}" 
                    stroke-width="3"
                    class="line-${domain}"
                />
            `;
        }).join('');
    }
};

export default IncomeAlignmentChart;