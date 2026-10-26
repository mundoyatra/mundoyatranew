const express = require("express");
const { z } = require("zod");
const { randomUUID } = require("crypto");
const { pool } = require("../db");
const { requireAuth } = require("../auth");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const router = express.Router();

const leadSchema = z.object({
  name: z.string().min(1, "name is required"),
  phone: z.string().min(1, "phone is required"),
  email: z.string().email("a valid email is required"),
  destination: z.string().min(1, "destination is required"),
  travelDate: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

// Public: the lead form submits here, no auth required.
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const { name, phone, email, destination, travelDate, message } = parsed.data;

    const id = randomUUID();
    const createdAt = new Date();

    await pool.query(
      "INSERT INTO leads (id, name, phone, email, destination, travel_date, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)",
      [id, name, phone, email, destination, travelDate || null, message || null, createdAt]
    );

    res.json({
      success: true,
      message: "Thank you! We will contact you soon.",
      leadId: id,
    });
  })
);

const VALID_STATUSES = ["new", "contacted", "converted", "closed"];

// Admin-only: viewing and managing lead records contains customer PII.
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const [rows] = await pool.query(
      "SELECT id, name, phone, email, destination, travel_date, message, status, notes, created_at FROM leads ORDER BY created_at DESC LIMIT 1000"
    );
    res.json(rows);
  })
);

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  phone: z.string().min(1).optional(),
  email: z.string().email().optional(),
  destination: z.string().min(1).optional(),
  status: z.enum(VALID_STATUSES).optional(),
  notes: z.string().optional().nullable(),
});

router.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const fields = parsed.data;
    const keys = Object.keys(fields);
    if (keys.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const setClause = keys.map((k) => `${k}=?`).join(", ");
    const values = keys.map((k) => fields[k]);

    const [result] = await pool.query(`UPDATE leads SET ${setClause} WHERE id=?`, [
      ...values,
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.json({ success: true });
  })
);

module.exports = router;
