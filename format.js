// format.js
// Presentation formatting utilities for Business + Personal Finance dashboard.
// Converts normalized values into human-readable UI strings.

export const Format = {

    /* ---------------------------------------------------------
     * CURRENCY ($)
     * --------------------------------------------------------- */
    currency(value, currency = 'USD', locale = 'en-US') {
        const num = Number(value) || 0;

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    },

    /* ---------------------------------------------------------
     * CENTS (¢)
     * --------------------------------------------------------- */
    cents(value) {
        const num = Math.round(Number(value) || 0);
        return `${num}¢`;
    },

    /* ---------------------------------------------------------
     * PERCENT (%)
     * --------------------------------------------------------- */
    percent(value, decimals = 2) {
        const num = Number(value) || 0;

        return `${(num * 100).toFixed(decimals)}%`;
    },

    /* ---------------------------------------------------------
     * NUMBER (Locale-Aware)
     * --------------------------------------------------------- */
    number(value, locale = 'en-US', decimals = 2) {
        const num = Number(value) || 0;

        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    },

    /* ---------------------------------------------------------
     * INTEGER
     * --------------------------------------------------------- */
    integer(value) {
        const num = Math.round(Number(value) || 0);
        return num.toString();
    },

    /* ---------------------------------------------------------
     * COMMA-SEPARATED LIST
     * --------------------------------------------------------- */
    list(values) {
        if (!Array.isArray(values)) return '';
        return values.join(', ');
    },

    /* ---------------------------------------------------------
     * DATE (Locale-Aware)
     * --------------------------------------------------------- */
    date(value, locale = 'en-US') {
        const d = new Date(value);
        if (isNaN(d.getTime())) return 'Invalid date';

        return d.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    /* ---------------------------------------------------------
     * DATETIME (Locale-Aware)
     * --------------------------------------------------------- */
    datetime(value, locale = 'en-US') {
        const d = new Date(value);
        if (isNaN(d.getTime())) return 'Invalid datetime';

        return d.toLocaleString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    }
};

export default Format;