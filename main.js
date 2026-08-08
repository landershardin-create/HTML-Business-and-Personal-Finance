import { loadUnifiedState } from "./data/state.js";
import { migrateSnapshot } from "./data/migrate.js";
import { renderDashboard } from "./ui/dashboard.js";
import { requireDashboardAuth } from "./router.js";

async function init() {
  const ok = await requireDashboardAuth();
  if (!ok) return;

  const snapshot = await loadUnifiedState();
  const migrated = migrateSnapshot(snapshot);

  renderDashboard(migrated);
}

init();