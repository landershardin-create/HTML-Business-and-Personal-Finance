// --- business-cash-flow.js---
  
      const companies = {
      AlphaCorp: {
        name: "AlphaCorp",
        location: "New York, NY",
        type: "Retail",
        role: "Owner",
        journal: [
          { activity: "operating", description: "Sales revenue", date: "2025-01-10", amount: 15000 },
          { activity: "operating", description: "Rent payment", date: "2025-02-01", amount: -3000 },
          { activity: "investing", description: "New store equipment", date: "2025-03-15", amount: -4000 },
          { activity: "financing", description: "Bank loan", date: "2025-04-20", amount: 8000 }
        ]
      },
      BetaEnterprises: {
        name: "BetaEnterprises",
        location: "Austin, TX",
        type: "Tech Services",
        role: "Consultant",
        journal: [
          { activity: "operating", description: "Client payments", date: "2025-01-20", amount: 10000 },
          { activity: "operating", description: "Software subscriptions", date: "2025-02-05", amount: -2000 },
          { activity: "investing", description: "Laptop purchase", date: "2025-03-10", amount: -1500 },
          { activity: "financing", description: "Owner draw", date: "2025-04-01", amount: -1000 }
        ]
      }
    };

    function formatCurrency(amount) {
      return `$${amount.toFixed(2)}`;
    }

    function getPeriod(dateStr, view) {
      const date = new Date(dateStr);
      const month = date.getMonth();
      const year = date.getFullYear();

      if (view === "monthly") {
        return `${year}-${String(month + 1).padStart(2, "0")}`;
      } else if (view === "quarterly") {
        const quarter = Math.floor(month / 3) + 1;
        return `Q${quarter} ${year}`;
      }
      return `${year}`; // annual
    }

    function populateCashFlow(companyKey) {
      const company = companies[companyKey];
      const view = document.getElementById("viewSelect").value;
      const { journal, name, location, type, role } = company;

      document.getElementById("headerCompanyName").textContent = name;
      document.getElementById("headerLocation").textContent = location;
      document.getElementById("headerTypeValue").textContent = type;
      document.getElementById("headerRoleValue").textContent = role;

      let totals = {};
      const operatingBody = document.querySelector("#operating-table tbody");
      const investingBody = document.querySelector("#investing-table tbody");
      const financingBody = document.querySelector("#financing-table tbody");

      operatingBody.innerHTML = "";
      investingBody.innerHTML = "";
      financingBody.innerHTML = "";

      journal.forEach(entry => {
        const period = getPeriod(entry.date, view);
        if (!totals[period]) {
          totals[period] = { operating: 0, investing: 0, financing: 0 };
        }
        totals[period][entry.activity] += entry.amount;

        const row = `<tr><td>${entry.description}</td><td>${entry.date}</td><td>${formatCurrency(entry.amount)}</td></tr>`;
        if (entry.activity === "operating") operatingBody.innerHTML += row;
        else if (entry.activity === "investing") investingBody.innerHTML += row;
        else if (entry.activity === "financing") financingBody.innerHTML += row;
      });

      let totalOperating = 0, totalInvesting = 0, totalFinancing = 0;
      for (const period in totals) {
        totalOperating += totals[period].operating;
        totalInvesting += totals[period].investing;
        totalFinancing += totals[period].financing;
      }

      document.getElementById("total-operating").textContent = formatCurrency(totalOperating);
      document.getElementById("total-investing").textContent = formatCurrency(totalInvesting);
      document.getElementById("total-financing").textContent = formatCurrency(totalFinancing);
      document.getElementById("net-cash").textContent = formatCurrency(totalOperating + totalInvesting + totalFinancing);
    }

    document.getElementById("companySelect").addEventListener("change", e => {
      populateCashFlow(e.target.value);
    });

    document.getElementById("viewSelect").addEventListener("change", () => {
      const companyKey = document.getElementById("companySelect").value;
      populateCashFlow(companyKey);
    });

    // Initial load
    populateCashFlow("AlphaCorp");
 
