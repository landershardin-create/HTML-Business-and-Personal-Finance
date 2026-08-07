// automation/updatePipeline.js

import { evaluateAlerts } from "../alerts/alertEngine.js";
import { dispatchAlerts } from "../alerts/dispatcher.js";
import { buildTrendProfile } from "../engines/trends/trendProfile.js";
import { trends } from "../storage/trends.js";

export function runUnifiedUpdate(reason, entity = null) {
    console.log(`Running unified update due to: ${reason}`);

    const entities = window.entities || [];

    const unified = updateUnifiedFinancialTruth(entities);

    const trendProfiles = {
        liquidity: buildTrendProfile(trends.latest("liquidity")),
        leverage: buildTrendProfile(trends.latest("leverage")),
        profitability: buildTrendProfile(trends.latest("profitability")),
        cashflow: buildTrendProfile(trends.latest("cashflow"))
    };

    const alerts = evaluateAlerts(unified, trendProfiles);

    dispatchAlerts(alerts);

    return unified;
}