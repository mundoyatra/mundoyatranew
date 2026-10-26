const express = require("express");
const { z } = require("zod");
const { randomUUID } = require("crypto");
const { pool } = require("../db");
const { requireAuth } = require("../auth");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const router = express.Router();

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  display_order: z.number().int().optional().default(0),
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const [rows] = await pool.query(
      "SELECT id, question, answer, display_order FROM faqs ORDER BY display_order ASC, created_at ASC"
    );
    res.json(rows);
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = faqSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const { question, answer, display_order } = parsed.data;
    const id = randomUUID();
    const now = new Date();

    await pool.query(
      "INSERT INTO faqs (id, question, answer, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      [id, question, answer, display_order, now, now]
    );
    res.json({ id, question, answer, display_order });
  })
);

router.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = faqSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const { question, answer, display_order } = parsed.data;

    const [result] = await pool.query(
      "UPDATE faqs SET question=?, answer=?, display_order=?, updated_at=? WHERE id=?",
      [question, answer, display_order, new Date(), req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.json({ id: req.params.id, question, answer, display_order });
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const [result] = await pool.query("DELETE FROM faqs WHERE id=?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.json({ success: true });
  })
);

module.exports = router;
