// automation/eventHooks.js

import { runUnifiedUpdate } from "./updatePipeline.js";

export const eventHooks = {
    revenuePosted(entity) {
        runUnifiedUpdate("revenue", entity);
    },

    expenseAdded(entity) {
        runUnifiedUpdate("expense", entity);
    },

    payrollRun(entity) {
        runUnifiedUpdate("payroll", entity);
    },

    vendorPaid(entity) {
        runUnifiedUpdate("vendor", entity);
    },

    taxPaid(entity) {
        runUnifiedUpdate("tax", entity);
    },

    receivablePosted(entity) {
        runUnifiedUpdate("receivable", entity);
    }
};