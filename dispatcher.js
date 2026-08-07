// alerts/dispatcher.js

export const alertLog = {
    alerts: [],

    add(alert) {
        this.alerts.push({
            ...alert,
            timestamp: Date.now()
        });
    },

    latest() {
        return this.alerts.slice(-10);
    }
};

export function dispatchAlerts(alerts) {
    alerts.forEach(a => alertLog.add(a));
}