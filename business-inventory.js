 // Store inventory per business keyed by barcode/asset tag
  const inventoryData = {
    BusinessA: {},
    BusinessB: {},
    BusinessC: {}
  };

  // Transaction history log
  const transactionHistory = [];

  function recordTransaction() {
    const business = document.getElementById('businessSelect').value;
    const tag = document.getElementById('itemTag').value.trim();
    const name = document.getElementById('itemName').value.trim();
    const qty = parseInt(document.getElementById('itemQty').value);
    const price = parseFloat(document.getElementById('itemPrice').value);
    const type = document.getElementById('transactionType').value;

    if (!tag || !name || isNaN(qty) || isNaN(price)) {
      alert("Please enter valid transaction details.");
      return;
    }

    // Initialize item record if not exists
    if (!inventoryData[business][tag]) {
      inventoryData[business][tag] = { name, in: 0, out: 0, price: price };
    }

    // Update transaction
    if (type === "in") {
      inventoryData[business][tag].in += qty;
    } else {
      inventoryData[business][tag].out += qty;
    }

    // Update name and price (latest transaction)
    inventoryData[business][tag].name = name;
    inventoryData[business][tag].price = price;

    // Log transaction with timestamp
    const timestamp = new Date().toLocaleString();
    transactionHistory.push({
      timestamp, business, tag, name, type, qty, price, total: qty * price
    });

    renderTable();
    renderHistory();
    clearInputs();
  }

  function renderTable() {
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = '';

    let grandTotal = 0;
    let businessTotals = {};

    for (const [business, items] of Object.entries(inventoryData)) {
      let subtotal = 0;
      for (const [tag, record] of Object.entries(items)) {
        const balance = record.in - record.out;
        const totalValue = balance * record.price;
        const row = `<tr>
          <td>${business}</td>
          <td>${tag}</td>
          <td>${record.name}</td>
          <td>${record.in}</td>
          <td>${record.out}</td>
          <td>${balance}</td>
          <td>

{record.price.toFixed(2)}</td>
          <td>

{totalValue.toFixed(2)}</td>
        </tr>`;
        tbody.innerHTML += row;
        subtotal += totalValue;
        grandTotal += totalValue;
      }
      businessTotals[business] = subtotal;
    }

    let totalsText = "Business Totals:\n";
    for (const [business, subtotal] of Object.entries(businessTotals)) {
      totalsText += `${business}:

{subtotal.toFixed(2)}\n`;
    }
    totalsText += `Grand Total Inventory Value: 

{grandTotal.toFixed(2)}`;

    document.getElementById('totals').innerText = totalsText;
  }

  function renderHistory() {
    const tbody = document.querySelector('#historyTable tbody');
    tbody.innerHTML = '';

    transactionHistory.forEach(tx => {
      const row = `<tr>
        <td>${tx.timestamp}</td>
        <td>${tx.business}</td>
        <td>${tx.tag}</td>
        <td>${tx.name}</td>
        <td>${tx.type}</td>
        <td>${tx.qty}</td>
        <td>

{tx.price.toFixed(2)}</td>
        <td>

{tx.total.toFixed(2)}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  }

  function clearInputs() {
    document.getElementById('itemTag').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('itemQty').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('transactionType').value = 'in';
  }
