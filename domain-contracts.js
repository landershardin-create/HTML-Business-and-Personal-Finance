// domain-contracts.js
// Strict domain contracts for Business + Personal Finance dashboard.
// Ensures domain modules follow predictable shapes and validated fields.

import Normalize from '../data/normalize.js';
import Validate from '../data/validate.js';

export const DomainContracts = {

    /* ---------------------------------------------------------
     * PERSONAL FINANCE DOMAIN
     * --------------------------------------------------------- */
    finance: {
        name: 'finance',
        fields: {
            income: { type: 'currency', normalize: Normalize.currency, validate: Validate.isCurrency },
            expenses: { type: 'currency', normalize: Normalize.currency, validate: Validate.isCurrency },
            budget: { type: 'object', normalize: Normalize.object, validate: Validate.isObject },
            accounts: { type: 'object', normalize: Normalize.object, validate: Validate.isObject }
        }
    },

    /* ---------------------------------------------------------
     * BUSINESS FINANCE DOMAIN
     * --------------------------------------------------------- */
    business: {
        name: 'business',
        fields: {
            revenue: { type: 'currency', normalize: Normalize.currency, validate: Validate.isCurrency },
            costOfGoods: { type: 'currency', normalize: Normalize.currency, validate: Validate.isCurrency },
            operatingExpenses: { type: 'currency', normalize: Normalize.currency, validate: Validate.isCurrency },
            vendors: { type: 'objectList', normalize: Normalize.objectList, validate: Validate.isObjectList }
        }
    },

    /* ---------------------------------------------------------
     * INVENTORY DOMAIN
     * --------------------------------------------------------- */
    inventory: {
        name: 'inventory',
        fields: {
            items: { type: 'objectList', normalize: Normalize.objectList, validate: Validate.isObjectList },
            totalCount: { type: 'number', normalize: Normalize.number, validate: Validate.isNumber }
        }
    },

    /* ---------------------------------------------------------
     * CONTRIBUTORS DOMAIN
     * --------------------------------------------------------- */
    contributors: {
        name: 'contributors',
        fields: {
            list: { type: 'objectList', normalize: Normalize.objectList, validate: Validate.isObjectList },
            roles: { type: 'array', normalize: Normalize.array, validate: Validate.isArray }
        }
    },

    /* ---------------------------------------------------------
     * SYSTEM DOMAIN
     * --------------------------------------------------------- */
    system: {
        name: 'system',
        fields: {
            telemetry: { type: 'object', normalize: Normalize.object, validate: Validate.isObject },
            settings: { type: 'object', normalize: Normalize.object, validate: Validate.isObject },
            theme: { type: 'string', normalize: Normalize.string, validate: Validate.isString }
        }
    }
};

/* -------------------------------------------------------------
 * DOMAIN VALIDATION + NORMALIZATION PIPELINE
 * ------------------------------------------------------------- */
export function enforceDomainContract(domainName, data) {
    const contract = DomainContracts[domainName];

    if (!contract) {
        throw new Error(`Unknown domain: ${domainName}`);
    }

    const output = {};

    for (const field in contract.fields) {
        const rule = contract.fields[field];
        const raw = data[field];

        // Normalize
        const normalized = rule.normalize(raw);

        // Validate
        if (!rule.validate(normalized)) {
            throw new Error(
                `Domain validation failed for ${domainName}.${field}: expected ${rule.type}`
            );
        }

        output[field] = normalized;
    }

    return output;
}

export default DomainContracts;