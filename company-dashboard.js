// company-dashboard.js

const companies = [];
let carouselIndex = 0;

// DOM references
const companyForm = document.getElementById("companyForm");
const companyList = document.getElementById("companyList");
const ownerFilter = document.getElementById("ownerFilter");
const carouselDisplay = document.getElementById("carouselDisplay");

// --- OWNER MANAGEMENT ---
document.getElementById("addOwnerBtn").addEventListener("click", () => {
  const ownerName = document.getElementById("ownerName")?.value || document.getElementById("Owner").value;
  if (ownerName.trim()) {
    const container = document.getElementById("ownersContainer");
    const div = document.createElement("div");
    div.textContent = ownerName;
    container.appendChild(div);
    document.getElementById("Owner").value = "";
  }
});

// --- PARTNER MANAGEMENT ---
document.getElementById("addPartnerBtn").addEventListener("click", () => {
  const partnerName = document.getElementById("partnerName")?.value || document.getElementById("Partner").value;
  const partnerShare = document.getElementById("partnerShare")?.value || document.getElementById("PartnerShare").value;
  if (partnerName.trim() && partnerShare.trim()) {
    const container = document.getElementById("partnersContainer");
    const div = document.createElement("div");
    div.textContent = `${partnerName} - ${partnerShare}%`;
    container.appendChild(div);
    document.getElementById("Partner").value = "";
    document.getElementById("PartnerShare").value = "";
    validateOwnership();
  }
});

// --- COMPANY TYPE TOGGLE ---
document.getElementById("companyType").addEventListener("change", e => {
  const type = e.target.value;

  // Partnership shows partner section only
  if (type === "Partnership") {
    document.getElementById("partnerSection").style.display = "block";
    document.getElementById("ownersSection").style.display = "none";
  } 
  // LLC and Corporation should show owners section (like Sole Proprietor)
  else if (type === "LLC" || type === "Corporation" || type === "Sole Proprietor" || type === "Nonprofit") {
    document.getElementById("partnerSection").style.display = "none";
    document.getElementById("ownersSection").style.display = "block";
  } 
  // Default case
  else {
    document.getElementById("partnerSection").style.display = "none";
    document.getElementById("ownersSection").style.display = "block";
  }
});

function validateOwnership() {
  const partners = document.querySelectorAll("#partnersContainer div");
  let total = 0;
  partners.forEach(p => {
    const share = parseFloat(p.textContent.split("-")[1]);
    if (!isNaN(share)) total += share;
  });
  document.getElementById("ownershipWarning").style.display = total === 100 ? "none" : "block";
}

// --- COMPANY TYPE TOGGLE ---
document.getElementById("companyType").addEventListener("change", e => {
  const type = e.target.value;
  document.getElementById("partnerSection").style.display = type === "Partnership" ? "block" : "none";
  document.getElementById("ownersSection").style.display = type === "Partnership" ? "none" : "block";
});

// --- FORM SUBMISSION ---
companyForm.addEventListener("submit", e => {
  e.preventDefault();
  const company = {
    name: document.getElementById("companyName").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    role: document.getElementById("companyRole").value,
    type: document.getElementById("companyType").value,
    owners: Array.from(document.querySelectorAll("#ownersContainer div")).map(d => d.textContent),
    partners: Array.from(document.querySelectorAll("#partnersContainer div")).map(d => d.textContent)
  };
  companies.push(company);
  renderCompanyList();
  updateOwnerFilter();
  companyForm.reset();
  document.getElementById("ownersContainer").innerHTML = "";
  document.getElementById("partnersContainer").innerHTML = "";
});

// --- RENDER COMPANY LIST ---
function renderCompanyList() {
  companyList.innerHTML = "";
  companies.forEach((c, i) => {
    const div = document.createElement("div");
    div.textContent = `${c.name} (${c.type}) - ${c.role}`;
    companyList.appendChild(div);
  });
}

// --- OWNER FILTER ---
function updateOwnerFilter() {
  const owners = new Set();
  companies.forEach(c => c.owners.forEach(o => owners.add(o)));
  ownerFilter.innerHTML = '<option value="">All Owners</option>';
  owners.forEach(o => {
    const opt = document.createElement("option");
    opt.value = o;
    opt.textContent = o;
    ownerFilter.appendChild(opt);
  });
}

ownerFilter.addEventListener("change", e => {
  const filter = e.target.value;
  companyList.innerHTML = "";
  companies.filter(c => !filter || c.owners.includes(filter)).forEach(c => {
    const div = document.createElement("div");
    div.textContent = `${c.name} (${c.type}) - ${c.role}`;
    companyList.appendChild(div);
  });
});

// --- CAROUSEL ---
function renderCarousel() {
  if (companies.length === 0) {
    carouselDisplay.textContent = "No companies available.";
    return;
  }
  const c = companies[carouselIndex];
  carouselDisplay.textContent = `${c.name} (${c.type}) - ${c.role}`;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (companies.length > 0) {
    carouselIndex = (carouselIndex - 1 + companies.length) % companies.length;
    renderCarousel();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (companies.length > 0) {
    carouselIndex = (carouselIndex + 1) % companies.length;
    renderCarousel();
  }
});

// --- EXPORT / CLEAR / GITHUB STUBS ---
document.getElementById("exportBtn").addEventListener("click", () => {
  console.log("Exported companies:", JSON.stringify(companies, null, 2));
});

document.getElementById("clearBtn").addEventListener("click", () => {
  companies.length = 0;
  companyList.innerHTML = "";
  carouselDisplay.textContent = "";
  ownerFilter.innerHTML = '<option value="">All Owners</option>';
});

document.getElementById("syncToGitHubBtn").addEventListener("click", () => {
  alert("Sync to GitHub not yet implemented.");
});

document.getElementById("loadFromGitHubBtn").addEventListener("click", () => {
  alert("Load from GitHub not yet implemented.");
});

// Initial render
renderCarousel();