// --- business-payroll-register js---
   
         function showCompany() {
      const selected = document.getElementById("companySelect").value;
      document.getElementById("acme").style.display = selected === "acme" ? "block" : "none";
      document.getElementById("zenith").style.display = selected === "zenith" ? "block" : "none";
    }
    function showCustomType(sel) {
      var input = sel.nextElementSibling;
      if (sel.value === "Custom") {
        input.style.display = "inline-block";
        input.focus();
      } else {
        input.style.display = "none";
      }
    }
    function hideCustomType(input) {
      if (!input.value) {
        input.style.display = "none";
        var select = input.previousElementSibling;
        select.value = "Employee";
      }
    }
