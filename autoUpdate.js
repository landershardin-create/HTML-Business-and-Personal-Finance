// automation/autoUpdate.js

import { runUnifiedUpdate } from "./updatePipeline.js";

export function autoUpdate() {
    const observer = new MutationObserver(() => {
        runUnifiedUpdate("auto");
    });

    observer.observe(document.body, { childList: true, subtree: true });
}