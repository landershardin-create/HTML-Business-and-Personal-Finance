// scripts/data/state.js

export async function loadUnifiedState() {
  const res = await fetch("/api/state", { credentials: "include" });
  return await res.json();
}

export async function saveUnifiedState(state) {
  await fetch("/api/state", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state)
  });
}