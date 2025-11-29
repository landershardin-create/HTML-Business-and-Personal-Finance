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
    }
  },
  companyB: {
    annual: {
      "2025": {
        assets: { Cash: 80000, Inventory: 50000, Equipment: 120000 },
        liabilities: { Loans: 60000 },
        equity: { "Retained Earnings": 160000 }
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