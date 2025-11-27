const accountForm = document.getElementById('accountForm');
const linkedAccountSelect = document.getElementById('linkedAccount');

accountForm.addEventListener('submit', e => {
  e.preventDefault();

  const accountName = document.getElementById('accountName').value.trim();
  const company = document.getElementById('accountCompany').value;

  if (accountName && company) {
    const option = document.createElement('option');
    option.value = `${company}-${accountName.toLowerCase().replace(/\s+/g, '-')}`;
    option.textContent = `${accountName} (${company})`;
    linkedAccountSelect.appendChild(option);
  }

  accountForm.reset();
});