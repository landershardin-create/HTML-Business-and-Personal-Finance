// --- tab loader.js ---

export const tabs = {
  businessjournal: 'business accounting journal.html',
  businessbalancesheet: 'business balance sheet.html',
  businesscashflow: 'business cash flow.html',
  businessincomeandexpense: 'business income and expense.html',
  businessnetworth: 'business net worth calculator.html',
  businesspayroll: 'business payroll.html',
  businesspersonnelregistry: 'business personnel registry.html',
  timesheet: 'timesheet.html',
};

export function loadTab(tabName, contentEl, baseURL) {
  const file = tabs[tabName];
  if (!file) {
    contentEl.innerHTML = `<p class="error">Invalid selection.</p>`;
    return;
  }

  contentEl.innerHTML = `<p class="loading">Loading...</p>`;

  fetch(baseURL + file)
    .then(res => res.ok ? res.text() : Promise.reject('Fetch failed'))
    .then(html => contentEl.innerHTML = html)
    .catch(err => {
      console.error(`Error loading ${tabName}:`, err);
      contentEl.innerHTML = `<p class="error">Error loading "${tabName}" tab.</p>`;
    });
}
tabMenu.value = localStorage.getItem('lastTab') || tabMenu.value;
tabMenu.addEventListener('change', e => {
  localStorage.setItem('lastTab', e.target.value);
  loadTab(e.target.value, contentEl, baseURL);
});

contentEl.innerHTML = `<p class="error">Error loading "${tabName}". <button onclick="loadTab('${tabName}', contentEl, baseURL)">Retry</button></p>`;