// Helper: format numbers as US currency
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function calculateDebtEquity() {
  const loan = parseFloat(document.getElementById('loanAmount').value);
  const equity = parseFloat(document.getElementById('equityAmount').value);
  const ratio = (loan / equity).toFixed(2);
  document.getElementById('ratioResult').innerText = `Debt-to-Equity Ratio: ${ratio}`;
}

function calculateLoanDistribution() {
  const loan = parseFloat(document.getElementById('loanAmount').value);
  const opsPercent = parseFloat(document.getElementById('opsPercent').value);
  const assetsPercent = parseFloat(document.getElementById('assetsPercent').value);
  const reservesPercent = parseFloat(document.getElementById('reservesPercent').value);

  const ops = (loan * opsPercent / 100).toFixed(2);
  const assets = (loan * assetsPercent / 100).toFixed(2);
  const reserves = (loan * reservesPercent / 100).toFixed(2);

  document.getElementById('loanDistributionResult').innerText =
    `Operations: ${formatCurrency(ops)} (${opsPercent}%), Assets: ${formatCurrency(assets)} (${assetsPercent}%), Reserves: ${formatCurrency(reserves)} (${reservesPercent}%)`;
}

function calculateEquityBreakdown() {
  const equity = parseFloat(document.getElementById('equityAmount').value);
  const founderPercent = parseFloat(document.getElementById('founderEquity').value);
  const investorPercent = parseFloat(document.getElementById('investorEquity').value);

  const founder = (equity * founderPercent / 100).toFixed(2);
  const investor = (equity * investorPercent / 100).toFixed(2);

  document.getElementById('equityBreakdownResult').innerText =
    `Founder Equity: ${formatCurrency(founder)} (${founderPercent}%), Investor Equity: ${formatCurrency(investor)} (${investorPercent}%)`;
}

function calculateUseSource() {
  const rd = parseFloat(document.getElementById('useRD').value);
  const marketing = parseFloat(document.getElementById('useMarketing').value);
  const infra = parseFloat(document.getElementById('useInfra').value);
  const totalUse = (rd + marketing + infra).toFixed(2);

  document.getElementById('useSourceResult').innerText =
    `Use of Proceeds: R&D ${formatCurrency(rd)}, Marketing ${formatCurrency(marketing)}, Infrastructure ${formatCurrency(infra)} | Total: ${formatCurrency(totalUse)}`;
}

function renderSummary() {
  const loan = parseFloat(document.getElementById('loanAmount').value);
  const equity = parseFloat(document.getElementById('equityAmount').value);
  const ratio = (loan / equity).toFixed(2);

  const opsPercent = parseFloat(document.getElementById('opsPercent').value);
  const assetsPercent = parseFloat(document.getElementById('assetsPercent').value);
  const reservesPercent = parseFloat(document.getElementById('reservesPercent').value);

  const ops = (loan * opsPercent / 100).toFixed(2);
  const assets = (loan * assetsPercent / 100).toFixed(2);
  const reserves = (loan * reservesPercent / 100).toFixed(2);

  const founderPercent = parseFloat(document.getElementById('founderEquity').value);
  const investorPercent = parseFloat(document.getElementById('investorEquity').value);

  const founder = (equity * founderPercent / 100).toFixed(2);
  const investor = (equity * investorPercent / 100).toFixed(2);

  const rd = parseFloat(document.getElementById('useRD').value);
  const marketing = parseFloat(document.getElementById('useMarketing').value);
  const infra = parseFloat(document.getElementById('useInfra').value);
  const totalUse = (rd + marketing + infra).toFixed(2);

  // Conditional styling for ratio
  let ratioClass = ratio > 1 ? "expense" : "income";

  document.getElementById('financialSummary').innerHTML = `
    <table>
      <tr><th colspan="3">Debt-to-Equity</th></tr>
      <tr><td>Debt-to-Equity Ratio</td><td colspan="2" class="${ratioClass}">${ratio}</td></tr>

      <tr><th colspan="3">Loan Distribution</th></tr>
      <tr><td>Operations</td><td>${formatCurrency(ops)}</td><td>${opsPercent}%</td></tr>
      <tr><td>Assets</td><td>${formatCurrency(assets)}</td><td>${assetsPercent}%</td></tr>
      <tr><td>Reserves</td><td>${formatCurrency(reserves)}</td><td>${reservesPercent}%</td></tr>

      <tr><th colspan="3">Equity Breakdown</th></tr>
      <tr><td>Founder Equity</td><td class="income">${formatCurrency(founder)}</td><td>${founderPercent}%</td></tr>
      <tr><td>Investor Equity</td><td class="income">${formatCurrency(investor)}</td><td>${investorPercent}%</td></tr>

      <tr><th colspan="3">Use of Proceeds</th></tr>
      <tr><td>R&D</td><td>${formatCurrency(rd)}</td><td></td></tr>
      <tr><td>Marketing</td><td>${formatCurrency(marketing)}</td><td></td></tr>
      <tr><td>Infrastructure</td><td>${formatCurrency(infra)}</td><td></td></tr>
      <tr><td><strong>Total Use</strong></td><td colspan="2"><strong>${formatCurrency(totalUse)}</strong></td></tr>

      <tr><th colspan="3">Source of Proceeds</th></tr>
      <tr><td>Loan</td><td class="expense">${formatCurrency(loan)}</td><td></td></tr>
      <tr><td>Equity</td><td class="income">${formatCurrency(equity)}</td><td></td></tr>
      <tr><td><strong>Total Source</strong></td><td colspan="2"><strong>${formatCurrency(loan + equity)}</strong></td></tr>
    </table>
  `;
}

// Initial render
calculateDebtEquity();
calculateLoanDistribution();
calculateEquityBreakdown();
calculateUseSource();
renderSummary();