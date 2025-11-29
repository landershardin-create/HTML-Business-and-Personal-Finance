// --- business-debt-timekeeping.js---
   
         const entries = [];

    function addEntry() {
      const business = document.getElementById("business").value;
      const contributor = document.getElementById("contributor").value;
      const date = document.getElementById("date").value;
      const hours = parseFloat(document.getElementById("hours").value);

      if (!contributor || !date || isNaN(hours)) return;

      entries.push({ business, contributor, date, hours });
      renderTable();
      updateTotals();
    }

    function renderTable() {
      const tbody = document.querySelector("#timesheet tbody");
      tbody.innerHTML = "";
      entries.forEach(entry => {
        const row = `<tr>
          <td>${entry.business}</td>
          <td>${entry.contributor}</td>
          <td>${entry.date}</td>
          <td>${entry.hours}</td>
        </tr>`;
        tbody.innerHTML += row;
      });
    }

    function updateTotals() {
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());

      const weekly = entries.filter(e => {
        const d = new Date(e.date);
        return d >= weekStart && d <= now;
      }).reduce((sum, e) => sum + e.hours, 0);

      const monthly = entries.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).reduce((sum, e) => sum + e.hours, 0);

      const annual = entries.filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === now.getFullYear();
      }).reduce((sum, e) => sum + e.hours, 0);

      document.getElementById("weeklyTotal").textContent = `Weekly: ${weekly} hrs`;
      document.getElementById("monthlyTotal").textContent = `Monthly: ${monthly} hrs`;
      document.getElementById("annualTotal").textContent = `Annual: ${annual} hrs`;
    }
    const currentUser = { name: "Alex Rivera", role: "Contributor" };

function getVisibleEntries() {
  if (currentUser.role === "Admin") return entries;
  return entries.filter(e => e.contributor === currentUser.name);
}
