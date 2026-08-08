// scripts/ui/render-dashboard.js
import { lazyLoadPanels } from "./render-panels.js";

export function renderDashboard() {
  document.getElementById("dashboard-root").innerHTML = `
    <div class="panel" id="overview-panel"></div>
    <div class="panel" id="trend-panel"></div>
    <div class="panel" id="priority-panel"></div>
    <div class="panel" id="comparative-panel"></div>
  `;

  lazyLoadPanels();
}

// scripts/ui/render-panels.js
export function lazyLoadPanels() {
  requestIdleCallback(() => renderTrendPanel());
  requestIdleCallback(() => renderPriorityPanel());
  requestIdleCallback(() => renderComparativePanel());
}