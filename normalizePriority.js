// engines/priority/normalizePriority.js

export function normalizePriorityValue(value, type) {
    switch (type) {
        case "risk":
        case "opportunity":
            return Math.min(Math.max(value, 0), 100);

        case "drag":
            return Math.min(value / 2, 100);

        case "trend":
            return Math.min(Math.abs(value) * 5, 100);

        case "predictive":
            return Math.min(Math.abs(value) / 2, 100);

        default:
            return 0;
    }
}