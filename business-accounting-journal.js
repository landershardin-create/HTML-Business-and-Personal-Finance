// business-journal.js

let accountTypeChart;
let monthlyTotalsChart;
let lastDeletedEntry = null;

const entryForm = document.getElementById('entryForm');
const journalEntriesList = document.createElement('ul');
journalEntriesList.id = "journalEntriesList";
document.getElementById('journalEntries').appendChild(journalEntriesList);

const totalsDisplay = document.createElement('div');
totalsDisplay.id = "companyTotals";
totalsDisplay.style.marginTop = "10px";
document.getElementById('journalEntries').appendChild(totalsDisplay);

// --- Load saved entries on page load ---
window.addEventListener('DOMContentLoaded', () => {
  const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
  renderEntries(savedEntries);
});

// --- Handle new entry creation ---
entryForm.addEventListener('submit', e => {
  e.preventDefault();

  const entryLabel = document.getElementById('entryLabel').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const company = document.getElementById('entryCompany').value;
  const accountId = document.getElementById('linkedAccount').value;

  // Look up account type from account list (stored in localStorage)
  const savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const account = savedAccounts.find(acc => acc.id == accountId);
  const accountType = account ? account.type || "Uncategorized" : "Uncategorized";

  if (entryLabel && !isNaN(amount) && company) {
    const entry = {
      id: Date.now(),
      company,
      label: entryLabel,
      amount,
      accountId,
      accountType,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    savedEntries.push(entry);
    localStorage.setItem('entries', JSON.stringify(savedEntries));

    renderEntries(savedEntries);
  }

  entryForm.reset();
});

// --- Render entries filtered by active company ---
function renderEntries(entries) {
  journalEntriesList.innerHTML = "";
  totalsDisplay.innerHTML = "";
  const activeCompany = document.getElementById('companyHeaderSelect').value;

  const filtered = entries.filter(entry => !activeCompany || entry.company === activeCompany);

  let grandTotal = 0;
  const typeTotals = {};
  const monthlyTotals = {};

  filtered.forEach(entry => {
    grandTotal += entry.amount;
    typeTotals[entry.accountType] = (typeTotals[entry.accountType] || 0) + entry.amount;

    const monthKey = new Date(entry.timestamp).toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + entry.amount;

    const li = document.createElement('li');
    li.textContent = `${entry.label} - $${entry.amount.toLocaleString(undefined, {minimumFractionDigits:2})} (${entry.company}, ${entry.accountType}) [${entry.timestamp}]`;

    // Delete button with undo safety
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "❌";
    deleteBtn.type = "button";
    deleteBtn.addEventListener('click', () => {
      const confirmDelete = confirm(`Remove entry "${entry.label}" from ${entry.company}?`);
      if (confirmDelete) {
        lastDeletedEntry = entry;
        let savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
        savedEntries = savedEntries.filter(e => e.id !== entry.id);
        localStorage.setItem('entries', JSON.stringify(savedEntries));
        renderEntries(savedEntries);

        // Show undo button
        const undoBtn = document.createElement('button');
        undoBtn.textContent = "Undo Delete";
        undoBtn.onclick = () => {
          const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
          savedEntries.push(lastDeletedEntry);
          localStorage.setItem('entries', JSON.stringify(savedEntries));
          renderEntries(savedEntries);
          undoBtn.remove();
        };
        totalsDisplay.appendChild(undoBtn);
      }
    });

    li.appendChild(deleteBtn);
    journalEntriesList.appendChild(li);
  });

  // ✅ Fixed totals display with formatted numbers
  const formattedTotal = grandTotal.toLocaleString(undefined, {minimumFractionDigits:2});
  if (activeCompany) {
    totalsDisplay.innerHTML = `<strong>Total for ${activeCompany}:

{formattedTotal}</strong><br>`;
  } else {
    totalsDisplay.innerHTML = `<strong>All Companies Total: 

{formattedTotal}</strong><br>`;
  }

  // Breakdown by account type
  for (const [type, total] of Object.entries(typeTotals)) {
    const p = document.createElement('p');
    p.textContent = `${type}: $${total.toLocaleString(undefined, {minimumFractionDigits:2})}`;
    totalsDisplay.appendChild(p);
  }

  // Render pie chart (account type breakdown)
  const ctxPie = document.getElementById('accountTypeChart').getContext('2d');
  if (accountTypeChart) accountTypeChart.destroy();
  accountTypeChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: Object.keys(typeTotals),
      datasets: [{
        data: Object.values(typeTotals),
        backgroundColor: ['#4CAF50','#FF9800','#2196F3','#9C27B0','#F44336']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: activeCompany ? `Breakdown for ${activeCompany}` : 'Breakdown for All Companies'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              return `$${value.toLocaleString(undefined, {minimumFractionDigits:2})}`;
            }
          }
        }
      }
    }
  });

  // Render bar chart (monthly totals)
  const ctxBar = document.getElementById('monthlyTotalsChart').getContext('2d');
  if (monthlyTotalsChart) monthlyTotalsChart.destroy();
  monthlyTotalsChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: Object.keys(monthlyTotals),
      datasets: [{
        label: 'Monthly Totals',
        data: Object.values(monthlyTotals),
        backgroundColor: '#2196F3'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: activeCompany ? `Monthly Totals for ${activeCompany}` : 'Monthly Totals for All Companies'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              return `

{value.toLocaleString(undefined, {minimumFractionDigits:2})}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return `

{value.toLocaleString(undefined, {minimumFractionDigits:2})}`;
            }
          }
        }
      }
    }
  });
}

// --- Populate linked accounts ---
function populateLinkedAccounts(company) {
  const linkedAccountSelect = document.getElementById('linkedAccount');
  linkedAccountSelect.innerHTML = '<option value="">-- Select Account --</option>';

  const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const filtered = accounts.filter(acc => acc.company === company);

  if (filtered.length > 0) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = company;

    filtered.forEach(acc => {
      const option = document.createElement('option');
      option.value = acc.id;
      option.textContent = `${acc.name} (${acc.type})`;
      optgroup.appendChild(option);
    });

    linkedAccountSelect.appendChild(optgroup);
  }
}

// --- Sync company selection ---
document.getElementById('entryCompany').addEventListener('change', e => {
  populateLinkedAccounts(e.target.value);
});

document.getElementById('companyHeaderSelect').addEventListener('change', e => {
  const company = e.target.value;
  document.getElementById('journalCompany').value = company;
  document.getElementById('entryCompany').value = company;
  document.getElementById('accountCompany').value = company;
  populateLinkedAccounts(company);

  const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
  renderEntries(savedEntries);
});

// --- Handle new account creation ---
document.getElementById('accountForm').addEventListener('submit', e => {
  e.preventDefault();

  const company = document.getElementById('accountCompany').value;
  const name = document.getElementById('accountName').value;
  const type = document.getElementById('accountType').value;

  const newAccount = {
    id: Date.now(),
    company,
    name,
    type
  };

  let accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  accounts.push(newAccount);
  localStorage.setItem('accounts', JSON.stringify(accounts));

  populateLinkedAccounts(company);
  e.target.reset();
function populateCompanyDropdowns() {
  const companies = JSON.parse(localStorage.getItem('companies')) || [];

  const dropdownIds = ["companyHeaderSelect", "journalCompany", "entryCompany", "accountCompany"];
  dropdownIds.forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;

    // Clear existing options
    select.innerHTML = '<option value="">-- Select Company --</option>';

    // Populate from localStorage
    companies.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id;
      option.textContent = c.name;
      select.appendChild(option);
    });
  });
}

// Run on page load
window.addEventListener('DOMContentLoaded', populateCompanyDropdowns);
});