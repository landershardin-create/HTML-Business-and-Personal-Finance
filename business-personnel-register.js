// --- business-personnel-register.js---

// State
let records = [];
let editingIndex = null;

// Elements
const form = document.getElementById('personnelForm');
const tableBody = document.querySelector('#recordsTable tbody');
const searchInput = document.getElementById('searchInput');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const headerCompanyName = document.getElementById('headerCompanyName');
const headerLocation = document.getElementById('headerLocation');
const headerType = document.getElementById('headerType');
const headerRole = document.getElementById('headerRole');
const companySelect = document.getElementById('companySelect');
const roleSelect = document.getElementById('role');
const personTypeSelect = document.getElementById('persontype'); // ✅ new element

// Example companies for dropdown
const companies = [
  { name: 'Acme Corp', location: 'New York, NY', type: 'Manufacturing' },
  { name: 'Globex Inc', location: 'Chicago, IL', type: 'Finance' },
  { name: 'Initech', location: 'Dallas, TX', type: 'Technology' }
];

// Populate company dropdown
companies.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c.name;
  opt.textContent = c.name;
  companySelect.appendChild(opt);
});

// Update header when company/role changes
function updateHeader() {
  const company = companies.find(c => c.name === companySelect.value);
  headerCompanyName.textContent = company ? company.name : '';
  headerLocation.textContent = company ? company.location : '';
  headerType.textContent = company ? company.type : '';
  headerRole.textContent = `Role: ${roleSelect.value}`;
}
companySelect.addEventListener('change', updateHeader);
roleSelect.addEventListener('change', updateHeader);

// Render table
function renderTable() {
  tableBody.innerHTML = '';
  const filter = searchInput.value.toLowerCase();

  records.forEach((rec, idx) => {
    const values = Object.values(rec).join(' ').toLowerCase();
    if (!filter || values.includes(filter)) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${rec.fname} ${rec.mname} ${rec.lname}</td>
        <td>${rec.position}</td>
        <td>${rec.department}</td>
        <td>${rec.email}</td>
        <td>${rec.businessNames.join(', ')}</td>
        <td>${rec.payrate ? `$${parseFloat(rec.payrate).toFixed(2)}/hr` : ''}</td>
        <td>${rec.persontype || ''}</td> <!-- ✅ show personnel type -->
        <td>
          <button onclick="editRecord(${idx})">Edit</button>
          <button onclick="deleteRecord(${idx})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    }
  });
}

// Add / Edit record
form.addEventListener('submit', e => {
  e.preventDefault();
  const record = {
    idnumber: document.getElementById('idnumber').value,
    ftitle: document.getElementById('ftitle').value,
    dtitle: document.getElementById('dtitle').value,
    fname: document.getElementById('fname').value,
    mname: document.getElementById('mname').value,
    lname: document.getElementById('lname').value,
    ssn: document.getElementById('ssn').value,
    email: document.getElementById('email').value,
    position: document.getElementById('position').value,
    department: document.getElementById('department').value,
    payrate: document.getElementById('payrate').value, // ✅ new field
    persontype: personTypeSelect.value, // ✅ capture personnel type
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    zip: document.getElementById('zip').value,
    doe: document.getElementById('doe').value,
    doet: document.getElementById('doet').value,
    businessNames: [companySelect.value]
  };

  if (editingIndex !== null) {
    records[editingIndex] = record;
    editingIndex = null;
    cancelEditBtn.classList.add('hidden');
    form.querySelector('#submitBtn').textContent = 'Add Record';
  } else {
    records.push(record);
  }

  form.reset();
  renderTable();
});

// Edit record
window.editRecord = function(idx) {
  const rec = records[idx];
  document.getElementById('idnumber').value = rec.idnumber;
  document.getElementById('ftitle').value = rec.ftitle;
  document.getElementById('dtitle').value = rec.dtitle;
  document.getElementById('fname').value = rec.fname;
  document.getElementById('mname').value = rec.mname;
  document.getElementById('lname').value = rec.lname;
  document.getElementById('ssn').value = rec.ssn;
  document.getElementById('email').value = rec.email;
  document.getElementById('position').value = rec.position;
  document.getElementById('department').value = rec.department;
  document.getElementById('payrate').value = rec.payrate; // ✅ populate payrate
  personTypeSelect.value = rec.persontype || 'Employee'; // ✅ populate personnel type
  document.getElementById('address').value = rec.address;
  document.getElementById('city').value = rec.city;
  document.getElementById('state').value = rec.state;
  document.getElementById('zip').value = rec.zip;
  document.getElementById('doe').value = rec.doe;
  document.getElementById('doet').value = rec.doet;

  editingIndex = idx;
  cancelEditBtn.classList.remove('hidden');
  form.querySelector('#submitBtn').textContent = 'Update Record';
};

// Cancel edit
cancelEditBtn.addEventListener('click', () => {
  editingIndex = null;
  form.reset();
  cancelEditBtn.classList.add('hidden');
  form.querySelector('#submitBtn').textContent = 'Add Record';
});

// Delete record
window.deleteRecord = function(idx) {
  records.splice(idx, 1);
  renderTable();
};

// Search
searchInput.addEventListener('input', renderTable);

// Initialize
updateHeader();
renderTable();