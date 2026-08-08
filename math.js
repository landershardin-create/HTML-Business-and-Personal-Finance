// math.js
// Core mathematical utilities for Business + Personal Finance
// Pure functions only — no state, no UI, no persistence

import { safeNumber } from './safe-number.js';
import { formatCurrency, formatPercent } from './format.js';

export const MathUtil = {

    /* ---------------------------------------------------------
     * BASIC SAFE OPERATIONS
     * --------------------------------------------------------- */
    add(a, b) {
        return safeNumber(a) + safeNumber(b);
    },

    subtract(a, b) {
        return safeNumber(a) - safeNumber(b);
    },

    multiply(a, b) {
        return safeNumber(a) * safeNumber(b);
    },

    divide(a, b) {
        const num = safeNumber(a);
        const den = safeNumber(b);
        return den === 0 ? 0 : num / den;
    },

    round(value, decimals = 2) {
        const v = safeNumber(value);
        const factor = Math.pow(10, decimals);
        return Math.round(v * factor) / factor;
    },

    /* ---------------------------------------------------------
     * FINANCIAL MATH
     * --------------------------------------------------------- */

    // Percentage: (part / whole)
    percent(part, whole) {
        const p = safeNumber(part);
        const w = safeNumber(whole);
        return w === 0 ? 0 : p / w;
    },

    // Percentage change: (new - old) / old
    percentChange(newVal, oldVal) {
        const n = safeNumber(newVal);
        const o = safeNumber(oldVal);
        return o === 0 ? 0 : (n - o) / o;
    },

    // Debt-to-Equity Ratio
    debtToEquity(totalDebt, totalEquity) {
        const d = safeNumber(totalDebt);
        const e = safeNumber(totalEquity);
        return e === 0 ? Infinity : d / e;
    },

    // Gross Margin: (revenue - cost) / revenue
    grossMargin(revenue, cost) {
        const r = safeNumber(revenue);
        const c = safeNumber(cost);
        return r === 0 ? 0 : (r - c) / r;
    },

    // Net Margin: netIncome / revenue
    netMargin(netIncome, revenue) {
        const n = safeNumber(netIncome);
        const r = safeNumber(revenue);
        return r === 0 ? 0 : n / r;
    },

    // Break-even point: fixedCosts / (price - variableCost)
    breakEven(fixedCosts, pricePerUnit, variableCostPerUnit) {
        const f = safeNumber(fixedCosts);
        const p = safeNumber(pricePerUnit);
        const v = safeNumber(variableCostPerUnit);
        const margin = p - v;
        return margin <= 0 ? Infinity : f / margin;
    },

    /* ---------------------------------------------------------
     * AMORTIZATION / LOANS
     * --------------------------------------------------------- */

    // Monthly interest rate from APR
    monthlyRate(apr) {
        return safeNumber(apr) / 12;
    },

    // Loan payment formula (PMT)
    loanPayment(principal, annualRate, months) {
        const P = safeNumber(principal);
        const r = safeNumber(annualRate) / 12;
        const n = safeNumber(months);

        if (r === 0) return P / n;

        const numerator = r * Math.pow(1 + r, n);
        const denominator = Math.pow(1 + r, n) - 1;

        return denominator === 0 ? 0 : P * (numerator / denominator);
    },

    // Remaining balance after k payments
    loanBalance(principal, annualRate, months, paymentsMade) {
        const P = safeNumber(principal);
        const r = safeNumber(annualRate) / 12;
        const n = safeNumber(months);
        const k = safeNumber(paymentsMade);

        if (r === 0) return P - (P / n) * k;

        const payment = MathUtil.loanPayment(P, annualRate, n);

        const balance =
            P * Math.pow(1 + r, k) -
            payment * ((Math.pow(1 + r, k) - 1) / r);

        return balance < 0 ? 0 : balance;
    },

    /* ---------------------------------------------------------
     * TAXES
     * --------------------------------------------------------- */

    salesTax(amount, rate) {
        const a = safeNumber(amount);
        const r = safeNumber(rate);
        return a * r;
    },

    applySalesTax(amount, rate) {
        const a = safeNumber(amount);
        const r = safeNumber(rate);
        return a + (a * r);
    },

    /* ---------------------------------------------------------
     * VENDING / OPERATIONS
     * --------------------------------------------------------- */

    vendingProfit(revenue, costOfGoods, routeCost, maintenanceCost) {
        const r = safeNumber(revenue);
        const c = safeNumber(costOfGoods);
        const route = safeNumber(routeCost);
        const m = safeNumber(maintenanceCost);

        return r - (c + route + m);
    },

    /* ---------------------------------------------------------
     * NET WORTH
     * --------------------------------------------------------- */

    netWorth(assets, liabilities) {
        return safeNumber(assets) - safeNumber(liabilities);
    }
};

export default MathUtil;