// server/logging.js

export function audit(event, details) {
  console.log(`[AUDIT] ${event}`, {
    timestamp: new Date().toISOString(),
    ...details
  });
}