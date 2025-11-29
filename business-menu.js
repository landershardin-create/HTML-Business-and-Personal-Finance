const baseURL = 'https://raw.githubusercontent.com/landershardin-create/HTML-Business-and-Personal-Finance/modules/';
  const tabs = {
    businessjournal: 'business accounting journal.html',
    businessbalancesheet: 'business balance sheet.html',
    businesscashflow: 'business cash flow.html',
    businessincomeandexpense: 'business income and expense.html',
    businessnetworth: 'business net worth calculator.html',
    businesspayroll: 'business payroll.html',
    businesspersonnelregistry: 'business personnel registry.html',
    timesheet: 'timesheet.html',
  };

  const contentEl = document.getElementById('content');
  const tabMenu = document.getElementById('tabMenu');

  function showMessage(message, className = '') {
    contentEl.innerHTML = `<p class="${className}">${message}</p>`;
  }

  function loadTab(tabName) {
    const file = tabs[tabName];
    if (!file) {
      showMessage('Invalid selection.', 'error');
      return;
    }

    showMessage('Loading...', 'loading');

    fetch(baseURL + file)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(html => {
        contentEl.innerHTML = html;
      })
      .catch(err => {
        console.error(`Error loading ${tabName}:`, err);
        showMessage(`Error loading "${tabName}" tab.`, 'error');
      });
  }

  window.addEventListener('DOMContentLoaded', () => {
    loadTab(tabMenu.value);
  });

  tabMenu.addEventListener('change', event => {
    loadTab(event.target.value);
  });
