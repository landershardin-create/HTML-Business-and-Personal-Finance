// --- business-debt-timekeeping.js ---

const entries = [];

// Example personnel registry (replace with actual import or JSON fetch)
const personnelRegistry = {
  businesses: {
    biz001: { name: "Hardin Holdings", location: "Harvest, AL", type: "LLC" },
    biz002: { name: "Orenthal Ops", location: "Birmingham, AL", type: "Inc." }
  },
  contributors: [
    { id: "c001", name: "Alice Johnson", business: "biz001", role: "Engineer" },
    { id: "c002", name: "Bob Smith", business: "biz002", role: "Analyst" }
  ]
};

function addEntry() {
  const contributorId = document.getElementById("contributor").value;
  const date = document.getElementById("date").value;
  const hours = parseFloat(document.getElementById("hours").value);

  if (!contributorId || !date || isNaN(hours)) return;

  const contributor = personnelRegistry.contributors.find(c => c.id === contributorId);
  if (!contributor) return;

  const business = personnelRegistry.businesses[contributor.business];

  entries.push({
    businessId: contributor.business,
    businessName: business.name,
    contributorId: contributor.id,
    contributorName: contributor.name,
    role: contributor.role,
    date,
    hours
  });

  renderTable();
  updateTotals();
}

function renderTable() {
  const tbody = document.querySelector("#timesheet tbody");
  tbody.innerHTML = "";

  getVisibleEntries().forEach(entry => {
    const row = `<tr>
      <td>${entry.businessName}</td>
      <td>${entry.contributorName}</td>
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

  const visible = getVisibleEntries();

  const weekly = visible.filter(e => {
    const d = new Date(e.date);
    return d >= weekStart && d <= now;
  }).reduce((sum, e) => sum + e.hours, 0);

  const monthly = visible.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((sum, e) => sum + e.hours, 0);

  const annual = visible.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === now.getFullYear();
  }).reduce((sum, e) => sum + e.hours, 0);

  document.getElementById("weeklyTotal").textContent = `Weekly: ${weekly} hrs`;
  document.getElementById("monthlyTotal").textContent = `Monthly: ${monthly} hrs`;
  document.getElementById("annualTotal").textContent = `Annual: ${annual} hrs`;
}

// Role-based visibility
const currentUser = { name: "Alex Rivera", role: "Contributor" };

function getVisibleEntries() {
  if (currentUser.role === "Admin") return entries;
  return entries.filter(e => e.contributorName === currentUser.name);
}

// Update header when contributor changes
document.getElementById("contributor").addEventListener("change", () => {
  const contributorId = document.getElementById("contributor").value;
  const contributor = personnelRegistry.contributors.find(c => c.id === contributorId);
  if (contributor) {
    const biz = personnelRegistry.businesses[contributor.business];
    document.getElementById("headerCompanyName").textContent = biz.name;
    document.getElementById("headerLocation").textContent = biz.location;
    document.querySelector("#headerType span").textContent = biz.type;
    document.querySelector("#headerRole span").textContent = contributor.role;
    document.getElementById("business").value = contributor.business;
  }
});