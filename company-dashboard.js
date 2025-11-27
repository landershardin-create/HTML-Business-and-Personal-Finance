    /* ==============================
       GLOBAL VARIABLES
    ============================== */
    let companies = JSON.parse(localStorage.getItem('companies')) || [];
    let carouselIndex = 0;

    const companyForm = document.getElementById('companyForm');
    const companyList = document.getElementById('companyList');
    const carouselDisplay = document.getElementById('carouselDisplay');
    const ownerFilter = document.getElementById('ownerFilter');
    const companyTypeSelect = document.getElementById('companyType');

    const ownersContainer = document.getElementById('ownersContainer');
    const ownersSection = document.getElementById('ownersSection');
    const partnersContainer = document.getElementById('partnersContainer');
    const partnerSection = document.getElementById('partnerSection');
    const ownershipWarning = document.getElementById('ownershipWarning');

    /* ==============================
       INITIAL OWNER INPUT
    ============================== */
    function addInitialOwner() {
      if (ownersContainer.children.length === 0) {
        addOwner();
      }
    }
    addInitialOwner();

    function addOwner(name = "", email = "", role = "") {
      const index = ownersContainer.children.length;
      const div = document.createElement('div');
      div.className = 'owner-entry';
      div.innerHTML = `
        <input type="text" placeholder="Owner Name" name="ownerName${index}" value="${name}" required />
        <input type="email" placeholder="Email" name="ownerEmail${index}" value="${email}" />
        <input type="text" placeholder="Role" name="ownerRole${index}" value="${role}" />
        <button type="button" onclick="this.parentElement.remove()">Remove</button>
      `;
      ownersContainer.appendChild(div);
    }

    document.getElementById('addOwnerBtn').addEventListener('click', () => addOwner());


    /* ==============================
       PARTNER INPUT
    ============================== */
    function addPartner(name = "", email = "", role = "", share = "") {
      const index = partnersContainer.children.length;
      const div = document.createElement('div');
      div.className = 'partner-entry';
      div.innerHTML = `
        <input type="text" placeholder="Partner Name" name="partnerName${index}" value="${name}" required />
        <input type="email" placeholder="Email" name="partnerEmail${index}" value="${email}" />
        <input type="text" placeholder="Role" name="partnerRole${index}" value="${role}" />
        <input type="number" placeholder="Ownership %" name="partnerShare${index}" value="${share}" min="0" max="100" required />
        <button type="button" onclick="this.parentElement.remove()">Remove</button>
      `;
      partnersContainer.appendChild(div);
    }

    document.getElementById('addPartnerBtn').addEventListener('click', () => addPartner());


    /* ==============================
       COMPANY TYPE CHANGE LOGIC
    ============================== */
    companyTypeSelect.addEventListener('change', () => {
      const isPartnership = companyTypeSelect.value === "Partnership";

      if (isPartnership) {
        ownersSection.style.display = 'block';
        partnerSection.style.display = 'block';
      } else {
        ownersSection.style.display = 'block';
        partnerSection.style.display = 'none';
        partnersContainer.innerHTML = "";
        ownershipWarning.style.display = "none";
      }
    });



    /* ==============================
       FORM SUBMIT HANDLER
    ============================== */
    companyForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const companyType = companyTypeSelect.value;
      const companyName = document.getElementById('companyName').value;

      /* Collect Owners */
      let owners = [...ownersContainer.querySelectorAll('.owner-entry')].map(entry => ({
        name: entry.querySelector('input[name^="ownerName"]').value,
        email: entry.querySelector('input[name^="ownerEmail"]').value,
        role: entry.querySelector('input[name^="ownerRole"]').value
      }));

      /* Collect Partners (only for partnership) */
      let partners = [];
      if (companyType === "Partnership") {
        partners = [...partnersContainer.querySelectorAll('.partner-entry')].map(entry => ({
          name: entry.querySelector('input[name^="partnerName"]').value,
          email: entry.querySelector('input[name^="partnerEmail"]').value,
          role: entry.querySelector('input[name^="partnerRole"]').value,
          share: parseFloat(entry.querySelector('input[name^="partnerShare"]').value)
        }));

        // Validate 100% share
        const totalShare = partners.reduce((sum, p) => sum + p.share, 0);
        if (totalShare !== 100) {
          ownershipWarning.style.display = 'block';
          return;
        } else {
          ownershipWarning.style.display = 'none';
        }
      }

      /* Build Company Object */
      const company = {
        name: companyName,
        address: document.getElementById('streetAddress').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zipCode').value,
        ein: document.getElementById('companyEIN').value,
        sein: document.getElementById('companySEIN').value,
        role: document.getElementById('companyRole').value,
        type: companyType,
        owners,
        partners
      };

      companies.push(company);
      localStorage.setItem('companies', JSON.stringify(companies));
      updateCompanyList();
      updateOwnerFilter();
      updateCarousel();

      companyForm.reset();
      ownersContainer.innerHTML = "";
      partnersContainer.innerHTML = "";
      addInitialOwner();

      partnerSection.style.display = 'none';
    });



    /* ==============================
       LIST, FILTER, CAROUSEL DISPLAY
    ============================== */
    function updateCompanyList() {
      const filter = ownerFilter.value;
      const list = companies.filter(c => !filter || c.owners.some(o => o.name === filter));
      companyList.innerHTML = list.map((c, i) =>
        `<div>${c.name} (${c.owners.map(o => o.name).join(", ")}) - ${c.type}
          <button onclick="editCompany(${i})">Edit</button>
        </div>`
      ).join('');
    }

    function updateOwnerFilter() {
      const allOwners = companies.flatMap(c => c.owners.map(o => o.name));
      const uniqueOwners = [...new Set(allOwners)];
      ownerFilter.innerHTML = `<option value="">All Owners</option>` +
        uniqueOwners.map(o => `<option value="${o}">${o}</option>`).join('');
    }

    function updateCarousel() {
      if (companies.length === 0) {
        carouselDisplay.innerHTML = "<em>No companies added yet.</em>";
        return;
      }
      const c = companies[carouselIndex % companies.length];
      carouselDisplay.innerHTML = `
        <strong>${c.name}</strong><br>
        ${c.city}, ${c.state}<br>
        Type: ${c.type}<br>
        <strong>Owners:</strong>
        <ul>${c.owners.map(o => `<li>${o.name}</li>`).join("")}</ul>
        ${c.partners?.length ? `<strong>Partners:</strong><ul>${c.partners.map(p => `<li>${p.name} (${p.share}%)</li>`).join("")}</ul>` : ""}
      `;
    }


    /* ==============================
       CAROUSEL BUTTONS
    ============================== */
    document.getElementById('prevBtn').addEventListener('click', () => {
      carouselIndex = (carouselIndex - 1 + companies.length) % companies.length;
      updateCarousel();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      carouselIndex = (carouselIndex + 1) % companies.length;
      updateCarousel();
    });


    /* ==============================
       EXPORT / CLEAR
    ============================== */
    document.getElementById('exportBtn').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(companies, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'companies.json';
      a.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
      if (confirm("Clear all companies?")) {
        companies = [];
        localStorage.removeItem('companies');
        updateCompanyList();
        updateOwnerFilter();
        updateCarousel();
      }
    });

    ownerFilter.addEventListener('change', updateCompanyList);


    /* ==============================
       GITHUB SYNC (UNSECURED DEMO)
    ============================== */
    const GITHUB_USERNAME = "your-username";
    const REPO_NAME = "company-dashboard-data";
    const FILE_PATH = "companies.json";
    const BRANCH = "main";
    const TOKEN = "ghp_your_personal_access_token";

    async function syncToGitHub() {
      const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;
      try {
        const getRes = await fetch(apiUrl, {
          headers: { Authorization: `token ${TOKEN}` }
        });
        const fileData = await getRes.json();
        const sha = fileData.sha;

        const content = btoa(unescape(encodeURIComponent(JSON.stringify(companies, null, 2))));
        const res = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            Authorization: `token ${TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: "Sync companies.json from dashboard",
            content,
            sha,
            branch: BRANCH
          })
        });

        alert(res.ok ? "Synced to GitHub!" : "GitHub sync failed.");
      } catch (err) {
        alert("Error: " + err.message);
      }
    }

    async function loadFromGitHub() {
      const apiUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/${BRANCH}/${FILE_PATH}`;
      try {
        const res = await fetch(apiUrl);
        if (res.ok) {
          companies = await res.json();
          localStorage.setItem("companies", JSON.stringify(companies));
          updateCompanyList();
          updateOwnerFilter();
          updateCarousel();
          alert("Loaded from GitHub!");
        }
      } catch (err) {
        alert("Error: " + err.message);
      }
    }

    document.getElementById("syncToGitHubBtn").addEventListener("click", syncToGitHub);
    document.getElementById("loadFromGitHubBtn").addEventListener("click", loadFromGitHub);

    /* INITIAL LOAD */
    updateCompanyList();
    updateOwnerFilter();
    updateCarousel();