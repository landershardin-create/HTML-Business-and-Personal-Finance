// Store results per profile
const profileResults = {};

document.getElementById("calculateBtn").addEventListener("click", function() {
  const profile = document.getElementById("profileSelect").value;
  const debt = parseFloat(document.getElementById("debt").value);
  const equity = parseFloat(document.getElementById("equity").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(debt) || isNaN(equity) || equity === 0) {
    resultDiv.textContent = "⚠️ Please enter valid numbers (equity cannot be zero).";
    return;
  }

  const ratio = debt / equity;
  let category;

  if (ratio < 1) {
    category = "Healthy (Low Risk)";
  } else if (ratio <= 2) {
    category = "Moderate Risk";
  } else {
    category = "High Risk";
  }

  // Save result for this profile
  profileResults[profile] = `Debt-to-Equity Ratio: ${ratio.toFixed(2)} → ${category}`;

  // Display result
  resultDiv.textContent = profileResults[profile];
});
