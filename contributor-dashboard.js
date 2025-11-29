// --- contributor-dashboard.js---

const contributors = [
  { name: "Landers", role: "Admin", joined: "2025-10-01", status: "Active" },
  { name: "Avery", role: "Editor", joined: "2025-10-15", status: "Onboarding" },
];

const permissions = {
  Admin: ["Edit", "Delete", "Assign Roles"],
  Editor: ["Edit", "Comment"],
  Viewer: ["View"]
};

function getCurrentUserRole() {
  return "Admin"; // Replace with session logic
}

function renderContributors() {
  const container = document.getElementById("contributors");
  container.innerHTML = contributors.map(c =>
    `<div class="contributor-card">
      <strong>${c.name}</strong> (${c.role}) — ${c.status}
    </div>`
  ).join("");
}

function setupRoleManager() {
  const container = document.getElementById("role-controls");
  container.innerHTML = `<p>Role assignment tools coming soon.</p>`;
}

function renderOnboardingChecklist() {
  const checklist = [
    "✅ Review Cash Flow Tracker",
    "✅ Set Profile",
    "🔲 Read Branding Guide"
  ];
  document.getElementById("onboarding-checklist").innerHTML = checklist.map(item =>
    `<li>${item}</li>`
  ).join("");
}

function renderPermissionsMatrix() {
  const table = document.getElementById("matrix-table");
  const roles = Object.keys(permissions);
  const actions = [...new Set(roles.flatMap(role => permissions[role]))];

  let html = `<tr><th>Role</th>${actions.map(a => `<th>${a}</th>`).join("")}</tr>`;
  roles.forEach(role => {
    html += `<tr><td>${role}</td>${actions.map(a =>
      `<td>${permissions[role].includes(a) ? "✅" : "❌"}</td>`).join("")}</tr>`;
  });
  table.innerHTML = html;
}

function logActivity(message) {
  const log = document.getElementById("log-entries");
  const entry = document.createElement("div");
  entry.textContent = `${new Date().toLocaleString()}: ${message}`;
  log.appendChild(entry);
}

document.getElementById("profile-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const bio = document.getElementById("bio").value;
  logActivity(`Profile updated for ${name} (${role})`);
});

function showAdminTools() {
  if (getCurrentUserRole() === "Admin") {
    document.getElementById("role-manager").style.display = "block";
  }
}

// Initialize dashboard
renderContributors();
setupRoleManager();
renderOnboardingChecklist();
renderPermissionsMatrix();
showAdminTools();
// --- contributor-dashboard.js ---

// Sample contributor data
const contributors = [
  { name: "Alice Johnson", role: "Admin", bio: "Oversees project governance." },
  { name: "Bob Smith", role: "Contributor", bio: "Focuses on financial reporting." },
  { name: "Charlie Lee", role: "Viewer", bio: "Monitors dashboards for insights." }
];

// --- Populate Contributor List ---
function renderContributors() {
  const container = document.getElementById("contributors");
  container.innerHTML = contributors.map(c => `
    <div class="contributor-card">
      <h3>${c.name}</h3>
      <p><strong>Role:</strong> ${c.role}</p>
      <p>${c.bio}</p>
    </div>
  `).join("");
}

// --- Role Manager ---
function renderRoleManager() {
  const roleControls = document.getElementById("role-controls");
  roleControls.innerHTML = contributors.map((c, i) => `
    <div>
      <label>${c.name}</label>
      <select onchange="updateRole(${i}, this.value)">
        <option ${c.role==="Admin"?"selected":""}>Admin</option>
        <option ${c.role==="Contributor"?"selected":""}>Contributor</option>
        <option ${c.role==="Viewer"?"selected":""}>Viewer</option>
      </select>
    </div>
  `).join("");
}

function updateRole(index, newRole) {
  contributors[index].role = newRole;
  logActivity(`${contributors[index].name} role updated to ${newRole}`);
  renderContributors();
}

// --- Onboarding Tracker ---
function renderOnboardingChecklist() {
  const checklist = ["Profile Completed", "Role Assigned", "First Contribution"];
  const ul = document.getElementById("onboarding-checklist");
  ul.innerHTML = checklist.map(item => `<li>✅ ${item}</li>`).join("");
}

// --- Permissions Matrix ---
function renderPermissionsMatrix() {
  const matrix = [
    { role: "Admin", permissions: ["Edit", "Delete", "Assign Roles"] },
    { role: "Contributor", permissions: ["Submit", "Edit Own"] },
    { role: "Viewer", permissions: ["View Only"] }
  ];

  const table = document.getElementById("matrix-table");
  table.innerHTML = `
    <tr><th>Role</th><th>Permissions</th></tr>
    ${matrix.map(m => `<tr><td>${m.role}</td><td>${m.permissions.join(", ")}</td></tr>`).join("")}
  `;
}

// --- Profile Editor ---
document.getElementById("profile-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const bio = document.getElementById("bio").value;

  contributors.push({ name, role, bio });
  renderContributors();
  renderRoleManager();
  logActivity(`New profile created: ${name} (${role})`);
  e.target.reset();
});

// --- Activity Log ---
function logActivity(message) {
  const log = document.getElementById("log-entries");
  const entry = document.createElement("p");
  entry.textContent = `${new Date().toLocaleString()}: ${message}`;
  log.prepend(entry);
}

// --- Initial Setup ---
document.addEventListener("DOMContentLoaded", () => {
  renderContributors();
  renderRoleManager();
  renderOnboardingChecklist();
  renderPermissionsMatrix();
  logActivity("Dashboard initialized");
});