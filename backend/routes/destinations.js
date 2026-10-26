const express = require("express");
const { z } = require("zod");
const { randomUUID } = require("crypto");
const { pool } = require("../db");
const { requireAuth } = require("../auth");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const itineraryDaySchema = z.object({
  day: z.number().int(),
  title: z.string().min(1),
  activities: z.string().min(1),
});

const destinationSchema = z.object({
  name: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  duration: z.string().min(1),
  highlights: z.array(z.string()).default([]),
  itinerary: z.array(itineraryDaySchema).default([]),
  includes: z.array(z.string()).default([]),
  display_order: z.number().int().optional().default(0),
});

// mysql2 returns JSON columns already parsed in most configs, but guard just in case
const parseJsonField = (value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }
  return value || [];
};

const mapRow = (row) => ({
  ...row,
  highlights: parseJsonField(row.highlights),
  itinerary: parseJsonField(row.itinerary),
  includes: parseJsonField(row.includes),
});

// Builds a router for either domestic_destinations or international_destinations,
// since both tables share an identical shape.
function createDestinationRouter(tableName) {
  const router = express.Router();

  router.get(
    "/",
    asyncHandler(async (req, res) => {
      const [rows] = await pool.query(
        `SELECT * FROM ${tableName} ORDER BY display_order ASC, created_at ASC`
      );
      res.json(rows.map(mapRow));
    })
  );

  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const [rows] = await pool.query(`SELECT * FROM ${tableName} WHERE id=?`, [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json(mapRow(rows[0]));
    })
  );

  router.post(
    "/",
    requireAuth,
    asyncHandler(async (req, res) => {
      const parsed = destinationSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues[0].message });
      }
      const d = parsed.data;
      const id = randomUUID();
      const now = new Date();

      await pool.query(
        `INSERT INTO ${tableName} (id, name, image, description, price, duration, highlights, itinerary, includes, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          d.name,
          d.image,
          d.description,
          d.price,
          d.duration,
          JSON.stringify(d.highlights),
          JSON.stringify(d.itinerary),
          JSON.stringify(d.includes),
          d.display_order,
          now,
          now,
        ]
      );
      res.json({ id, ...d });
    })
  );

  router.put(
    "/:id",
    requireAuth,
    asyncHandler(async (req, res) => {
      const parsed = destinationSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.issues[0].message });
      }
      const d = parsed.data;

      const [result] = await pool.query(
        `UPDATE ${tableName} SET name=?, image=?, description=?, price=?, duration=?, highlights=?, itinerary=?, includes=?, display_order=?, updated_at=? WHERE id=?`,
        [
          d.name,
          d.image,
          d.description,
          d.price,
          d.duration,
          JSON.stringify(d.highlights),
          JSON.stringify(d.itinerary),
          JSON.stringify(d.includes),
          d.display_order,
          new Date(),
          req.params.id,
        ]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json({ id: req.params.id, ...d });
    })
  );

  router.delete(
    "/:id",
    requireAuth,
    asyncHandler(async (req, res) => {
      const [result] = await pool.query(`DELETE FROM ${tableName} WHERE id=?`, [req.params.id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json({ success: true });
    })
  );

  return router;
}

module.exports = { createDestinationRouter };
