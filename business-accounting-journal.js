const accountForm = document.getElementById('accountForm');
const linkedAccountSelect = document.getElementById('linkedAccount');
const accountList = document.createElement('ul');
accountList.id = "accountList";
accountForm.appendChild(accountList);

// Helper: ensure optgroup exists for a company
function getOrCreateOptGroup(company) {
  let optGroup = linkedAccountSelect.querySelector(`optgroup[label="${company}"]`);
  if (!optGroup) {
    optGroup = document.createElement('optgroup');
    optGroup.label = company;
    linkedAccountSelect.appendChild(optGroup);
  }
  return optGroup;
}

// Load saved accounts on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
  savedAccounts.forEach(acc => addAccountOption(acc.company, acc.value, acc.text));
});

accountForm.addEventListener('submit', e => {
  e.preventDefault();

  const accountName = document.getElementById('accountName').value.trim();
  const company = document.getElementById('accountCompany').value;

  if (accountName && company) {
    const optionValue = `${company}-${accountName.toLowerCase().replace(/\s+/g, '-')}`;
    const optionText = `${accountName}`;

    addAccountOption(company, optionValue, optionText);

    // Save to localStorage
    const savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    savedAccounts.push({ company, value: optionValue, text: optionText });
    localStorage.setItem('accounts', JSON.stringify(savedAccounts));
  }

  accountForm.reset();
});

// Helper: add account to dropdown + list with delete button
function addAccountOption(company, value, text) {
  const optGroup = getOrCreateOptGroup(company);

  // Dropdown option
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  optGroup.appendChild(option);
  
const companyHeaderSelect = document.getElementById('companyHeaderSelect');
const journalCompany = document.getElementById('journalCompany');
const entryCompany = document.getElementById('entryCompany');
const accountCompany = document.getElementById('accountCompany');

// Sync header selection to forms
companyHeaderSelect.addEventListener('change', () => {
  const selectedCompany = companyHeaderSelect.value;

  if (selectedCompany) {
    journalCompany.value = selectedCompany;
    entryCompany.value = selectedCompany;
    accountCompany.value = selectedCompany;
  }
});

// Optional: when forms change company, update header too
[journalCompany, entryCompany, accountCompany].forEach(select => {
  select.addEventListener('change', () => {
    if (select.value) {
      companyHeaderSelect.value = select.value;
    }
  });
});

  // List item with delete button
  const li = document.createElement('li');
  li.textContent = `${text} (${company}) `;
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "❌";
  deleteBtn.type = "button";
  deleteBtn.addEventListener('click', () => {
    const confirmDelete = confirm(`Remove account "${text}" from ${company}?`);
    if (confirmDelete) {
      // Remove from dropdown
      [...optGroup.querySelectorAll('option')].forEach(opt => {
        if (opt.value === value) opt.remove();
      });
      // Remove from localStorage
      let savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
      savedAccounts = savedAccounts.filter(acc => acc.value !== value);
      localStorage.setItem('accounts', JSON.stringify(savedAccounts));
      // Remove from list
      li.remove();
    }
  });
  li.appendChild(deleteBtn);
  accountList.appendChild(li);
}