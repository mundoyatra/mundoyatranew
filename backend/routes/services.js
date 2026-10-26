const express = require("express");
const { z } = require("zod");
const { randomUUID } = require("crypto");
const { pool } = require("../db");
const { requireAuth } = require("../auth");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const router = express.Router();

const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  display_order: z.number().int().optional().default(0),
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const [rows] = await pool.query(
      "SELECT id, title, description, icon, display_order FROM services ORDER BY display_order ASC, created_at ASC"
    );
    res.json(rows);
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = serviceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const { title, description, icon, display_order } = parsed.data;
    const id = randomUUID();
    const now = new Date();

    await pool.query(
      "INSERT INTO services (id, title, description, icon, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, title, description, icon, display_order, now, now]
    );
    res.json({ id, title, description, icon, display_order });
  })
);

router.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = serviceSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const { title, description, icon, display_order } = parsed.data;

    const [result] = await pool.query(
      "UPDATE services SET title=?, description=?, icon=?, display_order=?, updated_at=? WHERE id=?",
      [title, description, icon, display_order, new Date(), req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ id: req.params.id, title, description, icon, display_order });
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const [result] = await pool.query("DELETE FROM services WHERE id=?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ success: true });
  })
);

module.exports = router;
