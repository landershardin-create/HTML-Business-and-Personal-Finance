// --- business local persistent storage.js ---

// Central persistence API
window.StorageAPI = {
  // --- Tabs ---
  saveTabState(tabId, type) {
    const tabs = JSON.parse(localStorage.getItem("dashboardTabs") || "[]");
    tabs.push({ tabId, type });
    localStorage.setItem("dashboardTabs", JSON.stringify(tabs));
  },
  getDashboardTabs() {
    return JSON.parse(localStorage.getItem("dashboardTabs") || "[]");
  },

  // --- Personnel ---
  savePersonnel(person) {
    const personnel = JSON.parse(localStorage.getItem("personnelRegistry") || "[]");
    personnel.push(person);
    localStorage.setItem("personnelRegistry", JSON.stringify(personnel));
  },
  loadPersonnel() {
    return JSON.parse(localStorage.getItem("personnelRegistry") || "[]");
  },

  // --- Journals ---
  saveJournal(journal) {
    const journals = JSON.parse(localStorage.getItem("journals") || "[]");
    journals.push(journal);
    localStorage.setItem("journals", JSON.stringify(journals));
  },
  loadJournals() {
    return JSON.parse(localStorage.getItem("journals") || "[]");
  },

  // --- Journal Entries ---
  saveEntry(entry) {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
  },
  loadEntries() {
    return JSON.parse(localStorage.getItem("entries") || "[]");
  },

  // --- Accounts ---
  saveAccount(account) {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    accounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(accounts));
  },
  loadAccounts() {
    return JSON.parse(localStorage.getItem("accounts") || "[]");
  },

  // --- Active Company ---
  setActiveCompany(companyId) {
    localStorage.setItem("activeCompany", companyId);
  },
  getActiveCompany() {
    return localStorage.getItem("activeCompany");
  }
};

// --- Personnel Form Handler ---
document.getElementById('personnelForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;

  const tableBody = document.querySelector('#registryTable tbody');
  const row = document.createElement('tr');
  row.innerHTML = `<td>${name}</td><td>${email}</td><td>${role}</td>`;
  tableBody.appendChild(row);

  // Persist to local storage
  StorageAPI.savePersonnel({ name, email, role });

  this.reset();
});

// --- Render existing personnel on load ---
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector('#registryTable tbody');
  if (tableBody) {
    StorageAPI.loadPersonnel().forEach(({ name, email, role }) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${name}</td><td>${email}</td><td>${role}</td>`;
      tableBody.appendChild(row);
    });
  }
});
