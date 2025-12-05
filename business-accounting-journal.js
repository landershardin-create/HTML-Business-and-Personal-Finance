<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  console.log("✅ Business Journal & Account Manager HTML loaded");

  // --- Dynamic JS loader ---
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

  // --- DOM Ready ---
  document.addEventListener("DOMContentLoaded", () => {
    // Load persistence first
    loadScript("https://raw.githubusercontent.com/landershardin-create/HTML-Business-and-Personal-Finance/js/business local persistence storage.js", () => {
      
      // Then load business logic
      loadScript("https://raw.githubusercontent.com/landershardin-create/HTML-Business-and-Personal-Finance/js/business-accounting-journal.js", () => {
        
        // Populate dropdowns
        if (typeof populateCompanyDropdowns === "function") {
          populateCompanyDropdowns();
        }

        // Restore active company using persistence API
        const activeCompany = (typeof StorageAPI !== "undefined" && StorageAPI.getActiveCompany)
          ? StorageAPI.getActiveCompany()
          : localStorage.getItem("activeCompany");

        if (activeCompany) {
          ["companyHeaderSelect","journalCompany","entryCompany","accountCompany"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = activeCompany;
          });
        }

        // Sync active company selection
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
          });
        }
      });
    });
  });
</script>