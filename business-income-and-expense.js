// --- business-income-and-expense.js---
   
         const companyMeta = {
      acme: { name: "Acme Corp", location: "New York, NY", type: "Manufacturing", role: "Owner" },
      zenith: { name: "Zenith LLC", location: "Austin, TX", type: "Consulting", role: "Partner" },
      nova: { name: "Nova Industries", location: "San Francisco, CA", type: "Tech Startup", role: "Investor" }
    };

    const companyData = {
      acme: [
        { category: "Product Sales", type: "Income", amount: 120000, date: "2025-01-15" },
        { category: "Service Revenue", type: "Income", amount: 30000, date: "2025-03-10" },
        { category: "Rent", type: "Expense", amount: 15000, date: "2025-01-01" },
        { category: "Salaries", type: "Expense", amount: 40000, date: "2025-03-01" }
      ],
      zenith: [
        { category: "Consulting Fees", type: "Income", amount: 80000, date: "2025-04-01" },
        { category: "Training Services", type: "Income", amount: 20000, date: "2025-04-15" },
        { category: "Marketing", type: "Expense", amount: 10000, date: "2025-04-10" },
        { category: "Travel", type: "Expense", amount: 5000, date: "2025-04-20" }
      ],
      nova: [
        { category: "App Subscriptions", type: "Income", amount: 50000, date: "2025-07-01" },
        { category: "Ad Revenue", type: "Income", amount: 15000, date: "2025-07-15" },
        { category: "Cloud Hosting", type: "Expense", amount: 8000, date: "2025-07-10" },
        { category: "Developer Salaries", type: "Expense", amount: 25000, date: "2025-07-20" }
      ]
    };

    function loadReport(companyKey) {
      const meta = companyMeta[companyKey];
      const data = companyData[companyKey];
      const timeRange = document.getElementById('timeRangeSelect').value;

      document.getElementById('headerCompanyName').textContent = meta.name;
      document.getElementById('headerLocation').textContent = meta.location;
      document.querySelector('#headerType span').textContent = meta.type;
      document.querySelector('#headerRole span').textContent = meta.role;

      const tbody = document.querySelector('#report tbody');
      tbody.innerHTML = '';

      const now = new Date();
      const filteredData = data.filter(entry => {
        const entryDate = new Date(entry.date);
        if (timeRange === "monthly") {
          return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
        } else if (timeRange === "quarterly") {
          const currentQuarter = Math.floor(now.getMonth() / 3);
          const entryQuarter = Math.floor(entryDate.getMonth() / 3);
          return entryQuarter === currentQuarter && entryDate.getFullYear() === now.getFullYear();
        } else {
          return entryDate.getFullYear() === now.getFullYear();
        }
      });

      let totalIncome = 0;
      let totalExpense = 0;
      const expenseSubtotals = {};

      filteredData.forEach(entry => {
        if (entry.type === "Income") totalIncome += entry.amount;
        else if (entry.type === "Expense") {
          totalExpense += entry.amount;
          expenseSubtotals[entry.category] = (expenseSubtotals[entry.category] || 0) + entry.amount;
        }
      });

      filteredData.forEach(entry => {
        const row = document.createElement('tr');
        const subtotal = entry.type === "Expense" ? expenseSubtotals[entry.category].toFixed(2) : '';
        row.innerHTML = `
          <td>${entry.category}</td>
          <td>${entry.type}</td>
          <td class="${entry.type.toLowerCase()}">${entry.amount.toFixed(2)}</td>
          <td class="right-align">${subtotal}</td>
        `;
        tbody.appendChild(row);
      });

      document.getElementById('expenseTotalHeader').textContent = `Total Expenses: ${totalExpense.toFixed(2)}`;

      const net = totalIncome - totalExpense;
      document.getElementById('summary').innerHTML = `
        <p><strong>Total Income:</strong> <span class="income">${totalIncome.toFixed(2)}</span></p>
        <p><strong>Total Expenses:</strong> <span class="expense">${totalExpense.toFixed(2)}</span></p>
        <p><strong>Net Total:</strong> <strong>${net.toFixed(2)}</strong></p>
      `;
    }

    document.getElementById('companySelect').addEventListener('change', () => {
      loadReport(document.getElementById('companySelect').value);
    });

    document.getElementById('timeRangeSelect').addEventListener('change', () => {
      loadReport(document.getElementById('companySelect').value);
    });

    loadReport(document.getElementById('companySelect').value);
