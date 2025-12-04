    const businessSelect = document.getElementById("businessSelect");
    const inflowInput = document.getElementById("inflow");
    const outflowInput = document.getElementById("outflow");
    const netResult = document.getElementById("net");

    // Fetch businesses from your company manager dashboard API or JSON file
    // Replace 'companies.json' with your actual endpoint
    fetch("companies.json")
      .then(response => response.json())
      .then(businesses => {
        // Populate drop-down
        businesses.forEach((biz, index) => {
          const option = document.createElement("option");
          option.value = index;
          option.textContent = biz.name;
          businessSelect.appendChild(option);
        });

        // Initialize with first business
        businessSelect.value = 0;
        inflowInput.value = businesses[0].inflow;
        outflowInput.value = businesses[0].outflow;
        calculateNet();

        // Update fields when a business is selected
        businessSelect.addEventListener("change", () => {
          const selectedBiz = businesses[businessSelect.value];
          inflowInput.value = selectedBiz.inflow;
          outflowInput.value = selectedBiz.outflow;
          calculateNet();
        });

        // Recalculate when inflow/outflow are edited
        inflowInput.addEventListener("input", calculateNet);
        outflowInput.addEventListener("input", calculateNet);

        function calculateNet() {
          const inflow = parseFloat(inflowInput.value) || 0;
          const outflow = parseFloat(outflowInput.value) || 0;
          const net = inflow - outflow;
          netResult.innerHTML = `
            <span class="inflow">Inflows:

{inflow.toLocaleString()}</span><br>
            <span class="outflow">Outflows: 

{outflow.toLocaleString()}</span><br>
            <span class="net">Net Cash Flow: $${net.toLocaleString()}</span>
          `;
        }
      })
      .catch(err => {
        console.error("Error loading businesses:", err);
      });