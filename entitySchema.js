// data/schema/entitySchema.js

export const EntitySchema = {
    entity_id: "string",

    liquidity: "number",
    leverage: "number",
    profitability_strength: "number",
    cashflow_stability: "number",

    predictive: "object?",

    cycles: {
        inflow_day: "number",
        outflow_day: "number",
        payroll: "number",
        vendors: "number",
        taxes: "number"
    },

    history: {
        revenue: "array?",
        cashflow: "array?"
    },

    overhead: "number",
    receivable_30: "number",

    dragIndex: "number?"
};