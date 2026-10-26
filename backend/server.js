require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { z } = require("zod");
const { randomUUID } = require("crypto");
const { pool, initSchema } = require("./db");

const app = express();
app.use(express.json());

const corsOriginsEnv = process.env.CORS_ORIGINS || "*";
app.use(
  cors({
    origin: corsOriginsEnv === "*" ? "*" : corsOriginsEnv.split(","),
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

api.use("/admin", require("./routes/auth"));
api.use("/leads", require("./routes/leads"));
api.use("/services", require("./routes/services"));
api.use("/domestic-destinations", require("./routes/destinations").createDestinationRouter("domestic_destinations"));
api.use("/international-destinations", require("./routes/destinations").createDestinationRouter("international_destinations"));
api.use("/blogs", require("./routes/blogs"));
api.use("/faqs", require("./routes/faqs"));
api.use("/testimonials", require("./routes/testimonials"));

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
