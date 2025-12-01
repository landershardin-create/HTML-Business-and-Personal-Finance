// Node.js version of the C++ program

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter US dollar amount: ", (input) => {
  let usdollar_amt = parseFloat(input);

  // Ensure two decimal places
  let formattedAmt = usdollar_amt.toFixed(2);

  if (usdollar_amt === 0.0) {
    console.log(`$${formattedAmt}`);
  } else if (Math.abs(usdollar_amt) <= 0.99) {
    console.log(`${formattedAmt}¢`);
  } else {
    console.log(`$${formattedAmt}`);
  }

  rl.close();
});