// ui/panels/opportunityPanel.js

export function renderOpportunityPanel(unified) {
    const opp = unified.opportunity;

    const items = opp.entities.map(e => `
        <li>
            <strong>Entity ${e.entity_id}</strong><br>
            Opportunity Score: ${e.score.toFixed(2)}<br>
            Profitability Momentum: ${e.breakdown.profitabilityOpp}<br>
            Liquidity Improvement: ${e.breakdown.liquidityOpp}<br>
            Leverage Reduction: ${e.breakdown.leverageOpp}<br>
            Cash‑Flow Improvement: ${e.breakdown.cashflowOpp}<br>
            Volatility Reduction: ${e.breakdown.volatilityOpp}
        </li>
    `).join("");

    return `
        <div class="panel opportunity">
            <h2>Opportunity Analysis</h2>
            <p><strong>Total Operational Opportunity:</strong> ${opp.totalOpportunity.toFixed(2)}</p>
            <ul>${items}</ul>
        </div>
    `;
}