// liquidity-buffer-panel.js
// Visual overlay for liquidity buffer requirements across the 60-day timeline.

import Format from '../../data/format.js';

export const LiquidityBufferPanel = {

    render(state, analytics) {
        const sync = analytics.cashFlowSynchronizer;
        const container = document.getElementById('panel-container');

        const LB = sync.liquidityBuffer;
        const VG = sync.volatilityGap;

        container.innerHTML = `
            <div class="lb-header">
                <h2>Liquidity Buffer Overlay</h2>
                <div class="lb-summary">
                    Required Buffer: <span>${Format.currency(LB)}</span><br>
                    Volatility Gap: <span>${Format.currency(VG)}</span>
                </div>
            </div>

            <div class="lb-chart">
                ${this.renderBars(sync)}
            </div>

            <div class="lb-recommendations">
                <h3>Liquidity Recommendations</h3>
                <ul>
                    <li>Maintain buffer above required threshold.</li>
                    <li>Increase buffer during collision-heavy periods.</li>
                    <li>Use coverage zones to rebuild liquidity.</li>
                </ul>
            </div>
        `;
    },

    renderBars(sync) {
        return sync.timeline.map(day => {
            const expenses = this.sumExpenses(day);
            const height = Math.min(100, (expenses / sync.liquidityBuffer) * 100);

            const danger = expenses > sync.liquidityBuffer;

            return `
                <div class="lb-bar ${danger ? 'danger' : ''}">
                    <div class="lb-bar-fill" style="height:${height}%"></div>
                    <div class="lb-bar-label">Day ${day.day}</div>
                </div>
            `;
        }).join('');
    },

    sumExpenses(day) {
        const sum = arr => arr.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0);
        return sum(day.personal) + sum(day.business) + sum(day.vending) + sum(day.architecture);
    }
};

export default LiquidityBufferPanel;