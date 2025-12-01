// JavaScript version of the C++ program

// Prompt user for input
let input = prompt("Enter US dollar amount:");

// Convert input to a floating-point number
let usdollar_amt = parseFloat(input);

// Ensure two decimal places
let formattedAmt = usdollar_amt.toFixed(2);

if (usdollar_amt === 0.0) {
    console.log(`$${formattedAmt}`);
} else if (Math.abs(usdollar_amt) <= 0.99) {
    // Show cents without the dollar sign
    console.log(`${formattedAmt}¢`);
} else {
    console.log(`$${formattedAmt}`);
}