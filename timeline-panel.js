// timeline-panel.js
// 60-Day Multi-Entity Cash-Flow Synchronizer Timeline Panel
// Renders timeline, collision zones, coverage zones, stability score,
// and liquidity buffer overlay.

import Format from '../../data/format.js';
import UIComponents from '../components.js';

export const TimelinePanel = {

    render(state, analytics) {
        const sync = analytics.cashFlowSynchronizer;
        const container = document.getElementById('panel-container');

        container.innerHTML = `
            <div class="timeline-header">
                <h2>60-Day Cash-Flow Synchronizer</h2>
                <div class="stability-score">
                    Stability Score: <span>${Format.percent(sync.stabilityScore)}</span>
                </div>
            </div>

            <div class="timeline-grid">
                ${sync.timeline.map(day => this.renderDay(day, sync)).join('')}
            </div>

            <div class="timeline-recommendations">
                <h3>Recommendations</h3>
                <ul>
                    ${sync.recommendations.map(r => `<li>${r}</li>`).join('')}
                </ul>
            </div>
        `;
    },

    /* ---------------------------------------------------------
     * RENDER A SINGLE DAY CELL
     * --------------------------------------------------------- */
    renderDay(day, sync) {
        const isCollision = sync.collisions.some(c => c.day === day.day);
        const isCoverage = sync.coverage.some(c => c.day === day.day);

        return `
            <div class="timeline-day ${isCollision ? 'collision' : ''} ${isCoverage ? 'coverage' : ''}">
                <div class="day-number">Day ${day.day}</div>

                <div class="events">
                    ${this.renderEvents('Personal', day.personal)}
                    ${this.renderEvents('Business', day.business)}
                    ${this.renderEvents('Vending', day.vending)}
                    ${this.renderEvents('Architecture', day.architecture)}
                    ${this.renderEvents('System', day.system)}
                </div>
            </div>
        `;
    },

    /* ---------------------------------------------------------
     * RENDER EVENTS FOR A DOMAIN
     * --------------------------------------------------------- */
    renderEvents(label, events) {
        if (!events.length) return '';

        return `
            <div class="event-group">
                <div class="event-label">${label}</div>
                ${events.map(e => `
                    <div class="event ${e.type}">
                        ${e.type === 'income' ? '+' : '-'}${Format.currency(e.amount)}
                    </div>
                `).join('')}
            </div>
        `;
    }
};

export default TimelinePanel;