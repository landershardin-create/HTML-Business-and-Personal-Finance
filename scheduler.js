// automation/scheduler.js

import { runUnifiedUpdate } from "./updatePipeline.js";

export function startScheduler() {
    // Hourly updates
    setInterval(() => {
        runUnifiedUpdate("hourly");
    }, 1000 * 60 * 60);

    // Daily updates
    setInterval(() => {
        runUnifiedUpdate("daily");
    }, 1000 * 60 * 60 * 24);

    // Cycle-based updates (every 6 hours)
    setInterval(() => {
        runUnifiedUpdate("cycle");
    }, 1000 * 60 * 60 * 6);
}