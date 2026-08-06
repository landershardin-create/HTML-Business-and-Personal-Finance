// engines/profitability.js

export function computeProfitability(entity) {
    const revenue = entity.metrics.revenue || 0;
    const overhead = entity.metrics.overhead || 0;
    const payroll = entity.metrics.payroll || 0;
    const grossMargin = entity.metrics.gross_margin || 1;

    const dragIndex = (overhead / revenue) - (payroll / grossMargin);

    const profitability_strength = revenue - overhead - payroll;

    return { profitability_strength, dragIndex };
}
