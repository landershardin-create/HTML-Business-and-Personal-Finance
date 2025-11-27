  // Store assets per business keyed by asset tag/barcode
  const assetData = {
    BusinessA: {},
    BusinessB: {},
    BusinessC: {}
  };

  function addAsset() {
    const business = document.getElementById('businessSelect').value;
    const tag = document.getElementById('assetTag').value.trim();
    const name = document.getElementById('assetName').value.trim();
    const category = document.getElementById('assetCategory').value.trim();
    const value = parseFloat(document.getElementById('assetValue').value);
    const depRate = parseFloat(document.getElementById('assetDep').value);
    const years = parseInt(document.getElementById('assetYears').value);

    if (!tag || !name || !category || isNaN(value) || isNaN(depRate) || isNaN(years)) {
      alert("Please enter valid asset details.");
      return;
    }

    const annualDep = value * (depRate / 100);
    const accumulatedDep = annualDep * years;
    const netBookValue = Math.max(value - accumulatedDep, 0);

    // Save asset keyed by tag
    assetData[business][tag] = { name, category, value, depRate, annualDep, accumulatedDep, netBookValue };

    renderTable();
    clearInputs();
  }

  function renderTable() {
    const tbody = document.querySelector('#assetTable tbody');
    tbody.innerHTML = '';

    let grandTotal = 0;
    let businessTotals = {};

    for (const [business, assets] of Object.entries(assetData)) {
      let subtotal = 0;
      for (const [tag, record] of Object.entries(assets)) {
        const row = `<tr>
          <td>${business}</td>
          <td>${tag}</td>
          <td>${record.name}</td>
          <td>${record.category}</td>
          <td>$${record.value.toFixed(2)}</td>
          <td>${record.depRate.toFixed(2)}%</td>
          <td>

{record.annualDep.toFixed(2)}</td>
          <td>

{record.accumulatedDep.toFixed(2)}</td>
          <td>$${record.netBookValue.toFixed(2)}</td>
        </tr>`;
        tbody.innerHTML += row;
        subtotal += record.netBookValue;
        grandTotal += record.netBookValue;
      }
      businessTotals[business] = subtotal;
    }

    let totalsText = "Business Net Book Values:\n";
    for (const [business, subtotal] of Object.entries(businessTotals)) {
      totalsText += `${business}:

{subtotal.toFixed(2)}\n`;
    }
    totalsText += `Grand Total Net Book Value: 

{grandTotal.toFixed(2)}`;

    document.getElementById('totals').innerText = totalsText;
  }

  function clearInputs() {
    document.getElementById('assetTag').value = '';
    document.getElementById('assetName').value = '';
    document.getElementById('assetCategory').value = '';
    document.getElementById('assetValue').value = '';
    document.getElementById('assetDep').value = '';
    document.getElementById('assetYears').value = '';
  }
