// unified-state-reducer.js
// Central reducer for Business + Personal Finance dashboard.
// Applies domain updates immutably, enforces purity, triggers orchestrator,
// snapshots safe state, and notifies controller/UI.

import DomainPurity from '../domain/domain-purity.js';
import { enforceDomainContract } from '../domain/domain-contracts.js';
import Orchestrator from '../orchestrator/orchestrator.js';
import GlobalErrorBoundary from '../system/global-error-boundary.js';
import Telemetry from '../system/telemetry.js';

export const UnifiedStateReducer = {

    /* ---------------------------------------------------------
     * INITIALIZE UNIFIED STATE
     * --------------------------------------------------------- */
    init(initialState) {
        const validated = this.validateAllDomains(initialState);
        const frozen = this.freezeAllDomains(validated);

        GlobalErrorBoundary.snapshot(frozen, {}); // no analytics yet

        Telemetry.log('state:init', {
            timestamp: Date.now()
        });

        return frozen;
    },

    /* ---------------------------------------------------------
     * APPLY DOMAIN UPDATE (Immutable)
     * --------------------------------------------------------- */
    update(state, domainName, partialUpdate) {
        try {
            // Enforce domain purity + immutability
            const updatedDomain = DomainPurity.update(domainName, state, partialUpdate);

            // Build new unified-state immutably
            const newState = {
                ...state,
                [domainName]: updatedDomain
            };

            // Run orchestrator analytics
            const analytics = Orchestrator.run(newState);

            // Snapshot safe state + analytics
            GlobalErrorBoundary.snapshot(newState, analytics);

            Telemetry.log('state:update', {
                domain: domainName,
                timestamp: Date.now()
            });

            return {
                state: newState,
                analytics
            };

        } catch (err) {
            GlobalErrorBoundary.capture('state-update', {
                domain: domainName,
                error: err.message
            });

            throw err;
        }
    },

    /* ---------------------------------------------------------
     * VALIDATE ALL DOMAINS
     * --------------------------------------------------------- */
    validateAllDomains(state) {
        const output = {};

        for (const domainName in state) {
            output[domainName] = enforceDomainContract(domainName, state[domainName]);
        }

        return output;
    },

    /* ---------------------------------------------------------
     * FREEZE ALL DOMAINS (Deep Immutability)
     * --------------------------------------------------------- */
    freezeAllDomains(state) {
        const frozen = {};

        for (const domainName in state) {
            frozen[domainName] = DomainPurity.protect(state[domainName]);
        }

        return frozen;
    }
};

export default UnifiedStateReducer;