// domain-purity.js
// Enforces immutability and purity for all domain modules.
// Prevents domain-level mutation of unified-state and ensures safe updates.

import { enforceDomainContract } from './domain-contracts.js';
import Telemetry from '../system/telemetry.js';

export const DomainPurity = {

    /* ---------------------------------------------------------
     * PROTECT DOMAIN OBJECT (Deep Freeze)
     * --------------------------------------------------------- */
    protect(domainObject) {
        return deepFreeze(domainObject);
    },

    /* ---------------------------------------------------------
     * SAFE DOMAIN UPDATE (Immutable)
     * --------------------------------------------------------- */
    update(domainName, unifiedState, partialUpdate) {
        try {
            // Extract domain slice
            const domainData = unifiedState[domainName];

            if (!domainData) {
                throw new Error(`Unknown domain: ${domainName}`);
            }

            // Merge updates immutably
            const merged = {
                ...domainData,
                ...partialUpdate
            };

            // Enforce domain contract
            const validated = enforceDomainContract(domainName, merged);

            // Freeze domain object to prevent mutation
            const protectedDomain = deepFreeze(validated);

            Telemetry.log('domain:update', {
                domain: domainName,
                timestamp: Date.now()
            });

            return protectedDomain;

        } catch (err) {
            Telemetry.error('domain:update-error', {
                domain: domainName,
                error: err.message
            });
            throw err;
        }
    }
};

/* -------------------------------------------------------------
 * DEEP FREEZE (Recursive Immutability)
 * ------------------------------------------------------------- */
function deepFreeze(obj) {
    if (obj === null || typeof obj !== 'object') return obj;

    Object.freeze(obj);

    Object.getOwnPropertyNames(obj).forEach(prop => {
        const value = obj[prop];

        if (
            value !== null &&
            typeof value === 'object' &&
            !Object.isFrozen(value)
        ) {
            deepFreeze(value);
        }
    });

    return obj;
}

export default DomainPurity;