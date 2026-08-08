// automation/manualUpdate.js

import { runUnifiedUpdate } from "./updatePipeline.js";

export function manualUpdate() {
    return runUnifiedUpdate("manual");
}