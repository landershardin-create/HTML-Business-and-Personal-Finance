// schema.js
// Versioned, authoritative data model for Business + Personal Finance.
// Every field has: type, default, validator, normalizer, description.

export const Schema = {

    /* ---------------------------------------------------------
     * SCHEMA VERSION
     * --------------------------------------------------------- */
    version: 1,

    /* ---------------------------------------------------------
     * DATA MODEL
     * --------------------------------------------------------- */
    model: {

        /* -----------------------------------------------------
         * PERSONAL FINANCE
         * ----------------------------------------------------- */

        income: {
            type: 'number',
            default: 0,
            validate: 'isCurrency',
            normalize: 'currency',
            description: 'Total monthly personal income'
        },

        expenses: {
            type: 'number',
            default: 0,
            validate: 'isCurrency',
            normalize: 'currency',
            description: 'Total monthly personal expenses'
        },

        budget: {
            type: 'object',
            default: {},
            validate: 'isObject',
            normalize: 'object',
            description: 'Detailed budget categories'
        },

        netWorth: {
            type: 'number',
            default: 0,
            validate: 'isCurrency',
            normalize: 'currency',
            description: 'Total assets minus liabilities'
        },

        /* -----------------------------------------------------
         * BUSINESS FINANCE
         * ----------------------------------------------------- */

        revenue: {
            type: 'number',
            default: 0,
            validate: 'isCurrency',
            normalize: 'currency',
            description: 'Total business revenue'
        },

        costOfGoods: {
            type: 'number',
            default: 0,
            validate: 'isCurrency',
            normalize: 'currency',
            description: 'COGS for business operations'
        },

        operatingExpenses: {
            type: 'number',
            default: 0,
            validate: 'isCurrency',
            normalize: 'currency',
            description: 'Total business operating expenses'
        },

        inventory: {
            type: 'array',
            default: [],
            validate: 'isArray',
            normalize: 'array',
            description: 'Inventory items for vending or business operations'
        },

        vendors: {
            type: 'array',
            default: [],
            validate: 'isArray',
            normalize: 'array',
            description: 'Vendor list with contact + cost details'
        },

        accounts: {
            type: 'object',
            default: {},
            validate: 'isObject',
            normalize: 'object',
            description: 'Business accounts (cash, receivables, payables)'
        },

        /* -----------------------------------------------------
         * ANALYTICS OUTPUT
         * ----------------------------------------------------- */

        analytics: {
            type: 'object',
            default: {
                predictive: {},
                trends: {},
                risk: {},
                opportunity: {},
                priority: {},
                alerts: {},
                comparative: {}
            },
            validate: 'isObject',
            normalize: 'object',
            description: 'All engine outputs stored here'
        },

        /* -----------------------------------------------------
         * SYSTEM / META
         * ----------------------------------------------------- */

        userProfile: {
            type: 'object',
            default: {},
            validate: 'isObject',
            normalize: 'object',
            description: 'User profile data (name, settings, preferences)'
        },

        settings: {
            type: 'object',
            default: {
                theme: 'dark',
                currency: 'USD',
                locale: 'en-US'
            },
            validate: 'isObject',
            normalize: 'object',
            description: 'System settings for UI + formatting'
        }
    }
};

export default Schema;