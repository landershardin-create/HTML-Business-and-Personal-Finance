// --- business-balance-sheet.js---

// --- Sample Data ---
const balanceSheets = {
  companyA: {
    annual: {
      "2025": {
        assets: { Cash: 50000, Inventory: 30000, Equipment: 70000 },
        liabilities: { Loans: 40000 },
        equity: { "Retained Earnings": 90000 }
      }
    },
    quarterly: {
      "Q1-2025": {
        assets: { Cash: 20000, Inventory: 10000, Equipment: 25000 },
        liabilities: { Loans: 10000 },
        equity: { "Retained Earnings": 45000 }
      },
      "Q2-2025": {
        assets: { Cash: 15000, Inventory: 8000, Equipment: 20000 },
        liabilities: { Loans: 8000 },
        equity: { "Retained Earnings": 35000 }
      }
    },
    monthly: {
      "Jan-2025": {
        assets: { Cash: 7000, Inventory: 4000, Equipment: 8000 },
        liabilities: { Loans: 3000 },
        equity: { "Retained Earnings": 16000 }
      },
      "Feb-2025": {
        assets: { Cash: 6000, Inventory: 3500, Equipment: 7500 },
        liabilities: { Loans: 2500 },
        equity: { "Retained Earnings": 14500 }
      }
    }
  },
  companyB: {
    annual: {
      "2025": {
        assets: { Cash: 80000, Inventory: 50000, Equipment: 120000 },
        liabilities: { Loans: 60000 },
        equity: { "Retained Earnings": 160000 }
      }
    },
    quarterly: {
      "Q1-2025": {
        assets: { Cash: 30000, Inventory: 15000, Equipment: 40000 },
        liabilities: { Loans: 20000 },
        equity: { "Retained Earnings": 65000 }
      },
      "Q2-2025": {
        assets: { Cash: 25000, Inventory: 12000, Equipment: 35000 },
        liabilities: { Loans: 18000 },
        equity: { "Retained Earnings": 57000 }
      }
    },
    monthly: {
      "Jan-2025": {
        assets: { Cash: 10000, Inventory: 6000, Equipment: 12000 },
        liabilities: { Loans: 5000 },
        equity: { "Retained Earnings": 23000 }
      },
      "Feb-2025": {
        assets: { Cash: 9000, Inventory: 5500, Equipment: 11000 },
        liabilities: { Loans: 4500 },
        equity: { "Retained Earnings": 21000 }
      }
    }
  },
  companyC: {
    annual: {
      "2025": {
        assets: { Cash: 30000, Inventory: 20000, Equipment: 40000 },
        liabilities: { Loans: 25000 },
        equity: { "Retained Earnings": 50000 }
      }
    },
    quarterly: {
      "Q1-2025": {
        assets: { Cash: 12000, Inventory: 7000, Equipment: 15000 },
        liabilities: { Loans: 8000 },
        equity: { "Retained Earnings": 26000 }
      },
      "Q2-2025": {
        assets: { Cash: 10000, Inventory: 6000, Equipment: 14000 },
        liabilities: { Loans: 7000 },
        equity: { "Retained Earnings": 23000 }
      }
    },
    monthly: {
      "Jan-2025": {
        assets: { Cash: 4000, Inventory: 2500, Equipment: 5000 },
        liabilities: { Loans: 2000 },
        equity: { "Retained Earnings": 9500 }
      },
      "Feb-2025": {
        assets: { Cash: 3500, Inventory: 2200, Equipment: 4800 },
        liabilities: { Loans: 1800 },
        equity: { "Retained Earnings": 8700 }
      }
    }
  }
};

// --- Populate Company Selector ---
function populateCompanyOptions() {
  const companySelect = document.getElementById("companySelect");
  const companies = [
    { key: "companyA", name: "Company A", location: "New York, NY", type: "Retail", role: "Parent" },
    { key: "companyB", name: "Company B", location: "Chicago, IL", type: "Manufacturing", role: "Subsidiary" },
    { key: "companyC", name: "Company C", location: "Austin, TX", type: "Tech", role: "Subsidiary" }
  ];

  companySelect.innerHTML = companies.map(c => `<option value="${c.key}">${c.name}</option>`).join("");
  return companies;
}

// --- Rendering Helpers ---
function renderCompanyTable(companyKey, subPeriod, data) {
  const assetsHTML = Object.entries(data.assets)
    .map(([item, amount]) => `<span class="assets">${item}: $${amount.toLocaleString()}</span>`)
    .join("<br>");
  const liabilitiesHTML = Object.entries(data.liabilities)
    .map(([item, amount]) => `<span class="liabilities">${item}: $${amount.toLocaleString()}</span>`)
    .join("<br>");
  const equityHTML = Object.entries(data.equity)
    .map(([item, amount]) => `<span class="equity">${item}: $${amount.toLocaleString()}</span>`)
    .join("<br>");

  return `
    <h2>Balance Sheet - ${companyKey} (${subPeriod})</h2>
    <table>
      <thead><tr><th>Assets</th><th>Liabilities</th></tr></thead>
      <tbody>
        <tr>
          <td>${assetsHTML}</td>
          <td>${liabilitiesHTML}</td>
        </tr>
        <tr>
          <td colspan="2"><strong>${equityHTML}</strong></td>
        </tr>
      </tbody>
    </table>
  `;
}

function renderSummary(subPeriod, totals) {
  return `
    <h2>Combined Summary (${subPeriod})</h2>
    <table>
      <thead><tr><th>Total Assets</th><th>Total Liabilities</th></tr></thead>
      <tbody>
        <tr>
          <td class="assets">

{totals.assets.toLocaleString()}</td>
          <td class="liabilities">

{totals.liabilities.toLocaleString()}</td>
        </tr>
        <tr>
          <td colspan="2" class="equity"><strong>Equity: $${totals.equity.toLocaleString()}</strong></td>
        </tr>
      </tbody>
    </table>
  `;
}

// --- Main Render Function ---
function renderBalanceSheets(companyKeys, periodType, subPeriod) {
  const container = document.getElementById("balanceSheetContainer");
  let totals = { assets: 0, liabilities: 0, equity: 0 };

  container.innerHTML = companyKeys.map(companyKey => {
    const data = balanceSheets[companyKey]?.[periodType]?.[subPeriod];
    if (!data) return `<p>No data for ${companyKey} in ${subPeriod}</p>`;

    totals.assets += Object.values(data.assets).reduce((a, b) => a + b, 0);
    totals.liabilities += Object.values(data.liabilities).reduce((a, b) => a + b, 0);
    totals.equity += Object.values(data.equity).reduce((a, b) => a + b, 0);

    return renderCompanyTable(companyKey, subPeriod, data);
  }).join("");

  if (companyKeys.length > 1) {
    container.innerHTML += renderSummary(subPeriod, totals);
  }
}

// --- Header Update ---
function updateHeader(companies) {
  const selectedCompanies = Array.from(document.getElementById("companySelect").selectedOptions).map(opt => opt.value);
  const period = document.getElementById("periodSelect").value;
  const subPeriod = document.getElementById("subPeriodSelect").value;
  const header = document.getElementById("reportHeader");

  let companyText = selectedCompanies.length > 0 ? selectedCompanies.join(", ") : "Business";
  let periodText = period ? period.charAt(0).toUpperCase() + period.slice(1) : "";
  let subPeriodText = subPeriod ? subPeriod : "";

  header.textContent = `Balance Sheet Report: ${companyText} — ${periodText} ${subPeriodText}`;

  if (selectedCompanies.length > 0) {
    const firstCompany = companies.find(c => c.key === selectedCompanies[0]);
    if (firstCompany) {
      document.getElementById("headerCompanyName").textContent = firstCompany.name;
      document.getElementById("headerLocation").textContent = `Location: ${firstCompany.location}`;
      document.getElementById("headerTypeValue").textContent = firstCompany.type;
      document.getElementById("headerRoleValue").textContent = firstCompany.role;
    }
  }
}

// --- Event Wiring ---
function triggerRender(companies) {
  const selectedCompanies = Array.from(document.getElementById("companySelect").selectedOptions).map(opt => opt.value);
  const periodType = document.getElementById("periodSelect").value;
  const subPeriod = document.getElementById("subPeriodSelect").value;
  renderBalanceSheets(selectedCompanies, periodType, subPeriod);
  updateHeader(companies);
}

// --- Initial Setup ---
document.addEventListener("DOMContentLoaded", () => {
  const companies = populateCompanyOptions();

  // Populate subperiods (demo: only annual 2025)
  const subSelect = document.getElementById("subPeriodSelect");
  subSelect.innerHTML = `<option value="2025">2025</option>`;
  subSelect.selectedIndex = 0;

  // Wire events
  document.getElementById("periodSelect").addEventListener("change", () => triggerRender(companies));
  document.getElementById("subPeriodSelect").addEventListener("change", () => triggerRender(companies));
  document.getElementById("companySelect").addEventListener("change", () => triggerRender(companies));

  // Initial render
  renderBalanceSheets(["companyA", "companyB", "companyC"], "annual", "2025");
  updateHeader(companies);
});