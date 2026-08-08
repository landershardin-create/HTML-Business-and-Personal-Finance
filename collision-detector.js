// collision-detector.js
// Standalone collision zone detector for multi-entity cash-flow synchronization.
// Identifies days where multiple entities produce overlapping financial events.

export const CollisionDetector = {

    /* ---------------------------------------------------------
     * DETECT COLLISION ZONES
     * --------------------------------------------------------- */
    detect(timeline, threshold = 3) {
        return timeline.filter(day => {
            const totalEvents =
                day.personal.length +
                day.business.length +
                day.vending.length +
                day.architecture.length +
                day.system.length;

            return totalEvents >= threshold;
        });
    },

    /* ---------------------------------------------------------
     * COUNT COLLISIONS
     * --------------------------------------------------------- */
    count(collisions) {
        return collisions.length;
    },

    /* ---------------------------------------------------------
     * COLLISION INTENSITY SCORE
     * --------------------------------------------------------- */
    intensity(collisions, timelineLength) {
        if (timelineLength === 0) return 0;

        // intensity = collisions / timelineLength
        return collisions.length / timelineLength;
    },

    /* ---------------------------------------------------------
     * COLLISION RATING (Human-readable)
     * --------------------------------------------------------- */
    rating(intensity) {
        if (intensity >= 0.40) return 'Severe';
        if (intensity >= 0.25) return 'High';
        if (intensity >= 0.15) return 'Moderate';
        if (intensity >= 0.05) return 'Low';
        return 'Minimal';
    },

    /* ---------------------------------------------------------
     * COLLISION STATUS (System-readable)
     * --------------------------------------------------------- */
    status(intensity) {
        if (intensity >= 0.40) return 'severe';
        if (intensity >= 0.25) return 'high';
        if (intensity >= 0.15) return 'moderate';
        if (intensity >= 0.05) return 'low';
        return 'minimal';
    }
};

export default CollisionDetector;