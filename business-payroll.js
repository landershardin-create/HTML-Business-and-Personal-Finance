// --- business-payroll-register.js ---

// Toggle visibility of business sections
function showCompany() {
  const selected = document.getElementById("companySelect").value;
  document.querySelectorAll(".business-section").forEach(section => {
    section.style.display = section.id === selected ? "block" : "none";
  });
}

// Toggle custom type input
function showCustomType(selectEl) {
  const inputEl = selectEl.nextElementSibling;
  const isCustom = selectEl.value === "Custom";
  inputEl.style.display = isCustom ? "inline-block" : "none";
  if (isCustom) inputEl.focus();
}

// Hide custom type input if empty
function hideCustomType(inputEl) {
  if (!inputEl.value.trim()) {
    inputEl.style.display = "none";
    inputEl.previousElementSibling.value = "Employee";
  }
}

// Calculate deductions + net pay for a row
function calculateRow(row) {
  const gross = parseFloat(row.querySelector(".gross").textContent.replace("$","")) || 0;
  const ss = parseFloat(row.querySelector(".ss").textContent.replace("$","")) || 0;
  const medicare = parseFloat(row.querySelector(".medicare").textContent.replace("$","")) || 0;
  const federal = parseFloat(row.querySelector(".federal").textContent.replace("$","")) || 0;
  const retirement = parseFloat(row.querySelector(".retirement").textContent.replace("$","")) || 0;
  const state = parseFloat(row.querySelector(".state").textContent.replace("$","")) || 0;

  const deduction = ss + medicare + federal + retirement + state;
  const net = gross - deduction;

  row.querySelector(".deduction-total").textContent = `

{deduction}`;
  row.querySelector(".net").textContent = `

{net}`;
  return net;
}

// Recalculate totals for a company section
function calculateCompanyTotals(section) {
  let totalNet = 0;
  section.querySelectorAll("tbody tr").forEach(row => {
    totalNet += calculateRow(row);
  });
  section.querySelector(".summary").textContent = `Total Net Pay: $${totalNet}`;
}

// Initialization
function initPayrollRegister() {
  // Bind company selector
  document.getElementById("companySelect").addEventListener("change", showCompany);

  // Bind type dropdowns
  document.querySelectorAll(".type-dropdown").forEach(selectEl => {
    selectEl.addEventListener("change", () => showCustomType(selectEl));
  });

  // Bind custom type inputs
  document.querySelectorAll(".type-custom").forEach(inputEl => {
    inputEl.addEventListener("blur", () => hideCustomType(inputEl));
  });

  // Initial company display
  showCompany();

  // Initial calculations
  document.querySelectorAll(".business-section").forEach(section => {
    calculateCompanyTotals(section);
  });
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", initPayrollRegister);