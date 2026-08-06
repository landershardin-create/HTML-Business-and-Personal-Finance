// ui/panels/crossEntityPanel.js

import { entity_relations } from "../../storage/entity_relations.js";

export function renderCrossEntityPanel(entity_id) {
    const relations = entity_relations.latestFor(entity_id);

    if (!relations || relations.length === 0) {
        return `<div>No cross‑entity data available for entity ${entity_id}</div>`;
    }

    const items = relations.map(r => `
        <li>
            <strong>${r.from_entity} → ${r.to_entity}</strong><br>
            Subsidy Index: ${r.subsidy_index.toFixed(3)}<br>
            Drag Index: ${r.drag_index.toFixed(3)}<br>
            Net Contribution: ${r.net_contribution}
        </li>
    `).join("");

    return `
        <div class="panel cross-entity">
            <h2>Cross‑Entity Drag Map — Entity ${entity_id}</h2>
            <ul>${items}</ul>
        </div>
    `;
}
