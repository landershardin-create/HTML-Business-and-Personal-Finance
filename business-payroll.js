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
  const gross = parseFloat(row.querySelector(".gross").value) || 0;
  const ss = parseFloat(row.querySelector(".ss").value) || 0;
  const medicare = parseFloat(row.querySelector(".medicare").value) || 0;
  const federal = parseFloat(row.querySelector(".federal").value) || 0;
  const retirement = parseFloat(row.querySelector(".retirement").value) || 0;
  const state = parseFloat(row.querySelector(".state").value) || 0;

  const deduction = ss + medicare + federal + retirement + state;
  const net = gross - deduction;

  row.querySelector(".deduction-total").textContent = `

{deduction.toFixed(2)}`;
  row.querySelector(".net").textContent = `

{net.toFixed(2)}`;
  return net;
}

// Recalculate totals for a company section
function calculateCompanyTotals(section) {
  let totalNet = 0;
  section.querySelectorAll("tbody tr").forEach(row => {
    totalNet += calculateRow(row);
  });
  section.querySelector(".summary").textContent = `Total Net Pay: $${totalNet.toFixed(2)}`;
}

// Append audit log entry
function logAudit(message) {
  const list = document.getElementById("auditList");
  const item = document.createElement("li");
  item.textContent = message;
  list.appendChild(item);
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

  // Bind editable fields for audit + recalculation
  document.querySelectorAll(".edit-field").forEach(field => {
    field.addEventListener("change", function () {
      const row = this.closest("tr");
      const fieldName = this.dataset.field;
      const oldValue = this.defaultValue;
      const newValue = this.value;
      this.defaultValue = newValue; // update baseline
      logAudit(`${row.dataset.employee} - ${fieldName} changed from ${oldValue} to ${newValue}`);
      calculateCompanyTotals(row.closest(".business-section"));
    });
  });

  // Bind process button
  document.querySelectorAll(".process-payroll").forEach(btn => {
    btn.addEventListener("click", function () {
      const section = this.closest(".business-section");
      calculateCompanyTotals(section);
      logAudit(`Payroll processed for ${section.id}`);
    });
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