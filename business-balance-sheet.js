
    const balanceSheets = {
      companyA: {
        monthly: {
          Jan: { assets: { cash: 10000, inventory: 5000, equipment: 15000 }, liabilities: { loans: 8000 }, equity: { retainedEarnings: 17000 } },
          Feb: { assets: { cash: 12000, inventory: 6000, equipment: 15000 }, liabilities: { loans: 7000 }, equity: { retainedEarnings: 20000 } }
        },
        quarterly: {
          Q1: { assets: { cash: 30000, inventory: 18000, equipment: 45000 }, liabilities: { loans: 24000 }, equity: { retainedEarnings: 69000 } }
        },
        annual: {
          2025: { assets: { cash: 50000, inventory: 30000, equipment: 70000 }, liabilities: { loans: 40000 }, equity: { retainedEarnings: 90000 } }
        }
      },
      companyB: {
        monthly: {
          Jan: { assets: { cash: 20000, inventory: 10000, equipment: 30000 }, liabilities: { loans: 15000 }, equity: { retainedEarnings: 45000 } },
          Feb: { assets: { cash: 25000, inventory: 12000, equipment: 30000 }, liabilities: { loans: 14000 }, equity: { retainedEarnings: 53000 } }
        },
        quarterly: {
          Q1: { assets: { cash: 60000, inventory: 35000, equipment: 90000 }, liabilities: { loans: 45000 }, equity: { retainedEarnings: 140000 } }
        },
        annual: {
          2025: { assets: { cash: 80000, inventory: 50000, equipment: 120000 }, liabilities: { loans: 60000 }, equity: { retainedEarnings: 160000 } }
        }
      },
      companyC: {
        monthly: {
          Jan: { assets: { cash: 8000, inventory: 4000, equipment: 10000 }, liabilities: { loans: 6000 }, equity: { retainedEarnings: 12000 } },
          Feb: { assets: { cash: 9000, inventory: 5000, equipment: 10000 }, liabilities: { loans: 5000 }, equity: { retainedEarnings: 14000 } }
        },
        quarterly: {
          Q1: { assets: { cash: 25000, inventory: 15000, equipment: 30000 }, liabilities: { loans: 20000 }, equity: { retainedEarnings: 50000 } }
        },
        annual: {
          2025: { assets: { cash: 30000, inventory: 20000, equipment: 40000 }, liabilities: { loans: 25000 }, equity: { retainedEarnings: 50000 } }
        }
      }
    };

    const subPeriods = {
      monthly: ["Jan", "Feb"],
      quarterly: ["Q1"],
      annual: ["2025"]
    };

    function populateSubPeriodOptions(periodType) {
      const subSelect = document.getElementById("subPeriodSelect");
      subSelect.innerHTML = subPeriods[periodType].map(p => `<option value="${p}">${p}</option>`).join("");
    }

    function renderBalanceSheets(companyKeys, periodType, subPeriod) {
      const container = document.getElementById("balanceSheetContainer");
      let totalAssets = 0, totalLiabilities = 0, totalEquity = 0;

      container.innerHTML = companyKeys.map(companyKey => {
        const data = balanceSheets[companyKey]?.[periodType]?.[subPeriod];
        if (!data) return `<p>No data for ${companyKey} in ${subPeriod}</p>`;

        const assetSum = Object.values(data.assets).reduce((a, b) => a + b, 0);
        const liabilitySum = Object.values(data.liabilities).reduce((a, b) => a + b, 0);
        const equitySum = Object.values(data.equity).reduce((a, b) => a + b, 0);

        totalAssets += assetSum;
        totalLiabilities += liabilitySum;
        totalEquity += equitySum;

        return `
          <h2>Balance Sheet - ${companyKey} (${subPeriod})</h2>
          <table>
            <thead><tr><th>Category</th><th>Item</th><th>Amount</th></tr></thead>
            <tbody>
              ${Object.entries(data.assets).map(([item, amount]) =>
                `<tr><td>Assets</td><td>${item}</td><td>$${amount.toLocaleString()}</td></tr>`
              ).join("")}
              ${Object.entries(data.liabilities).map(([item, amount]) =>
                `<tr><td>Liabilities</td><td>${item}</td><td>$${amount.toLocaleString()}</td></tr>`
              ).join("")}
              ${Object.entries(data.equity).map(([item, amount]) =>
                `<tr><td>Equity</td><td>${item}</td><td>$${amount.toLocaleString()}</td></tr>`
              ).join("")}
            </tbody>
          </table>
        `;
      }).join("");

      if (companyKeys.length > 1) {
        container.innerHTML += `
          <h2>Combined Summary (${subPeriod})</h2>
          <table>
            <thead><tr><th>Category</th><th>Total Amount</th></tr></thead>
            <tbody>
              <tr class="summary"><td>Assets</td><td>

{totalAssets.toLocaleString()}</td></tr>
              <tr class="summary"><td>Liabilities</td><td>

{totalLiabilities.toLocaleString()}</td></tr>
              <tr class="summary"><td>Equity</td><td>$${totalEquity.toLocaleString()}</td></tr>
            </tbody>
          </table>
        `;
      }
    }

    function triggerRender() {
      const selectedCompanies = Array.from(document.getElementById("companySelect").selectedOptions).map(opt => opt.value);
      const periodType = document.getElementById("periodSelect").value;
      const subPeriod = document.getElementById("subPeriodSelect").value;
      renderBalanceSheets(selectedCompanies, periodType, subPeriod);
    }

    document.getElementById("periodSelect").addEventListener("change", (e) => {
      populateSubPeriodOptions(e.target.value);
      triggerRender();
    });

    document.getElementById("subPeriodSelect").addEventListener("change", triggerRender);
    document.getElementById("companySelect").addEventListener("change", triggerRender);

    // Initial setup
    populateSubPeriodOptions("annual");
    renderBalanceSheets(["companyA"], "annual", "2025");
