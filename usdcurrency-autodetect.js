// Core function: takes a number and returns the formatted string
function formatUsdAmount(amount) {
  let formattedAmt = amount.toFixed(2);

  if (amount === 0.0) {
    return `$${formattedAmt}`;
  } else if (Math.abs(amount) <= 0.99) {
    return `${formattedAmt}¢`;
  } else {
    return `$${formattedAmt}`;
  }
}

// Environment detection
function isNode() {
  return (typeof process !== "undefined" &&
          process.versions != null &&
          process.versions.node != null);
}

// Run in the right environment
if (isNode()) {
  // Node.js version
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Enter US dollar amount: ", (input) => {
    let amount = parseFloat(input);
    console.log(formatUsdAmount(amount));
    rl.close();
  });
} else {
  // Browser version
  let input = prompt("Enter US dollar amount:");
  let amount = parseFloat(input);
  alert(formatUsdAmount(amount));
}