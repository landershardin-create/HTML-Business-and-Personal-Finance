// --- contributor-dashboard.js ---

// Sample contributor data (business personnel registry)
const contributors = [
  { name: "Alice Johnson", role: "Admin", bio: "Oversees project governance." },
  { name: "Bob Smith", role: "Contributor", bio: "Focuses on financial reporting." },
  { name: "Charlie Lee", role: "Viewer", bio: "Monitors dashboards for insights." },
  { name: "Landers Hardin", role: "Owner / CEO / Enterprise Admin", bio: "Provides executive leadership and manages enterprise operations." }
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
        <option ${c.role==="Owner / CEO / Enterprise Admin"?"selected":""}>Owner / CEO / Enterprise Admin</option>
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
    { role: "Viewer", permissions: ["View Only"] },
    { role: "Owner / CEO / Enterprise Admin", permissions: ["Full executive control"] }
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
  renderPersonnelDropdown(); // refresh dropdown with new contributor
  logActivity(`New profile created: ${name} (${role})`);
  e.target.reset();
});

// --- Contributor Dropdown for Profile Editor ---
function renderPersonnelDropdown() {
  const select = document.getElementById("personnel-select");
  if (!select) return;

  select.innerHTML = `<option value="">-- Choose a name --</option>`;
  contributors.forEach(c => {
    const option = document.createElement("option");
    option.value = c.name;
    option.textContent = c.name;
    select.appendChild(option);
  });

  // Auto-fill profile editor when a name is selected
  select.addEventListener("change", function() {
    const selected = contributors.find(c => c.name === this.value);
    if (selected) {
      document.getElementById("name").value = selected.name;
      document.getElementById("role").value = selected.role;
      document.getElementById("bio").value = selected.bio;
    }
  });
}

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
  renderPersonnelDropdown();
  logActivity("Dashboard initialized");
});