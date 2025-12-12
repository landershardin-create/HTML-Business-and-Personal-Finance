// --- businesd journal & account.js---

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  console.log("✅ Business Journal & Account Manager HTML loaded");

  function loadScript(path, callback) {
    const script = document.createElement("script");
    script.src = path;
    script.type = "text/javascript";
    script.onload = () => {
      console.log(`✅ Loaded script: ${path}`);
      if (typeof callback === "function") callback();
    };
    script.onerror = () => console.error(`❌ Failed to load script: ${path}`);
    document.body.appendChild(script);
  }

  function syncCompanyDropdowns(dropdownIds, activeCompany) {
    dropdownIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = activeCompany;
    });
  }

  async function populateDropdowns(dropdownIds) {
    try {
      const companies = (typeof StorageAPI !== "undefined" && StorageAPI.listCompanies)
        ? await StorageAPI.listCompanies()
        : [];
      dropdownIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = '<option value="">-- Select Company --</option>';
        companies.forEach(c => {
          const opt = document.createElement("option");
          opt.value = c.id;
          opt.textContent = c.name;
          el.appendChild(opt);
        });
      });
    } catch (err) {
      console.error("❌ Failed to populate companies:", err);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadScript("https://raw.githubusercontent.com/landershardin-create/HTML-Business-and-Personal-Finance/main/js/business-local-persistence-storage.js?raw=true", () => {
      loadScript("https://raw.githubusercontent.com/landershardin-create/HTML-Business-and-Personal-Finance/main/js/business-accounting-journal.js?raw=true", async () => {
        
        const dropdownIds = ["companyHeaderSelect","journalCompany","entryCompany","accountCompany"];
        await populateDropdowns(dropdownIds);

        const activeCompany = (typeof StorageAPI !== "undefined" && StorageAPI.getActiveCompany)
          ? StorageAPI.getActiveCompany()
          : localStorage.getItem("activeCompany");

        if (activeCompany) {
          syncCompanyDropdowns(dropdownIds, activeCompany);
        }

        const headerSelect = document.getElementById("companyHeaderSelect");
        if (headerSelect) {
          headerSelect.addEventListener("change", e => {
            if (typeof StorageAPI !== "undefined" && StorageAPI.setActiveCompany) {
              StorageAPI.setActiveCompany(e.target.value);
            } else {
              localStorage.setItem("activeCompany", e.target.value);
            }

            const savedEntries = (typeof StorageAPI !== "undefined" && StorageAPI.loadEntries)
              ? StorageAPI.loadEntries()
              : JSON.parse(localStorage.getItem("entries")) || [];

            if (typeof renderEntries === "function") {
              renderEntries(savedEntries);
            }

            syncCompanyDropdowns(dropdownIds, e.target.value);
          });
        }
      });
    });
  });
