// --- Populate Company Selector ---
function populateCompanyOptions(companies) {
  const companySelect = document.getElementById("companySelect");
  companySelect.innerHTML = companies
    .map(c => `<option value="${c.key}">${c.name}</option>`)
    .join("");
}

// --- Utility: derive subperiods dynamically ---
function getSubPeriods(periodType) {
  const companies = Object.values(balanceSheets);
  const allPeriods = new Set();
  companies.forEach(c => {
    if (c[periodType]) {
      Object.keys(c[periodType]).forEach(p => allPeriods.add(p));
    }
  });
  return Array.from(allPeriods);
}

function populateSubPeriodOptions(periodType) {
  const subSelect = document.getElementById("subPeriodSelect");
  const periods = getSubPeriods(periodType);
  subSelect.innerHTML = periods.map(p => `<option value="${p}">${p}</option>`).join("");
  subSelect.selectedIndex = 0;
}

// --- Rendering Helpers ---
function renderCompanyTable(companyKey, subPeriod, data) {
  const assetsHTML = Object.entries(data.assets)
    .map(([item, amount]) => `${item}: $${amount.toLocaleString()}`)
    .join("<br>");
  const liabilitiesHTML = Object.entries(data.liabilities)
    .map(([item, amount]) => `${item}: $${amount.toLocaleString()}`)
    .join("<br>");
  const equityHTML = Object.entries(data.equity)
    .map(([item, amount]) => `${item}: $${amount.toLocaleString()}`)
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
          <td>

{totals.assets.toLocaleString()}</td>
          <td>

{totals.liabilities.toLocaleString()}</td>
        </tr>
        <tr>
          <td colspan="2"><strong>Equity: $${totals.equity.toLocaleString()}</strong></td>
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
function updateHeader(companyManager) {
  const selectedCompanies = Array.from(document.getElementById("companySelect").selectedOptions).map(opt => opt.value);
  const period = document.getElementById("periodSelect").value;
  const subPeriod = document.getElementById("subPeriodSelect").value;
  const header = document.getElementById("reportHeader");

  let companyText = selectedCompanies.length > 0 ? selectedCompanies.join(", ") : "Business";
  let periodText = period ? period.charAt(0).toUpperCase() + period.slice(1) : "";
  let subPeriodText = subPeriod ? subPeriod : "";

  header.textContent = `Balance Sheet Report: ${companyText} — ${periodText} ${subPeriodText}`;

  if (selectedCompanies.length > 0) {
    const firstCompany = companyManager.companies.find(c => c.key === selectedCompanies[0]);
    if (firstCompany) {
      document.getElementById("headerCompanyName").textContent = firstCompany.name;
      document.getElementById("headerLocation").textContent = `Location: ${firstCompany.location || "(from JSON)"}`;
      document.getElementById("headerTypeValue").textContent = firstCompany.type || "Type from JSON";
      document.getElementById("headerRoleValue").textContent = firstCompany.role || "Role from JSON";
    }
  }
}

// --- Event Wiring ---
function triggerRender(companyManager) {
  const selectedCompanies = Array.from(document.getElementById("companySelect").selectedOptions).map(opt => opt.value);
  const periodType = document.getElementById("periodSelect").value;
  const subPeriod = document.getElementById("subPeriodSelect").value;
  renderBalanceSheets(selectedCompanies, periodType, subPeriod);
  updateHeader(companyManager);
}

// --- Load Company Manager ---
async function loadCompanyManager() {
  try {
    const response = await fetch("https://landershardin-create.github.io/HTML-Business-and-Personal-Finance/data/company-manager.json");
    const companyManager = await response.json();
    populateCompanyOptions(companyManager.companies);

    // Wire events
    document.getElementById("periodSelect").addEventListener("change", (e) => {
      populateSubPeriodOptions(e.target.value);
      triggerRender(companyManager);
    });
    document.getElementById("subPeriodSelect").addEventListener("change", () => triggerRender(companyManager));
    document.getElementById("companySelect").addEventListener("change", () => triggerRender(companyManager));

    // Initial setup
    populateSubPeriodOptions("annual");
    renderBalanceSheets([companyManager.companies[0].key], "annual", "2025");
    updateHeader(companyManager);
  } catch (error) {
    console.error("Error loading company manager:", error);
  }
}

loadCompanyManager();