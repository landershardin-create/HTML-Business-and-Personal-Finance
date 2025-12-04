// ✅ Business Accounting Journal Logic
console.log("✅ business-accounting-journal.js loaded");

// --- Utility: Load companies from JSON ---
async function populateCompanyDropdowns() {
  try {
    const res = await fetch("data/company-manager-dashboard.json");
    const companies = await res.json();

    const dropdownIds = ["companyHeaderSelect","journalCompany","entryCompany","accountCompany"];
    dropdownIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = '<option value="">-- Select Company --</option>';
        companies.forEach(c => {
          const opt = document.createElement("option");
          opt.value = c.id;
          opt.textContent = c.name;
          el.appendChild(opt);
        });
      }
    });
  } catch (err) {
    console.error("❌ Failed to load companies:", err);
  }
}

// --- Journal Creation ---
document.getElementById("journalForm").addEventListener("submit", e => {
  e.preventDefault();
  const companyId = document.getElementById("journalCompany").value;
  const title = document.getElementById("journalTitle").value;
  const description = document.getElementById("journalDescription").value;

  const journals = JSON.parse(localStorage.getItem("journals")) || [];
  journals.push({ companyId, title, description, created: new Date().toISOString() });
  localStorage.setItem("journals", JSON.stringify(journals));

  alert("✅ Journal created");
});

// --- Entry Creation ---
document.getElementById("entryForm").addEventListener("submit", e => {
  e.preventDefault();
  const companyId = document.getElementById("entryCompany").value;
  const accountId = document.getElementById("linkedAccount").value;
  const label = document.getElementById("entryLabel").value;
  const amount = parseFloat(document.getElementById("amount").value);

  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.push({ companyId, accountId, label, amount, date: new Date().toISOString() });
  localStorage.setItem("entries", JSON.stringify(entries));

  renderEntries(entries);
  renderCharts(entries);
});

// --- Account Creation ---
document.getElementById("accountForm").addEventListener("submit", e => {
  e.preventDefault();
  const companyId = document.getElementById("accountCompany").value;
  const name = document.getElementById("accountName").value;
  const type = document.getElementById("accountType").value;

  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  accounts.push({ companyId, name, type });
  localStorage.setItem("accounts", JSON.stringify(accounts));

  alert("✅ Account created");
});

// --- Render Entries ---
function renderEntries(entries) {
  const list = document.getElementById("journalEntriesList");
  list.innerHTML = "";
  const activeCompany = localStorage.getItem("activeCompany");

  const filtered = entries.filter(e => e.companyId === activeCompany);
  filtered.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e.label}:

{e.amount}`;
    list.appendChild(li);
  });

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById("companyTotals").textContent = `Total: 

{total}`;
}

// --- Render Charts ---
function renderCharts(entries) {
  const ctxType = document.getElementById("accountTypeChart").getContext("2d");
  const ctxMonthly = document.getElementById("monthlyTotalsChart").getContext("2d");

  const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  const accountTypes = {};
  const monthlyTotals = {};

  entries.forEach(entry => {
    const account = accounts.find(a => a.companyId === entry.companyId && a.id === entry.accountId);
    const type = account ? account.type : "Uncategorized";
    accountTypes[type] = (accountTypes[type] || 0) + entry.amount;

    const month = new Date(entry.date).toLocaleString("default", { month: "short" });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + entry.amount;
  });

  new Chart(ctxType, {
    type: "pie",
    data: {
      labels: Object.keys(accountTypes),
      datasets: [{ data: Object.values(accountTypes) }]
    }
  });

  new Chart(ctxMonthly, {
    type: "bar",
    data: {
      labels: Object.keys(monthlyTotals),
      datasets: [{ data: Object.values(monthlyTotals) }]
    }
  });
}

// --- Initialize ---
document.addEventListener("DOMContentLoaded", () => {
  const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
  renderEntries(savedEntries);
  renderCharts(savedEntries);
});