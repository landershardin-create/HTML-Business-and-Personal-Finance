// server/utils/sanitize.js

export function sanitizeInput(input) {
  return String(input)
    .replace(/[<>]/g, "")
    .trim();
}

export function safeNumber(value) {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}