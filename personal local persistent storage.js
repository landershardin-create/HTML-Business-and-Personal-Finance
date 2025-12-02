// --- personal local persistent storage.js ---

function saveTabState(tabId, type) {
  const tabs = JSON.parse(localStorage.getItem("dashboardTabs") || "[]");
  tabs.push({ tabId, type });
  localStorage.setItem("dashboardTabs", JSON.stringify(tabs));
}
document.getElementById('personnelForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;

  const tableBody = document.querySelector('#registryTable tbody');
  const row = document.createElement('tr');
  row.innerHTML = `<td>${name}</td><td>${email}</td><td>${role}</td>`;
  tableBody.appendChild(row);

  // Optional: persist to local storage
  // savePersonnel({ name, email, role });

  this.reset();
});

