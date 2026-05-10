import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";          // ✅ fixed typo: was "jsnwebtoken"
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Avatar upload config ──────────────────────────────────
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },             // 2 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const ok = allowed.test(file.mimetype) && allowed.test(path.extname(file.originalname).toLowerCase());
    ok ? cb(null, true) : cb(new Error("Only image files are allowed"));
  },
});

// ── Auth middleware ───────────────────────────────────────
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ════════════════════════════════════════════════
// REGISTER  —  POST /api/register
// Handles Step 1 (credentials) + Step 2 (avatar & genres)
// ════════════════════════════════════════════════
app.post("/api/register", upload.single("avatar"), async (req, res) => {
  
  const { name, email, password, genres } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }

  const avatarUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const hash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password_hash, avatar_url) VALUES (?, ?, ?, ?)",
      [name, email, hash, avatarUrl]
    );

    const userId = result.insertId;

    // Save genre preferences (sent as JSON string from FormData)
    if (genres) {
      const genreList = JSON.parse(genres);
      if (Array.isArray(genreList) && genreList.length > 0) {
        const genreValues = genreList.map((g) => [userId, g]);
        await pool.query("INSERT INTO user_genres (user_id, genre) VALUES ?", [genreValues]);
      }
    }

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Email already registered" });
    }
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ════════════════════════════════════════════════
// LOGIN  —  POST /api/login
// ════════════════════════════════════════════════
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT u.*, GROUP_CONCAT(ug.genre) AS genres
       FROM users u
       LEFT JOIN user_genres ug ON u.id = ug.user_id
       WHERE u.email = ?
       GROUP BY u.id`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id:        user.id,
        name:      user.name,
        email:     user.email,
        avatarUrl: user.avatar_url,
        genres:    user.genres ? user.genres.split(",") : [],
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ════════════════════════════════════════════════
// GET CURRENT USER  —  GET /api/me  (protected)
// ════════════════════════════════════════════════
app.get("/api/me", authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.avatar_url,
              GROUP_CONCAT(ug.genre) AS genres
       FROM users u
       LEFT JOIN user_genres ug ON u.id = ug.user_id
       WHERE u.id = ?
       GROUP BY u.id`,
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "User not found" });
    const u = rows[0];
    res.json({
      id:        u.id,
      name:      u.name,
      email:     u.email,
      avatarUrl: u.avatar_url,
      genres:    u.genres ? u.genres.split(",") : [],
    });
  } catch (err) {
    console.error("Me error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ════════════════════════════════════════════════
// CONTACT US  —  POST /api/contact
// ════════════════════════════════════════════════
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required" });
  }

  try {
    await pool.query(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject || "", message]
    );
    res.status(201).json({ message: "Message received! We will get back to you soon." });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ════════════════════════════════════════════════
// ABOUT PAGE  —  GET /api/about
// ════════════════════════════════════════════════
app.get("/api/about", async (req, res) => {
  try {
    const [team]     = await pool.query("SELECT * FROM team_members ORDER BY display_order");
    const [features] = await pool.query("SELECT * FROM features ORDER BY display_order");
    res.json({ team, features });
  } catch (err) {
    console.error("About error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ── Global error handler ──────────────────────────────────
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
