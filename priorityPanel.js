// ui/panels/priorityPanel.js

export function renderPriorityPanel(unified) {
    const p = unified.priority;

    const items = p.ranked.map(e => `
        <li>
            <strong>Entity ${e.entity_id}</strong><br>
            Priority Score: ${e.priority.toFixed(2)}<br>
            Risk: ${e.breakdown.riskScore.toFixed(2)}<br>
            Opportunity: ${e.breakdown.opportunityScore.toFixed(2)}<br>
            Drag: ${e.breakdown.dragScore.toFixed(2)}<br>
            Trend Danger: ${e.breakdown.trendScore.toFixed(2)}
        </li>
    `).join("");

    return `
        <div class="panel priority">
            <h2>Action Priority Ranking</h2>
            <ul>${items}</ul>
        </div>
    `;
}