const express = require("express");
const { z } = require("zod");
const { randomUUID } = require("crypto");
const { pool } = require("../db");
const { requireAuth } = require("../auth");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const router = express.Router();

const blockSchema = z.object({
  type: z.enum(["heading", "paragraph", "list", "image"]),
  text: z.string().optional(),
  items: z.array(z.string()).optional(),
  src: z.string().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

const blogSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "slug must be lowercase letters, numbers, and hyphens only"),
  title: z.string().min(1),
  metaDescription: z.string().min(1),
  keywords: z.array(z.string()).default([]),
  category: z.string().min(1),
  coverImage: z.string().min(1),
  coverImageAlt: z.string().min(1),
  publishedDate: z.string().min(1),
  readTime: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.array(blockSchema).default([]),
});

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
  id: row.id,
  slug: row.slug,
  title: row.title,
  metaDescription: row.meta_description,
  keywords: parseJsonField(row.keywords),
  category: row.category,
  coverImage: row.cover_image,
  coverImageAlt: row.cover_image_alt,
  publishedDate:
    row.published_date instanceof Date
      ? row.published_date.toISOString().slice(0, 10)
      : row.published_date,
  readTime: row.read_time,
  excerpt: row.excerpt,
  content: parseJsonField(row.content),
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM blogs ORDER BY published_date DESC");
    res.json(rows.map(mapRow));
  })
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM blogs WHERE slug=?", [req.params.slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(mapRow(rows[0]));
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = blogSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const b = parsed.data;
    const id = randomUUID();
    const now = new Date();

    const [existing] = await pool.query("SELECT id FROM blogs WHERE slug=?", [b.slug]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "A blog with this slug already exists" });
    }

    await pool.query(
      `INSERT INTO blogs (id, slug, title, meta_description, keywords, category, cover_image, cover_image_alt, published_date, read_time, excerpt, content, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        b.slug,
        b.title,
        b.metaDescription,
        JSON.stringify(b.keywords),
        b.category,
        b.coverImage,
        b.coverImageAlt,
        b.publishedDate,
        b.readTime,
        b.excerpt,
        JSON.stringify(b.content),
        now,
        now,
      ]
    );
    res.json({ id, ...b });
  })
);

router.put(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const parsed = blogSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const b = parsed.data;

    const [result] = await pool.query(
      `UPDATE blogs SET slug=?, title=?, meta_description=?, keywords=?, category=?, cover_image=?, cover_image_alt=?, published_date=?, read_time=?, excerpt=?, content=?, updated_at=? WHERE id=?`,
      [
        b.slug,
        b.title,
        b.metaDescription,
        JSON.stringify(b.keywords),
        b.category,
        b.coverImage,
        b.coverImageAlt,
        b.publishedDate,
        b.readTime,
        b.excerpt,
        JSON.stringify(b.content),
        new Date(),
        req.params.id,
      ]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ id: req.params.id, ...b });
  })
);

router.delete(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const [result] = await pool.query("DELETE FROM blogs WHERE id=?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ success: true });
  })
);

module.exports = router;
