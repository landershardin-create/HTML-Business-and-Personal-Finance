// engines/predictive/extractCycles.js

export function extractCycles(entity) {
    return {
        inflow_day: entity.cycles?.inflow_day || 1,
        outflow_day: entity.cycles?.outflow_day || 15,
        payroll_day: entity.cycles?.payroll || 14,
        vendor_day: entity.cycles?.vendors || 20,
        tax_day: entity.cycles?.taxes || 30
    };
}