// server/api.js
import express from "express";
import cookieParser from "cookie-parser";
import { requireAuth } from "./security.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// -----------------------------
// AUTH
// -----------------------------
app.get("/api/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// -----------------------------
// UNIFIED STATE
// -----------------------------
let unifiedState = null;

app.get("/api/state", requireAuth, (req, res) => {
  res.json(unifiedState || { version: "1.0.0", entities: [], engines: {} });
});

app.post("/api/state", requireAuth, (req, res) => {
  unifiedState = req.body;
  res.json({ ok: true });
});

// -----------------------------
// ENTITIES CRUD
// -----------------------------
app.get("/api/entities", requireAuth, (req, res) => {
  res.json(unifiedState?.entities || []);
});

app.post("/api/entities", requireAuth, (req, res) => {
  unifiedState.entities.push(req.body);
  res.json({ ok: true });
});

// -----------------------------
// SERVER START
// -----------------------------
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});