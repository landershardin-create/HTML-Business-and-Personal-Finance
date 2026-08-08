// scripts/main.js
import { requireDashboardAuth } from "./router.js";
import { renderDashboard } from "./ui/render-dashboard.js";

async function init() {
  await requireDashboardAuth();
  renderDashboard();
}

init();