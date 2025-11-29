function calculateLoanDistribution() {
  const loan = parseFloat(document.getElementById('loanAmount').value);
  const ops = (loan * parseFloat(document.getElementById('opsPercent').value) / 100).toFixed(2);
  const assets = (loan * parseFloat(document.getElementById('assetsPercent').value) / 100).toFixed(2);
  const reserves = (loan * parseFloat(document.getElementById('reservesPercent').value) / 100).toFixed(2);
  document.getElementById('loanDistributionResult').innerText =
    `Operations:

{ops}, Assets: 

{assets}, Reserves:

{reserves}`;
}

function calculateEquityBreakdown() {
  const equity = parseFloat(document.getElementById('equityAmount').value);
  const founder = (equity * parseFloat(document.getElementById('founderEquity').value) / 100).toFixed(2);
  const investor = (equity * parseFloat(document.getElementById('investorEquity').value) / 100).toFixed(2);
  document.getElementById('equityBreakdownResult').innerText =
    `Founder Equity: 

{founder}, Investor Equity:

{investor}`;
}

function calculateUseSource() {
  const rd = parseFloat(document.getElementById('useRD').value);
  const marketing = parseFloat(document.getElementById('useMarketing').value);
  const infra = parseFloat(document.getElementById('useInfra').value);
  const totalUse = (rd + marketing + infra).toFixed(2);
  document.getElementById('useSourceResult').innerText =
    `Use of Proceeds: R&D 

{rd}, Marketing

{marketing}, Infrastructure 

{infra} | Total: $${totalUse}`;
}

function renderSummary() {
  const loan = parseFloat(document.getElementById('loanAmount').value);
  const equity = parseFloat(document.getElementById('equityAmount').value);
  const ratio = (loan / equity).toFixed(2);

  const ops = (loan * parseFloat(document.getElementById('opsPercent').value) / 100).toFixed(2);
  const assets = (loan * parseFloat(document.getElementById('assetsPercent').value) / 100).toFixed(2);
  const reserves = (loan * parseFloat(document.getElementById('reservesPercent').value) / 100).toFixed(2);

  const founder = (equity * parseFloat(document.getElementById('founderEquity').value) / 100).toFixed(2);
  const investor = (equity * parseFloat(document.getElementById('investorEquity').value) / 100).toFixed(2);

  const rd = parseFloat(document.getElementById('useRD').value);
  const marketing = parseFloat(document.getElementById('useMarketing').value);
  const infra = parseFloat(document.getElementById('useInfra').value);
  const totalUse = (rd + marketing + infra).toFixed(2);

  // Conditional styling: highlight ratio
  let ratioClass = "";
  if (ratio > 1) {
    ratioClass = "expense"; // red if debt > equity
  } else {
    ratioClass = "income";  // green if equity stronger
  }

  document.getElementById('financialSummary').innerHTML = `
    <table>
      <tr><th colspan="2">Debt-to-Equity</th></tr>
      <tr><td>Debt-to-Equity Ratio</td><td class="${ratioClass}">${ratio}</td></tr>

      <tr><th colspan="2">Loan Distribution</th></tr>
      <tr><td>Operations</td><td>

{ops}</td></tr>
      <tr><td>Assets</td><td>

{assets}</td></tr>
      <tr><td>Reserves</td><td>

{reserves}</td></tr>

      <tr><th colspan="2">Equity Breakdown</th></tr>
      <tr><td>Founder Equity</td><td class="income">

{founder}</td></tr>
      <tr><td>Investor Equity</td><td class="income">

{investor}</td></tr>

      <tr><th colspan="2">Use of Proceeds</th></tr>
      <tr><td>R&D</td><td>

{rd}</td></tr>
      <tr><td>Marketing</td><td>

{marketing}</td></tr>
      <tr><td>Infrastructure</td><td>

{infra}</td></tr>
      <tr><td><strong>Total Use</strong></td><td><strong>

{totalUse}</strong></td></tr>

      <tr><th colspan="2">Source of Proceeds</th></tr>
      <tr><td>Loan</td><td class="expense">

{loan}</td></tr>
      <tr><td>Equity</td><td class="income">

{equity}</td></tr>
      <tr><td><strong>Total Source</strong></td><td><strong>

{(loan + equity).toFixed(2)}</strong></td></tr>
    </table>
  `;
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
    `Operations: $${ops} (${opsPercent}%), Assets: $${assets} (${assetsPercent}%), Reserves: $${reserves} (${reservesPercent}%)`;
}

function calculateEquityBreakdown() {
  const equity = parseFloat(document.getElementById('equityAmount').value);
  const founderPercent = parseFloat(document.getElementById('founderEquity').value);
  const investorPercent = parseFloat(document.getElementById('investorEquity').value);

  const founder = (equity * founderPercent / 100).toFixed(2);
  const investor = (equity * investorPercent / 100).toFixed(2);

  document.getElementById('equityBreakdownResult').innerText =
    `Founder Equity: $${founder} (${founderPercent}%), Investor Equity: $${investor} (${investorPercent}%)`;
}

function calculateUseSource() {
  const rd = parseFloat(document.getElementById('useRD').value);
  const marketing = parseFloat(document.getElementById('useMarketing').value);
  const infra = parseFloat(document.getElementById('useInfra').value);
  const totalUse = (rd + marketing + infra).toFixed(2);

  document.getElementById('useSourceResult').innerText =
    `Use of Proceeds: R&D

{rd}, Marketing 

{marketing}, Infrastructure

{infra} | Total: 

{totalUse}`;
}

function renderSummary() {
  const loan = parseFloat(document.getElementById('loanAmount').value);
  const equity = parseFloat(document.getElementById('equityAmount').value);
  const ratio = (loan / equity).toFixed(2);

  const ops = (loan * parseFloat(document.getElementById('opsPercent').value) / 100).toFixed(2);
  const assets = (loan * parseFloat(document.getElementById('assetsPercent').value) / 100).toFixed(2);
  const reserves = (loan * parseFloat(document.getElementById('reservesPercent').value) / 100).toFixed(2);

  const founder = (equity * parseFloat(document.getElementById('founderEquity').value) / 100).toFixed(2);
  const investor = (equity * parseFloat(document.getElementById('investorEquity').value) / 100).toFixed(2);

  const rd = parseFloat(document.getElementById('useRD').value);
  const marketing = parseFloat(document.getElementById('useMarketing').value);
  const infra = parseFloat(document.getElementById('useInfra').value);
  const totalUse = (rd + marketing + infra).toFixed(2);

  // Conditional styling for ratio
  let ratioClass = ratio > 1 ? "expense" : "income";

  document.getElementById('financialSummary').innerHTML = `
    <table>
      <tr><th colspan="2">Debt-to-Equity</th></tr>
      <tr><td>Debt-to-Equity Ratio</td><td class="${ratioClass}">${ratio}</td></tr>

      <tr><th colspan="2">Loan Distribution</th></tr>
      <tr><td>Operations</td><td>

{ops}</td></tr>
      <tr><td>Assets</td><td>

{assets}</td></tr>
      <tr><td>Reserves</td><td>

{reserves}</td></tr>

      <tr><th colspan="2">Equity Breakdown</th></tr>
      <tr><td>Founder Equity</td><td class="income">

{founder}</td></tr>
      <tr><td>Investor Equity</td><td class="income">

{investor}</td></tr>

      <tr><th colspan="2">Use of Proceeds</th></tr>
      <tr><td>R&D</td><td>

{rd}</td></tr>
      <tr><td>Marketing</td><td>

{marketing}</td></tr>
      <tr><td>Infrastructure</td><td>

{infra}</td></tr>
      <tr><td><strong>Total Use</strong></td><td><strong>

{totalUse}</strong></td></tr>

      <tr><th colspan="2">Source of Proceeds</th></tr>
      <tr><td>Loan</td><td class="expense">

{loan}</td></tr>
      <tr><td>Equity</td><td class="income">

{equity}</td></tr>
      <tr><td><strong>Total Source</strong></td><td><strong>

{(loan + equity).toFixed(2)}</strong></td></tr>
    </table>
  `;
}

// Initial render
calculateDebtEquity();
calculateLoanDistribution();
calculateEquityBreakdown();
calculateUseSource();
renderSummary();
}