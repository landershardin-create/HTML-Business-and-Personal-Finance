

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
</script>