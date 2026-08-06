// ui/panels/unifiedTruthPanel.js

import { unified_state } from "../../storage/unified_state.js";

export function renderUnifiedTruthPanel() {
    const data = unified_state.latest();

    if (!data) {
        return `<div>No unified financial data available.</div>`;
    }

    return `
        <div class="panel unified-truth">
            <h2>Unified Financial Truth</h2>
            <ul>
                <li><strong>Total Liquidity:</strong> ${data.totals.liquidity}</li>
                <li><strong>Total Leverage Risk:</strong> ${data.totals.leverage}</li>
                <li><strong>Total Profitability:</strong> ${data.totals.profitability}</li>
                <li><strong>Total Cash‑Flow Stability:</strong> ${data.totals.cashflow}</li>
            </ul>
        </div>
    `;
}