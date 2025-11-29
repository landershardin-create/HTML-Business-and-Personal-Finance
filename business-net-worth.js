   const companyMeta = {
      acme: { name: "Acme Corp", location: "New York, NY", type: "Manufacturing", role: "Owner" },
      zenith: { name: "Zenith LLC", location: "Austin, TX", type: "Consulting", role: "Partner" },
      nova: { name: "Nova Industries", location: "San Francisco, CA", type: "Tech Startup", role: "Investor" }
    };

    async function loadAccounts(companyKey, period = 'monthly') {
      const response = await fetch(`journal-${companyKey}.html`);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const rows = doc.querySelectorAll(`#accounts tbody tr[data-period="${period}"]`);

      let totalAssets = 0;
      let totalLiabilities = 0;
      const reportBody = document.querySelector('#report tbody');
      reportBody.innerHTML = '';

      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const [account, type, balanceStr] = Array.from(cells).map(cell => cell.textContent.trim());
        const balance = parseFloat(balanceStr);

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${account}</td>
          <td>${type}</td>
          <td class="${type.toLowerCase()}">${balance.toFixed(2)}</td>
        `;
        reportBody.appendChild(newRow);

        if (type === 'Asset') totalAssets += balance;
        else if (type === 'Liability') totalLiabilities += balance;
      });

      const netWorth = totalAssets - totalLiabilities;
      document.getElementById('summary').innerHTML = `
        <p><strong>Total Assets:</strong> <span class="asset">${totalAssets.toFixed(2)}</span></p>
        <p><strong>Total Liabilities:</strong> <span class="liability">${totalLiabilities.toFixed(2)}</span></p>
        <p><strong>Net Worth:</strong> <strong>${netWorth.toFixed(2)}</strong></p>
      `;

      const meta = companyMeta[companyKey];
      document.getElementById('headerCompanyName').textContent = meta.name;
      document.getElementById('headerLocation').textContent = meta.location;
      document.querySelector('#headerType span').textContent = meta.type;
      document.querySelector('#headerRole span').textContent = meta.role;
    }

    function updateReport() {
      const company = document.getElementById('companySelect').value;
      const period = document.getElementById('periodSelect').value;
      loadAccounts(company, period);
    }

    document.getElementById('companySelect').addEventListener('change', updateReport);
    document.getElementById('periodSelect').addEventListener('change', updateReport);

    // Initial load
    updateReport();
