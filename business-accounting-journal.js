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
  const account = savedAccounts.find(acc => acc.value === accountId);
  const accountType = account ? acc.accountType || "Uncategorized" : "Uncategorized";

  if (entryLabel && !isNaN(amount) && company) {
    const entry = {
      id: Date.now(),
      company,
      label: entryLabel,
      amount,
      accountId,
      accountType,
      timestamp: new Date().toLocaleString()
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

  filtered.forEach(entry => {
    grandTotal += entry.amount;
    typeTotals[entry.accountType] = (typeTotals[entry.accountType] || 0) + entry.amount;

    const li = document.createElement('li');
    li.textContent = `${entry.label} - $${entry.amount} (${entry.company}, ${entry.accountType}) [${entry.timestamp}]`;

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "❌";
    deleteBtn.type = "button";
    deleteBtn.addEventListener('click', () => {
      const confirmDelete = confirm(`Remove entry "${entry.label}" from ${entry.company}?`);
      if (confirmDelete) {
        let savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
        savedEntries = savedEntries.filter(e => e.id !== entry.id);
        localStorage.setItem('entries', JSON.stringify(savedEntries));
        renderEntries(savedEntries);
      }
    });

    li.appendChild(deleteBtn);
    journalEntriesList.appendChild(li);
  });

  // Display totals
  if (activeCompany) {
    totalsDisplay.innerHTML = `<strong>Total for ${activeCompany}:

{grandTotal.toFixed(2)}</strong><br>`;
  } else {
    totalsDisplay.innerHTML = `<strong>All Companies Total: 

{grandTotal.toFixed(2)}</strong><br>`;
  }

  // Breakdown by account type
  for (const [type, total] of Object.entries(typeTotals)) {
    const p = document.createElement('p');
    p.textContent = `${type}: $${total.toFixed(2)}`;
    totalsDisplay.appendChild(p);
  }
}

// --- Re-render entries when active company changes ---
document.getElementById('companyHeaderSelect').addEventListener('change', () => {
  const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
  renderEntries(savedEntries);
});