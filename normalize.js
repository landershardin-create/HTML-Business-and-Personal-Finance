// normalize.js
// Canonical formatting utilities for Business + Personal Finance.
// Every value entering the system is normalized here.

import { safeNumber } from '../utils/safe-number.js';

export const Normalize = {

    /* ---------------------------------------------------------
     * AUTO NORMALIZATION (Fallback)
     * --------------------------------------------------------- */
    auto(value) {
        if (value === null || value === undefined) return null;

        switch (typeof value) {
            case 'number':
                return safeNumber(value);

            case 'string':
                return value.trim();

            case 'boolean':
                return Boolean(value);

            case 'object':
                if (Array.isArray(value)) return [...value];
                return { ...value };

            default:
                return value;
        }
    },

    /* ---------------------------------------------------------
     * CURRENCY NORMALIZATION
     * --------------------------------------------------------- */
    currency(value) {
        const num = safeNumber(value);

        // Round to 2 decimals
        return Math.round(num * 100) / 100;
    },

    /* ---------------------------------------------------------
     * PERCENT NORMALIZATION
     * --------------------------------------------------------- */
    percent(value) {
        const num = safeNumber(value);

        // Convert whole numbers to decimal percent
        if (num > 1) return num / 100;

        return num;
    },

    /* ---------------------------------------------------------
     * NUMBER NORMALIZATION
     * --------------------------------------------------------- */
    number(value) {
        return safeNumber(value);
    },

    /* ---------------------------------------------------------
     * BOOLEAN NORMALIZATION
     * --------------------------------------------------------- */
    boolean(value) {
        if (typeof value === 'string') {
            const v = value.toLowerCase();
            if (v === 'true' || v === '1' || v === 'yes') return true;
            if (v === 'false' || v === '0' || v === 'no') return false;
        }
        return Boolean(value);
    },

    /* ---------------------------------------------------------
     * ARRAY NORMALIZATION
     * --------------------------------------------------------- */
    array(value) {
        if (!Array.isArray(value)) return [];
        return [...value];
    },

    /* ---------------------------------------------------------
     * OBJECT NORMALIZATION
     * --------------------------------------------------------- */
    object(value) {
        if (typeof value !== 'object' || value === null) return {};
        return { ...value };
    },

    /* ---------------------------------------------------------
     * STRING NORMALIZATION
     * --------------------------------------------------------- */
    string(value) {
        if (value === null || value === undefined) return '';
        return String(value).trim();
    },

    /* ---------------------------------------------------------
     * DATE NORMALIZATION
     * --------------------------------------------------------- */
    date(value) {
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d.toISOString();
    },

    /* ---------------------------------------------------------
     * LIST OF NUMBERS NORMALIZATION
     * --------------------------------------------------------- */
    numberList(value) {
        if (!Array.isArray(value)) return [];
        return value.map(v => safeNumber(v));
    },

    /* ---------------------------------------------------------
     * LIST OF OBJECTS NORMALIZATION
     * --------------------------------------------------------- */
    objectList(value) {
        if (!Array.isArray(value)) return [];
        return value.map(v => (typeof v === 'object' ? { ...v } : {}));
    }
};

export default Normalize;