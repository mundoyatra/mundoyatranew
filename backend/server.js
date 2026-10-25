require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { z } = require("zod");
const { randomUUID } = require("crypto");
const { pool, initSchema } = require("./db");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (process.env.CORS_ORIGINS || "*").split(","),
  })
);

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const api = express.Router();

api.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

const statusCheckSchema = z.object({
  client_name: z.string().min(1, "client_name is required"),
});

api.post(
  "/status",
  asyncHandler(async (req, res) => {
    const parsed = statusCheckSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const { client_name } = parsed.data;
    const id = randomUUID();
    const timestamp = new Date();

    await pool.query(
      "INSERT INTO status_checks (id, client_name, timestamp) VALUES (?, ?, ?)",
      [id, client_name, timestamp]
    );

    res.json({ id, client_name, timestamp: timestamp.toISOString() });
  })
);

api.get(
  "/status",
  asyncHandler(async (req, res) => {
    const [rows] = await pool.query(
      "SELECT id, client_name, timestamp FROM status_checks ORDER BY timestamp DESC LIMIT 1000"
    );
    res.json(rows);
  })
);

const leadSchema = z.object({
  name: z.string().min(1, "name is required"),
  phone: z.string().min(1, "phone is required"),
  email: z.string().email("a valid email is required"),
  destination: z.string().min(1, "destination is required"),
  travelDate: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

api.post(
  "/leads",
  asyncHandler(async (req, res) => {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.issues[0].message });
    }
    const { name, phone, email, destination, travelDate, message } = parsed.data;

    const id = randomUUID();
    const createdAt = new Date();

    await pool.query(
      "INSERT INTO leads (id, name, phone, email, destination, travel_date, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, name, phone, email, destination, travelDate || null, message || null, createdAt]
    );

    res.json({
      success: true,
      message: "Thank you! We will contact you soon.",
      leadId: id,
    });
  })
);

api.get(
  "/leads",
  asyncHandler(async (req, res) => {
    const [rows] = await pool.query(
      "SELECT id, name, phone, email, destination, travel_date, message, created_at FROM leads ORDER BY created_at DESC LIMIT 1000"
    );
    res.json(rows);
  })
);

app.use("/api", api);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 8001;

initSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database schema:", err);
    process.exit(1);
  });

const shutdown = async () => {
  console.log("Shutting down, closing MySQL pool...");
  try {
    await pool.end();
  } catch (err) {
    console.error("Error closing MySQL pool:", err);
  }
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
