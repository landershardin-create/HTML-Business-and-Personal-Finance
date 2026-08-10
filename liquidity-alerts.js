// liquidity-alerts.js
// Early-Warning Liquidity Alerts Engine
// Detects buffer breaches, volatility-driven danger, and upcoming liquidity stress.

export const LiquidityAlerts = {

    execute(timeline, liquidityBuffer, volatilityGap) {
        const alerts = [];

        const breachDays = this.detectBufferBreaches(timeline, liquidityBuffer);
        const volatilityWarning = this.detectVolatility(volatilityGap);
        const upcomingStress = this.detectUpcomingStress(timeline, liquidityBuffer);

        if (breachDays.length > 0) {
            alerts.push({
                type: 'liquidity-breach',
                severity: 'critical',
                message: `Liquidity buffer breached on ${breachDays.length} day(s).`,
                days: breachDays
            });
        }

        if (volatilityWarning) {
            alerts.push({
                type: 'volatility-warning',
                severity: 'high',
                message: 'Volatility gap exceeds safe threshold.',
                gap: volatilityGap
            });
        }

        if (upcomingStress.length > 0) {
            alerts.push({
                type: 'upcoming-stress',
                severity: 'moderate',
                message: 'Upcoming days show rising liquidity stress.',
                days: upcomingStress
            });
        }

        return alerts;
    },

    /* ---------------------------------------------------------
     * DETECT BUFFER BREACHES
     * --------------------------------------------------------- */
    detectBufferBreaches(timeline, liquidityBuffer) {
        return timeline
            .filter(day => this.sumExpenses(day) > liquidityBuffer)
            .map(day => day.day);
    },

    /* ---------------------------------------------------------
     * DETECT VOLATILITY WARNINGS
     * --------------------------------------------------------- */
    detectVolatility(volatilityGap) {
        return volatilityGap > 2500; // threshold
    },

    /* ---------------------------------------------------------
     * DETECT UPCOMING STRESS (3-day rolling window)
     * --------------------------------------------------------- */
    detectUpcomingStress(timeline, liquidityBuffer) {
        const stressDays = [];

        for (let i = 0; i < timeline.length - 3; i++) {
            const window = timeline.slice(i, i + 3);
            const totalExpenses = window.reduce((s, d) => s + this.sumExpenses(d), 0);

            if (totalExpenses > liquidityBuffer * 2) {
                stressDays.push(i + 1);
            }
        }

        return stressDays;
    },

    /* ---------------------------------------------------------
     * SUM EXPENSES FOR A DAY
     * --------------------------------------------------------- */
    sumExpenses(day) {
        const sum = arr => arr.filter(e => e.type === 'expense')
                              .reduce((s, e) => s + e.amount, 0);

        return sum(day.personal) +
               sum(day.business) +
               sum(day.vending) +
               sum(day.architecture);
    }
};

export default LiquidityAlerts;