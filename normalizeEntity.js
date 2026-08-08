// data/schema/normalizeEntity.js

export function normalizeEntity(entity) {
    return {
        ...entity,

        liquidity: entity.liquidity ?? 0,
        leverage: entity.leverage ?? 0,
        profitability_strength: entity.profitability_strength ?? 0,
        cashflow_stability: entity.cashflow_stability ?? 0,

        overhead: entity.overhead ?? 0,
        receivable_30: entity.receivable_30 ?? 0,

        cycles: {
            inflow_day: entity.cycles?.inflow_day ?? 1,
            outflow_day: entity.cycles?.outflow_day ?? 15,
            payroll: entity.cycles?.payroll ?? 14,
            vendors: entity.cycles?.vendors ?? 20,
            taxes: entity.cycles?.taxes ?? 30
        },

        history: {
            revenue: entity.history?.revenue ?? [],
            cashflow: entity.history?.cashflow ?? []
        },

        dragIndex: entity.dragIndex ?? 0
    };
}
