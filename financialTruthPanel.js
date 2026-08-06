// ui/panels/financialTruthPanel.js

import { financial_synthesis } from "../../storage/financial_synthesis.js";

export function renderFinancialTruthPanel(entity_id) {
    const data = financial_synthesis.latest(entity_id);

    if (!data) {
        return `<div>No financial data available for entity ${entity_id}</div>`;
    }

    return `
        <div class="panel financial-truth">
            <h2>Financial Truth — Entity ${entity_id}</h2>
            <ul>
                <li><strong>Liquidity Stability:</strong> ${data.liquidity_score}</li>
                <li><strong>Leverage Risk:</strong> ${data.leverage_risk}</li>
                <li><strong>Profitability Strength:</strong> ${data.profitability_strength}</li>
                <li><strong>Cash‑Flow Stability:</strong> ${data.cashflow_stability}</li>
            </ul>
        </div>
    `;
}
