// ui/panels/alertPanel.js

import { alertLog } from "../../alerts/dispatcher.js";

export function renderAlertPanel() {
    const alerts = alertLog.latest();

    if (alerts.length === 0) {
        return `<div class="panel alerts"><h2>Alerts</h2><p>No active alerts.</p></div>`;
    }

    const items = alerts.map(a => `
        <li>
            <strong>${a.type.toUpperCase()}</strong>: ${a.message}<br>
            <small>${new Date(a.timestamp).toLocaleString()}</small>
        </li>
    `).join("");

    return `
        <div class="panel alerts">
            <h2>Financial Alerts</h2>
            <ul>${items}</ul>
        </div>
    `;
}