// --- business-balance-sheet.js ---

// --- Sample Data ---
const balanceSheets = {
  companyA: {
    annual: {
      "2023": {
        assets: { Cash: 50000, Inventory: 70000 },
        liabilities: { Loans: 30000 },
        equity: { RetainedEarnings: 90000 }
      }
    }
  },
  companyB: {
    annual: {
      "2023": {
        assets: { Cash: 40000, Equipment: 50000 },
        liabilities: { Debt: 20000 },
        equity: { RetainedEarnings: 70000 }
      }
    }
  },
  companyC: {
    annual: {
      "2023": {
        assets: { Cash: 60000, IP: 90000 },
        liabilities: { Debt: 40000 },
        equity: { RetainedEarnings: 110000 }
      }
    }
  }
};

// --- Company Metadata ---
const companies = [
  { key: "all", name: "All Companies", location: "", type: "", role: "" },
  { key: "companyA", name: "Company A", location: "New York, NY", type: "Retail", role: "Parent" },
  { key: "companyB", name: "Company B", location: "Chicago, IL", type: "Manufacturing", role: "Subsidiary" },
  { key: "companyC", name: "Company C", location: "Austin, TX", type: "Tech", role: "Subsidiary" }
];

// --- Populate Company Selector ---
function populateCompanyOptions() {
  const companySelect = document.getElementById("companySelect");
  companySelect.innerHTML = companies
    .map(c => `<option value="${c.key}">${c.name}</option>`)
    .join("");
}

// --- Populate Subperiods Dynamically ---
function populateSubPeriods(companyKeys, periodType) {
  const subSelect = document.getElementById("subPeriodSelect");
  let subPeriods = new Set();

  companyKeys.forEach(companyKey => {
    const periods = balanceSheets[companyKey]?.[periodType];
    if (periods) {
      Object.keys(periods).forEach(p => subPeriods.add(p));
    }
  });

  const sortedPeriods = Array.from(subPeriods).sort();
  subSelect.innerHTML = sortedPeriods.map(p => `<option value="${p}">${p}</option>`).join("");
  if (sortedPeriods.length > 0) subSelect.selectedIndex = 0;
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
      <thead><tr><th>Total Assets</th><th>Total Liabilities</th><th>Total Equity</th></tr></thead>
      <tbody>
        <tr>
          <td class="assets">

{totals.assets.toLocaleString()}</td>
          <td class="liabilities">

{totals.liabilities.toLocaleString()}</td>
          <td class="equity">$${totals.equity.toLocaleString()}</td>
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
function updateHeader() {
  const selectedCompanies = Array.from(document.getElementById("companySelect").selectedOptions).map(opt => opt.value);
  const period = document.getElementById("periodSelect").value;
  const subPeriod = document.getElementById("subPeriodSelect").value;
  const header = document.getElementById("reportHeader");

  let companyText = selectedCompanies.includes("all")
    ? "All Companies"
    : (selectedCompanies.length > 0 ? selectedCompanies.join(", ") : "Business");

  let periodText = period ? period.charAt(0).toUpperCase() + period.slice(1) : "";
  let subPeriodText = subPeriod ? subPeriod : "";

  header.textContent = `Balance Sheet Report: ${companyText} — ${periodText} ${subPeriodText}`;

  if (!selectedCompanies.includes("all") && selectedCompanies.length > 0) {
    const firstCompany = companies.find(c => c.key === selectedCompanies[0]);
    if (firstCompany) {
      document.getElementById("headerCompanyName").textContent = firstCompany.name;
      document.getElementById("headerLocation").textContent = `Location: ${firstCompany.location}`;
      document.getElementById("headerTypeValue").textContent = firstCompany.type;
      document.getElementById("headerRoleValue").textContent = firstCompany.role;
    }
  } else {
    document.getElementById("headerCompanyName").textContent = "All Companies";
    document.getElementById("headerLocation").textContent = "";
    document.getElementById("headerTypeValue").textContent = "";
    document.getElementById("headerRoleValue").textContent = "";
  }
}

// --- Event Wiring ---
function triggerRender() {
  let selectedCompanies = Array.from(document.getElementById("companySelect").selectedOptions).map(opt => opt.value);
  const periodType = document.getElementById("periodSelect").value;

  if (selectedCompanies.includes("all")) {
    selectedCompanies = companies.filter(c => c.key !== "all").map(c => c.key);
  }

  populateSubPeriods(selectedCompanies, periodType);

  const subPeriod = document.getElementById("subPeriodSelect").value;
  renderBalanceSheets(selectedCompanies, periodType, subPeriod);
  updateHeader();
}

// --- Initial Setup ---
document.addEventListener("DOMContentLoaded", () => {
  populateCompanyOptions();

  // Default to "All Companies"
  const companySelect = document.getElementById("companySelect");
  companySelect.value = "all";

  // Wire events
  document.getElementById("periodSelect").addEventListener("change", triggerRender);
  document.getElementById("companySelect").addEventListener("change", triggerRender);
  document.getElementById("subPeriodSelect").addEventListener("change", triggerRender);

  // Initial render
  triggerRender();
});