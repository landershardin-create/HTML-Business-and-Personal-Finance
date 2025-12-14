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

// Lookup rate from personnel registry
function getRateFromRegistry(companyId, name) {
  const rows = document.querySelectorAll(`#${companyId}-personnel tbody tr`);
  for (const row of rows) {
    const [empName, rate] = Array.from(row.children).map(td => td.textContent);
    if (empName === name) return parseFloat(rate);
  }
  return 0;
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

// Populate payroll from time keeping + personnel registry
function populateFromTimeKeeping(companyId) {
  const timeRows = document.querySelectorAll(`#${companyId}-timekeeping tbody tr`);
  const payrollBody = document.querySelector(`#${companyId} tbody`);
  payrollBody.innerHTML = "";

  timeRows.forEach(row => {
    const [name, position, period, hours, ot, rateCell] = Array.from(row.children).map(td => td.textContent);

    let rate = parseFloat(rateCell);
    if (isNaN(rate) || rate === 0) {
      rate = getRateFromRegistry(companyId, name);
    }

    const gross = (parseFloat(hours) * rate) + (parseFloat(ot) * rate * 1.5);

    const tr = document.createElement("tr");
    tr.dataset.employee = name;
    tr.innerHTML = `
      <td>
        <select class="type-dropdown">
          <option selected>Employee</option>
          <option>Contractor</option>
          <option value="Custom">Custom...</option>
        </select>
        <input class="type-custom" type="text" placeholder="Enter type">
      </td>
      <td>${name}</td>
      <td>${position}</td>
      <td>${period}</td>
      <td><input type="number" class="edit-field gross" data-field="gross" value="${gross.toFixed(2)}" readonly></td>
      <td><input type="number" class="edit-field ss" data-field="ss" value="0"></td>
      <td><input type="number" class="edit-field medicare" data-field="medicare" value="0"></td>
      <td><input type="number" class="edit-field federal" data-field="federal" value="0"></td>
      <td><input type="number" class="edit-field retirement" data-field="retirement" value="0"></td>
      <td><input type="number" class="edit-field state" data-field="state" value="0"></td>
      <td class="deduction-total">$0.00</td>
      <td class="net">$${gross.toFixed(2)}</td>
      <td>${hours}</td>
      <td>${ot}</td>
      <td><input type="number" class="edit-field rate" data-field="rate" value="${rate}"></td>
      <td><input type="text" class="edit-field notes" data-field="notes" value=""></td>
    `;
    payrollBody.appendChild(tr);
  });
}

// Initialization
function initPayrollRegister() {
  // Bind company selector
  document.getElementById("companySelect").addEventListener("change", showCompany);

  // Populate payroll sections from time keeping
  document.querySelectorAll(".business-section").forEach(section => {
    populateFromTimeKeeping(section.id);
    calculateCompanyTotals(section);
  });

  // Bind type dropdowns
  document.addEventListener("change", e => {
    if (e.target.classList.contains("type-dropdown")) {
      showCustomType(e.target);
    }
  });

  // Bind custom type inputs
  document.addEventListener("blur", e => {
    if (e.target.classList.contains("type-custom")) {
      hideCustomType(e.target);
    }
  }, true);

  // Bind editable fields for audit + recalculation
  document.addEventListener("change", e => {
    if (e.target.classList.contains("edit-field")) {
      const row = e.target.closest("tr");
      const fieldName = e.target.dataset.field;
      const oldValue = e.target.defaultValue;
      const newValue = e.target.value;
      e.target.defaultValue = newValue;
      logAudit(`${row.dataset.employee} - ${fieldName} changed from ${oldValue} to ${newValue}`);
      calculateCompanyTotals(row.closest(".business-section"));
    }
  });

  // Bind process buttons
  document.querySelectorAll(".process-payroll").forEach(btn => {
    btn.addEventListener("click", function () {
      const section = this.closest(".business-section");
      calculateCompanyTotals(section);
      logAudit(`Payroll processed for ${section.id}`);
    });
  });

  // Initial company display
  showCompany();
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", initPayrollRegister);