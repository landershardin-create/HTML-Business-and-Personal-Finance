// ui/panels/riskPanel.js

export function renderRiskPanel(unified) {
    const risk = unified.risk;

    const items = risk.entities.map(e => `
        <li>
            <strong>Entity ${e.entity_id}</strong><br>
            Risk Score: ${e.score.toFixed(2)}<br>
            Liquidity Risk: ${e.breakdown.liquidityRisk}<br>
            Leverage Risk: ${e.breakdown.leverageRisk}<br>
            Profitability Risk: ${e.breakdown.profitabilityRisk}<br>
            Cash‑Flow Risk: ${e.breakdown.cashflowRisk}<br>
            Volatility Risk: ${e.breakdown.volatilityRisk}
        </li>
    `).join("");

    return `
        <div class="panel risk">
            <h2>Risk Analysis</h2>
            <p><strong>Total Operational Risk:</strong> ${risk.totalRisk.toFixed(2)}</p>
            <ul>${items}</ul>
        </div>
    `;
}