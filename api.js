// server/api.js

app.post("/api/entity/update", requireAuth, apiLimiter, async (req, res) => {
  const entity_id = sanitizeInput(req.body.entity_id);
  const updates = req.body.updates;

  audit("ENTITY_UPDATE_ATTEMPT", { entity_id, user: req.token.user });

  if (!entity_id || typeof updates !== "object") {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Apply updates safely
  const safeUpdates = {};
  for (const key in updates) {
    safeUpdates[key] = safeNumber(updates[key]);
  }

  await saveEntity(entity_id, safeUpdates);

  audit("ENTITY_UPDATE_SUCCESS", { entity_id, user: req.token.user });

  res.json({ success: true });
});

audit("ENTITY_UPDATE", { user: req.token.user, entity_id });