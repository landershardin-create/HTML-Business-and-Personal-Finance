// indexSummaryCards.js

export function renderSummaryCards(data) {
  return `
    <div class="summary-card">Total Assets:

{data.assets}</div>
    <div class="summary-card">Liabilities: 

{data.liabilities}</div>
    <div class="summary-card">Net Worth: $${data.netWorth}</div>
  `;
}