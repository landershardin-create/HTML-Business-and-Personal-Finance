console.log("✅ Business Asset Tracker JS loaded successfully");

let assetList = [];

function addAsset() {
  const business = document.getElementById("businessSelect").value;
  const tag = document.getElementById("assetTag").value;
  const name = document.getElementById("assetName").value;
  const category = document.getElementById("assetCategory").value;
  const value = parseFloat(document.getElementById("assetValue").value);
  const depRate = parseFloat(document.getElementById("assetDep").value) / 100;
  const years = parseInt(document.getElementById("assetYears").value);

  if (isNaN(value) || isNaN(depRate) || isNaN(years)) return;

  const annualDep = value * depRate;
  const accumulatedDep = annualDep * years;
  const netBookValue = value - accumulatedDep;

  const table = document.getElementById("assetTable").querySelector("tbody");
  const row = table.insertRow();

  row.innerHTML = `
    <td>${business}</td>
    <td>${tag}</td>
    <td>${name}</td>
    <td>${category}</td>
    <td>$${value.toFixed(2)}</td>
    <td>${(depRate*100).toFixed(2)}%</td>
    <td>

{annualDep.toFixed(2)}</td>
    <td>

{accumulatedDep.toFixed(2)}</td>
    <td>$${netBookValue.toFixed(2)}</td>
    <td><button onclick="editAsset(this)">Edit</button></td>
    <td><button onclick="deleteAsset(this)">Delete</button></td>
  `;

  assetList.push({ business, tag, name, category, value, depRate, years });
  localStorage.setItem("assets", JSON.stringify(assetList));

  updateTotals();
  resetForm(); // clear inputs after adding
}

function resetForm() {
  document.getElementById("assetTag").value = "";
  document.getElementById("assetName").value = "";
  document.getElementById("assetCategory").value = "";
  document.getElementById("assetValue").value = "";
  document.getElementById("assetDep").value = "";
  document.getElementById("assetYears").value = "";
}

function editAsset(button) {
  const row = button.closest("tr");
  document.getElementById("businessSelect").value = row.cells[0].innerText;
  document.getElementById("assetTag").value = row.cells[1].innerText;
  document.getElementById("assetName").value = row.cells[2].innerText;
  document.getElementById("assetCategory").value = row.cells[3].innerText;
  document.getElementById("assetValue").value = row.cells[4].innerText.replace("$","");
  document.getElementById("assetDep").value = row.cells[5].innerText.replace("%","");
  document.getElementById("assetYears").value = 
    parseFloat(row.cells[7].innerText.replace("$","")) / 
    parseFloat(row.cells[6].innerText.replace("$",""));

  row.remove();
  updateTotals();
}

function deleteAsset(button) {
  const row = button.closest("tr");
  row.remove();
  updateTotals();
}

function updateTotals() {
  const rows = document.querySelectorAll("#assetTable tbody tr");
  const totalsByBusiness = {};

  rows.forEach(row => {
    const business = row.cells[0].innerText;
    const value = parseFloat(row.cells[4].innerText.replace("$",""));
    const accumulatedDep = parseFloat(row.cells[7].innerText.replace("$",""));
    const netBookValue = parseFloat(row.cells[8].innerText.replace("$",""));

    if (!totalsByBusiness[business]) {
      totalsByBusiness[business] = { value: 0, dep: 0, nbv: 0 };
    }
    totalsByBusiness[business].value += value;
    totalsByBusiness[business].dep += accumulatedDep;
    totalsByBusiness[business].nbv += netBookValue;
  });

  let html = "<h4>Totals by Business</h4>";
  for (const [biz, totals] of Object.entries(totalsByBusiness)) {
    html += `<p>${biz}: Value

{totals.value.toFixed(2)} | Accumulated Dep 

{totals.dep.toFixed(2)} | Net Book Value $${totals.nbv.toFixed(2)}</p>`;
  }
  document.getElementById("totals").innerHTML = html;
}

function filterAssets() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const businessFilter = document.getElementById("businessFilter").value.toLowerCase();
  const rows = document.querySelectorAll("#assetTable tbody tr");

  rows.forEach(row => {
    const business = row.cells[0].innerText.toLowerCase();
    const tag = row.cells[1].innerText.toLowerCase();
    const name = row.cells[2].innerText.toLowerCase();
    const category = row.cells[3].innerText.toLowerCase();

    const matchesText = tag.includes(input) || name.includes(input) || category.includes(input) || business.includes(input);
    const matchesBusiness = !businessFilter || business === businessFilter.toLowerCase();

    row.style.display = (matchesText && matchesBusiness) ? "" : "none";
  });
}

window.onload = function() {
  const savedAssets = JSON.parse(localStorage.getItem("assets")) || [];
  savedAssets.forEach(asset => {
    const { business, tag, name, category, value, depRate, years } = asset;
    const annualDep = value * depRate;
    const accumulatedDep = annualDep * years;
    const netBookValue = value - accumulatedDep;

    const table = document.getElementById("assetTable").querySelector("tbody");
    const row = table.insertRow();
    row.innerHTML = `
      <td>${business}</td>
      <td>${tag}</td>
      <td>${name}</td>
      <td>${category}</td>
      <td>$${value.toFixed(2)}</td>
      <td>${(depRate*100).toFixed(2)}%</td>
      <td>

{annualDep.toFixed(2)}</td>
      <td>

{accumulatedDep.toFixed(2)}</td>
      <td>$${netBookValue.toFixed(2)}</td>
      <td><button onclick="editAsset(this)">Edit</button></td>
      <td><button onclick="deleteAsset(this)">Delete</button></td>
    `;
  });
  updateTotals();
};