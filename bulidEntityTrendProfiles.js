// engines/trends/buildEntityTrendProfiles.js

import { trends } from "../../storage/trends.js";
import { buildTrendProfile } from "./trendProfile.js";

export function buildEntityTrendProfiles(entities) {
    const profiles = {};

    entities.forEach(e => {
        profiles[e.entity_id] = {
            liquidity: buildTrendProfile(trends.latest(e.entity_id, "liquidity")),
            leverage: buildTrendProfile(trends.latest(e.entity_id, "leverage")),
            profitability: buildTrendProfile(trends.latest(e.entity_id, "profitability")),
            cashflow: buildTrendProfile(trends.latest(e.entity_id, "cashflow")),
            drag: buildTrendProfile(trends.latest(e.entity_id, "drag"))
        };
    });

    return profiles;
}