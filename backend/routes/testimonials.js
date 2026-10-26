const express = require("express");
const { z } = require("zod");
const { randomUUID } = require("crypto");
const { pool } = require("../db");
const { requireAuth } = require("../auth");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const router = express.Router();

const testimonialSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  rating: z.number().int().min(1).max(5).default(5),
  text: z.string().min(1),
  image: z.string().min(1),
  display_order: z.number().int().optional().default(0),
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const [rows] = await pool.query(
      "SELECT id, name, location, rating, text, image, display_order FROM testimonials ORDER BY display_order ASC, created_at ASC"
    );
    res.json(rows);
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = testimonialSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const t = parsed.data;
    const id = randomUUID();
    const now = new Date();

    await pool.query(
      "INSERT INTO testimonials (id, name, location, rating, text, image, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, t.name, t.location, t.rating, t.text, t.image, t.display_order, now, now]
    );
    res.json({ id, ...t });
  })
);

router.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = testimonialSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const t = parsed.data;

    const [result] = await pool.query(
      "UPDATE testimonials SET name=?, location=?, rating=?, text=?, image=?, display_order=?, updated_at=? WHERE id=?",
      [t.name, t.location, t.rating, t.text, t.image, t.display_order, new Date(), req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json({ id: req.params.id, ...t });
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const [result] = await pool.query("DELETE FROM testimonials WHERE id=?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json({ success: true });
  })
);

module.exports = router;
