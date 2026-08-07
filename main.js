// main.js

import { startScheduler } from "./automation/scheduler.js";

window.onload = () => {
    startScheduler();
    console.log("Financial automation system online.");
};