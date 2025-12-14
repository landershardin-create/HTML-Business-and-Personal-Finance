const companyForm = document.getElementById('companyForm');
const companyList = document.getElementById('companyList');
const carouselDisplay = document.getElementById('carouselDisplay');
const exportBtn = document.getElementById('exportBtn');
const clearBtn = document.getElementById('clearBtn');
const syncToGitHubBtn = document.getElementById('syncToGitHubBtn');
const loadFromGitHubBtn = document.getElementById('loadFromGitHubBtn');

let companies = [];
let currentIndex = 0;

// --- Form Submission ---
companyForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const logoFile = document.getElementById('companyLogo').files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const company = {
      name: document.getElementById('companyName').value,
      ein: document.getElementById('companyEIN').value,
      sein: document.getElementById('companySEIN').value,
      stateSalesTax: document.getElementById('companyStateSalesTax').value, // ✅ NEW FIELD
      localSalesTax: document.getElementById('companySalesTax').value,      // ✅ UPDATED FIELD
      street: document.getElementById('streetAddress').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      zip: document.getElementById('zipCode').value,
      role: document.getElementById('companyRole').value,
      type: document.getElementById('companyType').value,
      owners: Array.from(document.querySelectorAll('#ownersContainer span')).map(el => el.textContent),
      partners: Array.from(document.querySelectorAll('#partnersContainer span')).map(el => el.textContent),
      logo: event.target.result || null
    };

    companies.push(company);
    renderCompanyList();
    displayCompany(currentIndex);
    companyForm.reset();
  };

  if (logoFile) {
    reader.readAsDataURL(logoFile);
  } else {
    reader.onload({ target: { result: null } });
  }
});

// --- Render Company List ---
function renderCompanyList() {
  companyList.innerHTML = "";
  companies.forEach(company => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${company.name}</strong><br/>
      EIN: ${company.ein}<br/>
      SEIN: ${company.sein}<br/>
      State Sales Tax #: ${company.stateSalesTax}<br/> <!-- ✅ NEW FIELD -->
      Local Sales Tax #: ${company.localSalesTax}<br/> <!-- ✅ UPDATED FIELD -->
      ${company.logo ? `<img src="${company.logo}" class="company-logo"/>` : ''}
    `;
    companyList.appendChild(div);
  });
}

// --- Carousel Display ---
function displayCompany(index) {
  if (companies.length === 0) {
    carouselDisplay.innerHTML = "No companies added yet.";
    return;
  }
  const company = companies[index];
  carouselDisplay.innerHTML = `
    <h4>${company.name}</h4>
    <p>EIN: ${company.ein}</p>
    <p>SEIN: ${company.sein}</p>
    <p>State Sales Tax #: ${company.stateSalesTax}</p> <!-- ✅ NEW FIELD -->
    <p>Local Sales Tax #: ${company.localSalesTax}</p> <!-- ✅ UPDATED FIELD -->
    <p>${company.city}, ${company.state}</p>
    ${company.logo ? `<img src="${company.logo}" class="company-logo"/>` : ''}
  `;
}

document.getElementById('prevBtn').addEventListener('click', () => {
  if (companies.length > 0) {
    currentIndex = (currentIndex - 1 + companies.length) % companies.length;
    displayCompany(currentIndex);
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if (companies.length > 0) {
    currentIndex = (currentIndex + 1) % companies.length;
    displayCompany(currentIndex);
  }
});

// --- Export Companies ---
exportBtn.addEventListener('click', () => {
  const data = JSON.stringify(companies, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "companies.json";
  a.click();
  URL.revokeObjectURL(url);
});

// --- Clear Companies ---
clearBtn.addEventListener('click', () => {
  companies = [];
  companyList.innerHTML = "";
  carouselDisplay.innerHTML = "No companies added yet.";
});

// --- Sync to GitHub ---
syncToGitHubBtn.addEventListener('click', () => {
  const data = JSON.stringify(companies, null, 2);
  // Replace with your GitHub API call
  console.log("Syncing to GitHub:", data);
  alert("Companies synced to GitHub (logos included).");
});

// --- Load from GitHub ---
loadFromGitHubBtn.addEventListener('click', () => {
  // Replace with your GitHub API call to fetch JSON
  // Example: simulate load
  const exampleData = localStorage.getItem("companiesData");
  if (exampleData) {
    companies = JSON.parse(exampleData);
    renderCompanyList();
    displayCompany(currentIndex);
    alert("Companies loaded from GitHub (logos restored).");
  } else {
    alert("No data found in GitHub simulation.");
  }
});