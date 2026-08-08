// scripts/router.js

export async function requireDashboardAuth() {
  const res = await fetch("/api/me", { credentials: "include" });

  if (!res.ok) {
    window.location.href = "/index.html";
    return false;
  }

  return true;
}