// --- Load Company Manager Dashboard ---
async function loadCompanyManager() {
  try {
    // Example: JSON file hosted in your repo or API endpoint
    const response = await fetch("company-manager.json"); 
    const companyManager = await response.json();

    populateCompanyOptions(companyManager.companies);
  } catch (error) {
    console.error("Error loading company manager:", error);
  }
}

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
function renderCategoryRows(categoryName, categoryData) {
  return Object.entries(categoryData)
    .map(([item, amount]) =>
      `<tr><td>${categoryName}</td><td>${item}</td><td>$${amount.toLocaleString()}</td></tr>`
    ).join("");
}

function renderCompanyTable(companyKey, subPeriod, data) {
  return `
    <h2>Balance Sheet - ${companyKey} (${subPeriod})</h2>
    <table>
      <thead><tr><th>Category</th><th>Item</th><th>Amount</th></tr></thead>
      <tbody>
        ${renderCategoryRows("Assets", data.assets)}
        ${renderCategoryRows("Liabilities", data.liabilities)}
        ${renderCategoryRows("Equity", data.equity)}
      </tbody>
    </table>
  `;
}

function renderSummary(subPeriod, totals) {
  return `
    <h2>Combined Summary (${subPeriod})</h2>
    <table>
      <thead><tr><th>Category</th><th>Total Amount</th></tr></thead>
      <tbody>
        <tr class="summary"><td>Assets</td><td>

{totals.assets.toLocaleString()}</td></tr>
        <tr class="summary"><td>Liabilities</td><td>

{totals.liabilities.toLocaleString()}</td></tr>
        <tr class="summary"><td>Equity</td><td>$${totals.equity.toLocaleString()}</td></tr>
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

// --- Event Wiring ---
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

// --- Initial Setup ---
loadCompanyManager().then(() => {
  populateSubPeriodOptions("annual");
  renderBalanceSheets(["companyA"], "annual", "2025");
});