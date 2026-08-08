// engines/trends/trendProfile.js

export function buildTrendProfile(points) {
    if (points.length < 2) {
        return {
            slope: 0,
            momentum: 0,
            volatility: 0
        };
    }

    const values = points.map(p => p.value);

    // Slope: direction of movement
    const slope = values[values.length - 1] - values[0];

    // Momentum: acceleration of movement
    const momentum = slope - (values[values.length - 2] - values[0]);

    // Volatility: instability
    let volatility = 0;
    for (let i = 1; i < values.length; i++) {
        volatility += Math.abs(values[i] - values[i - 1]);
    }

    return {
        slope,
        momentum,
        volatility
    };
}