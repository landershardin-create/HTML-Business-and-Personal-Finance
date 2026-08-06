// ui/panels/predictiveCashflowPanel.js

export function renderPredictiveCashflowPanel(entity) {
    const p = entity.predictive_details;

    return `
        <div class="panel predictive-cashflow">
            <h2>Predictive Cash‑Flow — Entity ${entity.entity_id}</h2>
            <ul>
                <li><strong>Predicted Inflow:</strong> ${p.inflow}</li>
                <li><strong>Clustered Outflow:</strong> ${p.outflow}</li>
                <li><strong>Cycle Alignment:</strong> ${p.alignment}</li>
                <li><strong>Volatility:</strong> ${p.volatility}</li>
                <li><strong>Predictability Score:</strong> ${p.predictabilityScore}</li>
            </ul>
        </div>
    `;
}