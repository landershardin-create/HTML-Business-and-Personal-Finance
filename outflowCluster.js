// engines/cashflow/outflowCluster.js

export function clusterOutflows(entity) {
    const payroll = entity.cycles.payroll || 0;
    const vendors = entity.cycles.vendors || 0;
    const taxes = entity.cycles.taxes || 0;
    const overhead = entity.metrics.overhead || 0;

    const cluster = payroll + vendors + taxes + overhead;

    return cluster;
}
// engines/predictive/outflowCluster.js

export function buildOutflowCluster(entity, cycles) {
    const overhead = entity.overhead || 0;
    const receivable_30 = entity.receivable_30 || 0;

    const cycle_outflows = [
        cycles.outflow_day,
        cycles.payroll_day,
        cycles.vendor_day,
        cycles.tax_day
    ];

    const avg_cycle_outflow = cycle_outflows.reduce((a, b) => a + b, 0) / cycle_outflows.length;

    return {
        overhead,
        receivable_30,
        avg_cycle_outflow
    };
}