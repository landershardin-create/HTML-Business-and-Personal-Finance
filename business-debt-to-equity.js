   function calculateDebtEquity() {
      const loan = parseFloat(document.getElementById('loanAmount').value);
      const equity = parseFloat(document.getElementById('equityAmount').value);
      const ratio = (loan / equity).toFixed(2);
      document.getElementById('ratioResult').innerText = `Debt-to-Equity Ratio: ${ratio}`;
    }

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

      document.getElementById('financialSummary').innerHTML = `
        <p><strong>Debt-to-Equity Ratio:</strong> ${ratio}</p>
        <p><strong>Loan Distribution:</strong> Ops

{ops}, Assets 

{assets}, Reserves

{reserves}</p>
        <p><strong>Equity Breakdown:</strong> Founder 

{founder}, Investor

{investor}</p>
        <p><strong>Use of Proceeds:</strong> R&D 

{rd}, Marketing

{marketing}, Infrastructure 

{infra} | Total

{totalUse}</p>
        <p><strong>Source of Proceeds:</strong> Loan 

{loan}, Equity

{equity} | Total 

{(loan + equity).toFixed(2)}</p>
      `;
    }

    // Initial render
    calculateDebtEquity();
    calculateLoanDistribution();
    calculateEquityBreakdown();
    calculateUseSource();
    renderSummary();
