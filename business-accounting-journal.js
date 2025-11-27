const accountForm = document.getElementById('accountForm');
const linkedAccountSelect = document.getElementById('linkedAccount');
const resetButton = document.createElement('button');

// Create a reset button dynamically
resetButton.textContent = "Clear All Accounts";
resetButton.type = "button";
resetButton.style.marginTop = "10px";
accountForm.appendChild(resetButton);

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

// Reset button logic with confirmation
resetButton.addEventListener('click', () => {
  const confirmClear = confirm("⚠️ Are you sure you want to clear all accounts? This cannot be undone.");
  if (confirmClear) {
    // Clear dropdown
    linkedAccountSelect.innerHTML = '<option value="">-- Select Account --</option>';
    // Clear localStorage
    localStorage.removeItem('accounts');
    alert("All accounts have been cleared.");
  }
});