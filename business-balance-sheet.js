// --- business-balance-sheet.js---

// --- Sample Data ---
const balanceSheets = {
  companyA: { /* ... same as before ... */ },
  companyB: { /* ... same as before ... */ },
  companyC: { /* ... same as before ... */ }
};

// --- Populate Company Selector ---
function populateCompanyOptions() {
  const companySelect = document.getElementById("companySelect");
  const companies = [
    { key: "all", name: "All Companies", location: "", type: "", role: "" },
    { key: "companyA", name: "Company A", location: "New York, NY", type: "Retail", role: "Parent" },
    { key: "companyB", name: "Company B", location: "Chicago, IL", type: "Manufacturing", role: "Subsidiary" },
    { key: "companyC", name: "Company C", location: "Austin, TX", type: "Tech", role: "Subsidiary" }
  ];

  companySelect.innerHTML = companies.map(c => `<option value="${c.key}">${c.name}</option>`).join("");
  return companies;
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

const companies = [
  { name: "Alpha Tech", location: "Seattle, WA", type: "LLC", role: "Parent" },
  { name: "Beta Finance", location: "Austin, TX", type: "Inc.", role: "Subsidiary" },
  { name: "Gamma Retail", location: "Chicago, IL", type: "Partnership", role: "Affiliate" }
];

const companySelect = document.getElementById("companySelect");
companies.forEach((c, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = c.name;
  companySelect.appendChild(option);
});

const subPeriodSelect = document.getElementById("subPeriodSelect");
const periodSelect = document.getElementById("periodSelect");

periodSelect.addEventListener("change", () => {
  subPeriodSelect.innerHTML = ""; // reset
  let options = [];
  if (periodSelect.value === "monthly") {
    options = ["Jan", "Feb", "Mar"];
  } else if (periodSelect.value === "quarterly") {
    options = ["Q1", "Q2", "Q3", "Q4"];
  } else {
    options = ["2023", "2024", "2025"];
  }
  options.forEach(o => {
    const opt = document.createElement("option");
    opt.value = o;
    opt.textContent = o;
    subPeriodSelect.appendChild(opt);
  });
});
function renderBalanceSheet(company, data) {
  const container = document.getElementById("balanceSheetContainer");
  container.innerHTML = `
    <h2>${company.name} Balance Sheet</h2>
    <table>
      <tr><th>Category</th><th>Amount</th></tr>
      <tr><td class="assets">Assets</td><td>

{data.assets}</td></tr>
      <tr><td class="liabilities">Liabilities</td><td>

{data.liabilities}</td></tr>
      <tr><td class="equity">Equity</td><td>

{data.equity}</td></tr>
      <tr class="summary"><td>Total</td><td>

{data.assets - data.liabilities}</td></tr>
    </table>
  `;
}
const balanceSheets = {
  "Alpha Tech": { assets: 120000, liabilities: 50000, equity: 70000 },
  "Beta Finance": { assets: 90000, liabilities: 40000, equity: 50000 },
  "Gamma Retail": { assets: 150000, liabilities: 80000, equity: 70000 }
};
document.getElementById("companySelect").addEventListener("change", () => {
  const selected = Array.from(companySelect.selectedOptions).map(o => o.textContent);
  const subPeriod = document.getElementById("subPeriodSelect").value;
  renderMultiCompany(selected, subPeriod);
});

// --- Event Wiring ---
function triggerRender(companies) {
  let selectedCompanies = Array.from(document.getElementById("companySelect").selectedOptions).map(opt => opt.value);
  const periodType = document.getElementById("periodSelect").value;

  if (selectedCompanies.includes("all")) {
    selectedCompanies = companies.filter(c => c.key !== "all").map(c => c.key);
  }

  populateSubPeriods(selectedCompanies, periodType);

  const subPeriod = document.getElementById("subPeriodSelect").value;
  renderBalanceSheets(selectedCompanies, periodType, subPeriod);
  updateHeader(companies);
}

// --- Initial Setup ---
document.addEventListener("DOMContentLoaded", () => {
  const companies = populateCompanyOptions();

  // Default to "All Companies"
  const companySelect = document.getElementById("companySelect");
  companySelect.value = "all";

  // Wire events
  document.getElementById("periodSelect").addEventListener("change", () => triggerRender(companies));
  document.getElementById("companySelect").addEventListener("change", () => triggerRender(companies));
  document.getElementById("subPeriodSelect").addEventListener("change", () => triggerRender(companies));

  // Initial render with "All Companies"
  triggerRender(companies);
  function renderMultiCompany(selectedCompanies, subPeriod) {
  const container = document.getElementById("balanceSheetContainer");
  container.innerHTML = ""; // reset

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.gap = "1em";

  selectedCompanies.forEach(company => {
    const data = balanceSheets[company];
    const table = document.createElement("table");
    table.innerHTML = `
      <caption><strong>${company} – ${subPeriod}</strong></caption>
      <tr><th>Category</th><th>Amount</th></tr>
      <tr><td class="assets">Assets</td><td>

{data.assets}</td></tr>
      <tr><td class="liabilities">Liabilities</td><td>

{data.liabilities}</td></tr>
      <tr><td class="equity">Equity</td><td>

{data.equity}</td></tr>
      <tr class="summary"><td>Total</td><td>

{data.assets - data.liabilities}</td></tr>
    `;
    wrapper.appendChild(table);
  });

  container.appendChild(wrapper);
}
});