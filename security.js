// server/security.js

export function requireAuth(req, res, next) {
  const token = req.cookies.session_token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  req.token = token;
  next();
}

// server/security.js

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// server/security.js

import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: "Too many requests"
});

// server/security.js

export const corsOptions = {
  origin: ["https://landers-dashboard.com"],
  methods: ["GET", "POST"],
  credentials: true
};
