// --- dashboard.js ---
    
            const tabs = {
      companymgr: '<p>Welcome to the Company Manager tab. Use the form below to add and manage companies.</p>',
      businessmenu: '<p>This is the Business Menu. Customize it with your business tools and dashboards.</p>',
      personalmenu: '<p>This is the Personal Menu. Add personal finance tools or dashboards here.</p>'
    };

    let companies = [];
    let currentIndex = 0;

    function saveCompanies() {
      localStorage.setItem('companies', JSON.stringify(companies));
    }

    function loadCompanies() {
      const stored = localStorage.getItem('companies');
      if (stored) companies = JSON.parse(stored);
    }

    function renderCompanySelect() {
      companySelect.innerHTML = '';
      companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company.name;
        option.textContent = company.name;
        companySelect.appendChild(option);
      });
    }

    function renderOwnerFilter() {
      const owners = [...new Set(companies.map(c => c.owner).filter(Boolean))];
      ownerFilter.innerHTML = '<option value="">All Owners</option>';
      owners.forEach(owner => {
        const opt = document.createElement('option');
        opt.value = owner;
        opt.textContent = owner;
        ownerFilter.appendChild(opt);
      });
    }

    function renderCompanyList(filterOwner = '') {
      companyList.innerHTML = '';
      const filtered = filterOwner ? companies.filter(c => c.owner === filterOwner) : companies;
      filtered.forEach((company, index) => {
        const tag = document.createElement('span');
        const fullAddress = `${company.street || ''}, ${company.city || ''}, ${company.state || ''} ${company.zip || ''}`.trim();
        tag.textContent = `${company.name} (${company.type || 'Type unknown'}, ${company.owner || 'No owner'})`;
        tag.title = `Address: ${fullAddress || 'N/A'}\nEIN: ${company.ein || 'N/A'}\nSEIN: ${company.sein || 'N/A'}`;
        tag.onclick = () => editCompany(index);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.title = `Remove ${company.name}`;
        removeBtn.onclick = (e) => {
          e.stopPropagation();
          companies.splice(index, 1);
          saveCompanies();
          renderCompanySelect();
          renderOwnerFilter();
          renderCompanyList(ownerFilter.value);
          renderCarousel();
        };
        tag.appendChild(removeBtn);
        companyList.appendChild(tag);
      });
    }

    function editCompany(index) {
      const company = companies[index];
      companyName.value = company.name;
      streetAddress.value = company.street || '';
      city.value = company.city || '';
      state.value = company.state || '';
      zipCode.value = company.zip || '';
      companyOwner.value = company.owner || '';
      companyEIN.value = company.ein || '';
      companySEIN.value = company.sein || '';
      companyType.value = company.type || '';
      companies.splice(index, 1);
      saveCompanies();
      renderCompanySelect();
      renderOwnerFilter();
      renderCompanyList(ownerFilter.value);
      renderCarousel();
    }

    function renderCarousel() {
      const display = document.getElementById('carouselDisplay');
      if (companies.length === 0) {
        display.innerHTML = '<p>No companies to display.</p>';
        return;
      }
      const company = companies[currentIndex];
      const fullAddress = `${company.street || ''}, ${company.city || ''}, ${company.state || ''} ${company.zip || ''}`.trim();
      display.innerHTML = `
        <strong>${company.name}</strong><br/>
        Type: ${company.type || 'N/A'}<br/>
        Owner: ${company.owner || 'N/A'}<br/>
        Address: ${fullAddress || 'N/A'}<br/>
        EIN: ${company.ein || 'N/A'}<br/>
        SEIN: ${company.sein || 'N/A'}
      `;
    }

    function nextCompany() {
      if (companies.length === 0) return;
      currentIndex = (currentIndex + 1) % companies.length;
      renderCarousel();
    }

    function prevCompany() {
      if (companies.length === 0) return;
      currentIndex = (currentIndex - 1 + companies.length) % companies.length;
      renderCarousel();
    }

    function exportCompanies() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(companies, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "companies.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }

    companyForm.onsubmit = function (e) {
      e.preventDefault();
      const newCompany = {
        name: companyName.value.trim(),
        street: streetAddress.value.trim(),
        city: city.value.trim(),
        state: state.value.trim(),
        zip: zipCode.value.trim(),
        owner: session.username,
        ein: companyEIN.value.trim(),
        sein: companySEIN.value.trim(),
        type: companyType.value,
        role: session.role
    };
      if (!newCompany.name) return;
      companies.push(newCompany);
      saveCompanies();
      companyForm.reset();
      renderCompanySelect();
      renderOwnerFilter();
      renderCompanyList(ownerFilter.value);
      renderCarousel();
    };

    ownerFilter.onchange = () => renderCompanyList(ownerFilter.value);

    // Initialize
function initializeDashboard() {
  loadCompanies();
  renderCompanySelect();
  renderOwnerFilter();
  renderCompanyList();
  renderCarousel();

  const savedTab = localStorage.getItem('selectedTab') || 'companymgr';
  tabMenu.value = savedTab;
  content.innerHTML = tabs[savedTab] || '<p>Section not found.</p>';
  if (savedTab === 'contributormenu') renderContributorDashboard();
}
initializeDashboard();

ownerFilter.onchange = () => {
  renderCompanyList(ownerFilter.value);
  renderCompanySelectFiltered(ownerFilter.value);
};

function renderCompanySelectFiltered(owner) {
  companySelect.innerHTML = '';
  const filtered = owner ? companies.filter(c => c.owner === owner) : companies;
  filtered.forEach(company => {
    const option = document.createElement('option');
    option.value = company.name;
    option.textContent = company.name;
    companySelect.appendChild(option);
  });
}

function editCompany(index) {
  const company = companies[index];
  // ... existing code ...
  companyName.focus();
  window.scrollTo({ top: companyForm.offsetTop, behavior: 'smooth' });
}

function canEdit(company) {
  return company.role === 'Editor' || company.role === 'Owner';
}

function renderCompanyList(filterOwner = '') {
  companyList.innerHTML = '';
  const filtered = filterOwner ? companies.filter(c => c.owner === filterOwner) : companies;
  filtered.forEach((company, index) => {
    const tag = document.createElement('span');
    tag.setAttribute('data-role', company.role || 'Viewer');
    tag.textContent = `${company.name} (${company.type || 'Type unknown'}, ${company.owner || 'No owner'})`;
    tag.title = `Role: ${company.role || 'Viewer'}`;
    if (canEdit(company)) {
      tag.onclick = () => editCompany(index);
    }
    // Remove button only for owners
    if (company.role === 'Owner') {
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '×';
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        companies.splice(index, 1);
        saveCompanies();
        renderCompanySelect();
        renderOwnerFilter();
        renderCompanyList(ownerFilter.value);
        renderCarousel();
      };
      tag.appendChild(removeBtn);
    }
    companyList.appendChild(tag);
  });
}

const session = {
  username: 'landers',
  role: 'Owner' // Can be 'Owner', 'Editor', or 'Viewer'
};

function canEdit(company) {
  return session.role === 'Owner' || (session.role === 'Editor' && company.owner === session.username);
}

function canRemove(company) {
  return session.role === 'Owner' && company.owner === session.username;
}

if (session.role !== 'Owner') {
  document.getElementById('companyRole').style.display = 'none';
}
companyForm.reset();
companyRole.value = 'Viewer';

tabs.contributormenu = `
  <h3>Contributor Dashboard</h3>
  <p>Welcome, ${session.username} (${session.role})</p>
  <div id="contributorCompanies"></div>
`;

function renderContributorDashboard() {
  const container = document.getElementById('contributorCompanies');
  if (!container) return;

  const visibleCompanies = companies.filter(c =>
    session.role === 'Owner' ||
    c.owner === session.username ||
    c.role === 'Editor'
  );

  if (visibleCompanies.length === 0) {
    container.innerHTML = '<p>No companies assigned to you.</p>';
    return;
  }

  container.innerHTML = '<ul>' + visibleCompanies.map((c, i) => {
    return `<li>
      <strong>${c.name}</strong> (${c.type || 'Type unknown'})<br/>
      Owner: ${c.owner} | Role: ${c.role}
      ${session.role === 'Owner' ? `<br/><button onclick="changeRole(${i})">Change Role</button>` : ''}
    </li>`;
  }).join('') + '</ul>';
}

function changeRole(index) {
  const newRole = prompt('Enter new role (Viewer, Editor, Owner):');
  if (!['Viewer', 'Editor', 'Owner'].includes(newRole)) {
    alert('Invalid role.');
    return;
  }
  companies[index].role = newRole;
  saveCompanies();
  renderCompanyList(ownerFilter.value);
  renderContributorDashboard();
}

tabMenu.onchange = function () {
  const selected = tabMenu.value;
  localStorage.setItem('selectedTab', selected);
  content.innerHTML = tabs[selected] || '<p>Section not found.</p>';
  if (selected === 'contributormenu') renderContributorDashboard();
};

if (userRole === 'Viewer') {
  document.querySelector('#companyForm button').disabled = true;
}

document.addEventListener("DOMContentLoaded", () => {
  const tabMenu = document.getElementById("tabMenu");
  const content = document.getElementById("content");

  tabMenu.addEventListener("change", () => {
    const selected = tabMenu.value;

    // Map tab values to HTML file paths
    const tabFiles = {
      // companymgr: "company-info.html",
      businessmenu: "business menu.html",
      personalmenu: "personal menu.html",
      // contributormenu: "contributor-dashboard.html"
    };

    const fileToLoad = tabFiles[selected];
    if (fileToLoad) {
      fetch(fileToLoad)
        .then(response => response.text())
        .then(html => {
          content.innerHTML = html;
        })
        .catch(error => {
          content.innerHTML = `<p>Error loading ${fileToLoad}: ${error}</p>`;
        });
    }
  });

  // Optionally trigger default load
  tabMenu.dispatchEvent(new Event("change"));
});

content.innerHTML = "<p>Loading...</p>";
document.addEventListener("DOMContentLoaded", function () {
  const tabMenu = document.getElementById("tabMenu");

  tabMenu.addEventListener("change", function () {
    if (tabMenu.value === "businessmenu") {
      window.location.href = "business menu.html";
    }
  });
});

function updateUIByRole(role) {
  const contributorSection = document.querySelector('.company-manager');
  contributorSection.style.display = role === 'Owner' || role === 'Editor' ? 'block' : 'none';
}
const sessionUser = { name: "Landers", role: "Owner" }; // Example
document.getElementById('ownerFilter').value = sessionUser.name;
updateUIByRole(sessionUser.role);
document.getElementById('companyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const company = {
    name: document.getElementById('companyName').value,
    owner: document.getElementById('companyOwner').value,
    role: document.getElementById('companyRole').value,
    type: document.getElementById('companyType').value
  };
  addCompanyToList(company);
});

function addCompanyToList(company) {
  const list = document.getElementById('companyList');
  const item = document.createElement('div');
  item.textContent = `${company.name} (${company.type}) - ${company.role}`;
  list.appendChild(item);
}
function updateUIByRole(role) {
  const managerSection = document.querySelector('.company-manager');
  managerSection.style.display = ['Owner', 'Editor'].includes(role) ? 'block' : 'none';
}
function exportCompanies() {
  const companies = [...document.querySelectorAll('#companyList div')].map(div => div.textContent);
  const blob = new Blob([companies.join('\n')], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'companies.txt';
  link.click();
}
const userRole = sessionStorage.getItem('userRole'); // e.g., 'Viewer', 'Editor', 'Owner'
document.querySelectorAll('.company-manager, .filter-export').forEach(el => {
  el.style.display = (userRole === 'Owner' || userRole === 'Editor') ? 'block' : 'none';
});
function populateDropdowns(companies) {
  const companySelect = document.getElementById('companySelect');
  const ownerFilter = document.getElementById('ownerFilter');
  const owners = new Set();

  companies.forEach(company => {
    const option = new Option(company.name, company.id);
    companySelect.add(option);
    owners.add(company.owner);
  });

  owners.forEach(owner => {
    const option = new Option(owner, owner);
    ownerFilter.add(option);
  });
}
document.getElementById('tabMenu').addEventListener('change', e => {
  const section = e.target.value;
  document.getElementById('content').innerHTML = `<p>Loading ${section}...</p>`;
  // Load relevant content dynamically here
});
let currentIndex = 0;
let companyData = [];

function updateCarousel() {
  const display = document.getElementById('carouselDisplay');
  const company = companyData[currentIndex];
  display.innerHTML = company ? `<strong>${company.name}</strong><br>${company.city}, ${company.state}` : 'No company selected';
}

function prevCompany() {
  if (companyData.length) {
    currentIndex = (currentIndex - 1 + companyData.length) % companyData.length;
    updateCarousel();
  }
}

function nextCompany() {
  if (companyData.length) {
    currentIndex = (currentIndex + 1) % companyData.length;
    updateCarousel();
  }
}
function exportCompanies() {
  const rows = companies.map(c => `${c.name},${c.owner},${c.city},${c.state}`);
  const csv = ['Name,Owner,City,State', ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'companies.csv';
  link.click();
}

document.getElementById('companyRole').addEventListener('change', function() {
  const role = this.value;
  // Example: hide EIN field for Viewers
  document.getElementById('companyEIN').style.display = role === 'Viewer' ? 'none' : 'block';
});

sessionStorage.setItem('selectedCompany', companyId);
sessionStorage.setItem('userRole', role);

if (role !== 'Owner') {
  document.getElementById('companyEIN').disabled = true;
}

document.getElementById('tabMenu').addEventListener('change', (e) => {
  localStorage.setItem('selectedTab', e.target.value);
});
window.addEventListener('load', () => {
  const savedTab = localStorage.getItem('selectedTab');
  if (savedTab) document.getElementById('tabMenu').value = savedTab;
});

function populateOwnerFilter(companies) {
  const owners = [...new Set(companies.map(c => c.owner))];
  const filter = document.getElementById('ownerFilter');
  owners.forEach(owner => {
    const opt = document.createElement('option');
    opt.value = owner;
    opt.textContent = owner;
    filter.appendChild(opt);
  });
}

function applyRolePermissions(role) {
  const isOwner = role === 'Owner';
  document.querySelectorAll('.company-manager input, .company-manager select').forEach(el => {
    el.disabled = !isOwner;
  });
}

let currentIndex = 0;
function updateCarousel(companies) {
  const display = document.getElementById('carouselDisplay');
  display.textContent = `${companies[currentIndex].name} — ${companies[currentIndex].city}`;
}
function nextCompany() {
  currentIndex = (currentIndex + 1) % companies.length;
  updateCarousel(companies);
}
function prevCompany() {
  currentIndex = (currentIndex - 1 + companies.length) % companies.length;
  updateCarousel(companies);
}