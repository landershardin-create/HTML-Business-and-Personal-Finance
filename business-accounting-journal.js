const accountForm = document.getElementById('accountForm');
const linkedAccountSelect = document.getElementById('linkedAccount');
const accountList = document.createElement('ul');
accountList.id = "accountList";
accountForm.appendChild(accountList);

// Load saved accounts on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
  savedAccounts.forEach(acc => addAccountOption(acc.value, acc.text));
});

accountForm.addEventListener('submit', e => {
  e.preventDefault();

  const accountName = document.getElementById('accountName').value.trim();
  const company = document.getElementById('accountCompany').value;

  if (accountName && company) {
    const optionValue = `${company}-${accountName.toLowerCase().replace(/\s+/g, '-')}`;
    const optionText = `${accountName} (${company})`;

    addAccountOption(optionValue, optionText);

    // Save to localStorage
    const savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    savedAccounts.push({ value: optionValue, text: optionText });
    localStorage.setItem('accounts', JSON.stringify(savedAccounts));
  }

  accountForm.reset();
});

// Helper: add account to dropdown + list with delete button
function addAccountOption(value, text) {
  // Dropdown option
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  linkedAccountSelect.appendChild(option);

  // List item with delete button
  const li = document.createElement('li');
  li.textContent = text + " ";
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "❌";
  deleteBtn.type = "button";
  deleteBtn.addEventListener('click', () => {
    const confirmDelete = confirm(`Remove account "${text}"?`);
    if (confirmDelete) {
      // Remove from dropdown
      [...linkedAccountSelect.options].forEach(opt => {
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