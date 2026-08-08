// stability-score.js
// Pure stability score calculator for multi-entity cash-flow synchronization.
// Computes stability based on collision density across a 60-day timeline.

export const StabilityScore = {

    /* ---------------------------------------------------------
     * CALCULATE STABILITY SCORE
     * --------------------------------------------------------- */
    calculate(timeline, collisions) {
        const totalDays = timeline.length;
        const collisionDays = collisions.length;

        // Stability formula:
        // S = 1 - (collisionDays / totalDays)
        const score = Math.max(0, 1 - collisionDays / totalDays);

        return {
            score,
            rating: this.rating(score),
            status: this.status(score)
        };
    },

    /* ---------------------------------------------------------
     * RATING (Human-readable)
     * --------------------------------------------------------- */
    rating(score) {
        if (score >= 0.85) return 'Excellent';
        if (score >= 0.70) return 'Stable';
        if (score >= 0.50) return 'Unstable';
        if (score >= 0.30) return 'Danger';
        return 'Critical';
    },

    /* ---------------------------------------------------------
     * STATUS (System-readable)
     * --------------------------------------------------------- */
    status(score) {
        if (score >= 0.85) return 'excellent';
        if (score >= 0.70) return 'stable';
        if (score >= 0.50) return 'unstable';
        if (score >= 0.30) return 'danger';
        return 'critical';
    }
};

export default StabilityScore;