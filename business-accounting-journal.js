const accountForm = document.getElementById('accountForm');
const linkedAccountSelect = document.getElementById('linkedAccount');

// Load saved accounts on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
  savedAccounts.forEach(acc => {
    const option = document.createElement('option');
    option.value = acc.value;
    option.textContent = acc.text;
    linkedAccountSelect.appendChild(option);
  });
});

accountForm.addEventListener('submit', e => {
  e.preventDefault();

  const accountName = document.getElementById('accountName').value.trim();
  const company = document.getElementById('accountCompany').value;

  if (accountName && company) {
    const optionValue = `${company}-${accountName.toLowerCase().replace(/\s+/g, '-')}`;
    const optionText = `${accountName} (${company})`;

    // Add to dropdown
    const option = document.createElement('option');
    option.value = optionValue;
    option.textContent = optionText;
    linkedAccountSelect.appendChild(option);

    // Save to localStorage
    const savedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    savedAccounts.push({ value: optionValue, text: optionText });
    localStorage.setItem('accounts', JSON.stringify(savedAccounts));
  }

  accountForm.reset();
});