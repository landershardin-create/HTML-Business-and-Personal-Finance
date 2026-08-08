// validate.js
// Strict validation utilities for Business + Personal Finance.
// Every value entering the system is validated here.

import { safeNumber } from '../utils/safe-number.js';

export const Validate = {

    /* ---------------------------------------------------------
     * NUMBER VALIDATION
     * --------------------------------------------------------- */
    isNumber(value) {
        return typeof safeNumber(value) === 'number' && !isNaN(safeNumber(value));
    },

    /* ---------------------------------------------------------
     * CURRENCY VALIDATION ($)
     * --------------------------------------------------------- */
    isCurrency(value) {
        const num = safeNumber(value);
        return typeof num === 'number' && isFinite(num);
    },

    /* ---------------------------------------------------------
     * CENT VALIDATION (¢)
     * --------------------------------------------------------- */
    isCent(value) {
        const num = safeNumber(value);
        return Number.isInteger(num);
    },

    /* ---------------------------------------------------------
     * PERCENT VALIDATION
     * --------------------------------------------------------- */
    isPercent(value) {
        const num = safeNumber(value);
        return typeof num === 'number' && num >= 0 && num <= 1;
    },

    /* ---------------------------------------------------------
     * BOOLEAN VALIDATION
     * --------------------------------------------------------- */
    isBoolean(value) {
        return typeof value === 'boolean';
    },

    /* ---------------------------------------------------------
     * STRING VALIDATION
     * --------------------------------------------------------- */
    isString(value) {
        return typeof value === 'string';
    },

    /* ---------------------------------------------------------
     * ARRAY VALIDATION
     * --------------------------------------------------------- */
    isArray(value) {
        return Array.isArray(value);
    },

    /* ---------------------------------------------------------
     * OBJECT VALIDATION
     * --------------------------------------------------------- */
    isObject(value) {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    },

    /* ---------------------------------------------------------
     * DATE VALIDATION
     * --------------------------------------------------------- */
    isDate(value) {
        const d = new Date(value);
        return !isNaN(d.getTime());
    },

    /* ---------------------------------------------------------
     * NUMBER LIST VALIDATION
     * --------------------------------------------------------- */
    isNumberList(value) {
        if (!Array.isArray(value)) return false;
        return value.every(v => this.isNumber(v));
    },

    /* ---------------------------------------------------------
     * OBJECT LIST VALIDATION
     * --------------------------------------------------------- */
    isObjectList(value) {
        if (!Array.isArray(value)) return false;
        return value.every(v => this.isObject(v));
    },

    /* ---------------------------------------------------------
     * POSITIVE NUMBER VALIDATION
     * --------------------------------------------------------- */
    isPositive(value) {
        const num = safeNumber(value);
        return num >= 0;
    },

    /* ---------------------------------------------------------
     * NON-NEGATIVE INTEGER VALIDATION
     * --------------------------------------------------------- */
    isNonNegativeInteger(value) {
        const num = safeNumber(value);
        return Number.isInteger(num) && num >= 0;
    },

    /* ---------------------------------------------------------
     * NON-EMPTY STRING VALIDATION
     * --------------------------------------------------------- */
    isNonEmptyString(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }
};

export default Validate;