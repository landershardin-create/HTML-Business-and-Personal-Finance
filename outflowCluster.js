// engines/cashflow/outflowCluster.js

export function clusterOutflows(entity) {
    const payroll = entity.cycles.payroll || 0;
    const vendors = entity.cycles.vendors || 0;
    const taxes = entity.cycles.taxes || 0;
    const overhead = entity.metrics.overhead || 0;

    const cluster = payroll + vendors + taxes + overhead;

    return cluster;
}