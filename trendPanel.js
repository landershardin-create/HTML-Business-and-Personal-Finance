// ui/panels/trendPanel.js

import { trends } from "../../storage/trends.js";
import { buildTrendProfile } from "../../engines/trends/trendProfile.js";

export function renderTrendPanel() {
    const liquidityTrend = buildTrendProfile(trends.latest("liquidity"));
    const leverageTrend = buildTrendProfile(trends.latest("leverage"));
    const profitabilityTrend = buildTrendProfile(trends.latest("profitability"));
    const cashflowTrend = buildTrendProfile(trends.latest("cashflow"));

    return `
        <div class="panel trends">
            <h2>Financial Trends</h2>

            <h3>Liquidity</h3>
            <ul>
                <li>Slope: ${liquidityTrend.slope}</li>
                <li>Momentum: ${liquidityTrend.momentum}</li>
                <li>Volatility: ${liquidityTrend.volatility}</li>
            </ul>

            <h3>Leverage</h3>
            <ul>
                <li>Slope: ${leverageTrend.slope}</li>
                <li>Momentum: ${leverageTrend.momentum}</li>
                <li>Volatility: ${leverageTrend.volatility}</li>
            </ul>

            <h3>Profitability</h3>
            <ul>
                <li>Slope: ${profitabilityTrend.slope}</li>
                <li>Momentum: ${profitabilityTrend.momentum}</li>
                <li>Volatility: ${profitabilityTrend.volatility}</li>
            </ul>

            <h3>Cash‑Flow</h3>
            <ul>
                <li>Slope: ${cashflowTrend.slope}</li>
                <li>Momentum: ${cashflowTrend.momentum}</li>
                <li>Volatility: ${cashflowTrend.volatility}</li>
            </ul>
        </div>
    `;
}