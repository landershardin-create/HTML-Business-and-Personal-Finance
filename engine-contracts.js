// engine-contracts.js
// Defines strict contracts for all analytics engines.
// Ensures predictable inputs, outputs, dependencies, and metadata.

export const EngineContracts = {

    predictive: {
        name: 'predictive',
        description: 'Forecasts future financial and business metrics',
        input: 'unifiedState',
        output: {
            forecast: 'object',
            confidence: 'number'
        },
        dependencies: ['trends'],
        version: 1
    },

    trends: {
        name: 'trends',
        description: 'Analyzes historical patterns and movement',
        input: 'unifiedState',
        output: {
            movement: 'object',
            direction: 'string'
        },
        dependencies: [],
        version: 1
    },

    risk: {
        name: 'risk',
        description: 'Evaluates financial and operational risk levels',
        input: 'unifiedState',
        output: {
            level: 'number',
            factors: 'array'
        },
        dependencies: ['predictive', 'trends'],
        version: 1
    },

    opportunity: {
        name: 'opportunity',
        description: 'Identifies potential gains or optimization areas',
        input: 'unifiedState',
        output: {
            opportunities: 'array',
            score: 'number'
        },
        dependencies: ['risk', 'trends'],
        version: 1
    },

    priority: {
        name: 'priority',
        description: 'Ranks tasks, risks, and opportunities by importance',
        input: 'unifiedState',
        output: {
            score: 'number',
            ranking: 'array'
        },
        dependencies: ['risk', 'opportunity'],
        version: 1
    },

    alerts: {
        name: 'alerts',
        description: 'Generates actionable alerts based on thresholds',
        input: 'unifiedState',
        output: {
            count: 'number',
            items: 'array'
        },
        dependencies: ['risk', 'priority'],
        version: 1
    },

    comparative: {
        name: 'comparative',
        description: 'Compares metrics across time or categories',
        input: 'unifiedState',
        output: {
            clusters: 'array',
            outliers: 'array'
        },
        dependencies: ['trends'],
        version: 1
    }
};