// indexStorage.js

export function loadUserPrefs(userId) {
  const raw = localStorage.getItem(`indexPrefs-${userId}`);
  return raw ? JSON.parse(raw) : { dismissedOnboarding: false };
}

export function saveUserPrefs(userId, prefs) {
  localStorage.setItem(`indexPrefs-${userId}`, JSON.stringify(prefs));
}