// server/security.js

export function requireAuth(req, res, next) {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // In real deployment, verify JWT or session store
  req.user = { id: "user-001", name: "Authenticated User" };
  next();
}