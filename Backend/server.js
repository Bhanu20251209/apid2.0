import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Student from "./models/student.js";
import Alert from "./models/alert.js";
import Admin from "./models/admin.js"; // ✅ Admin model

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Atlas connection
const uri = process.env.DATABASE_URL;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Database connection error:", err));

// ✅ Username generator
const adjectives = ["Cool", "Lazy", "Sharp", "Nutty", "Happy", "Silly"];
const nouns = ["Cat", "Panda", "Eagle", "Coder", "Tiger", "Fox"];

function generateUsername() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 1000);
  return `${adj}${noun}${num}`;
}

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Hello world from MongoDB Atlas!");
});


// ================================================
// 🧍‍♂️ STUDENT ROUTES
// ================================================

// ✅ Student Register route
app.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const existingUser = await Student.findOne({ email: data.email });

    if (existingUser) {
      return res.json({ error: "User already exists" });
    }

    // Generate unique username
    let username = generateUsername();
    while (await Student.findOne({ username })) {
      username = generateUsername();
    }

    data.username = username;
    data.password = await bcrypt.hash(data.password, 10);

    const newStudent = new Student(data);
    await newStudent.save();

    res.json({ success: "User registered successfully", user: newStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while registering" });
  }
});

// ✅ Student Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ error: "Incorrect password" });
    }

    return res.json({ success: "Login successful", user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error during login" });
  }
});


// ================================================
// 🧠 AI SUICIDE RISK ALERT ROUTE
// ================================================
app.post("/ai-alert", async (req, res) => {
  try {
    const { userMessage, analysis, studentId } = req.body;

    let student = null;
    if (studentId) {
      student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
    }

    const alert = new Alert({
      student: student ? student._id : null,
      userMessage,
      analysis,
      timestamp: analysis?.timestamp || new Date(),
    });

    await alert.save();
    console.log("🚨 High-risk alert stored:", alert);
    res.json({ success: true, message: "AI alert stored successfully", alert });
  } catch (err) {
    console.error("❌ Error saving AI alert:", err);
    res.status(500).json({ error: "Failed to save AI alert" });
  }
});


// ================================================
// 👨‍💼 ADMIN ROUTES
// ================================================

// ✅ Admin Registration
app.post("/admin/register", async (req, res) => {
  try {
    const { name, email, password, username, university, role } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      username,
      university,
      password: hashedPassword,
      role: role || "moderator",
    });

    await admin.save();
    res.status(201).json({ success: true, message: "Admin registered", admin });
  } catch (err) {
    console.error("❌ Error registering admin:", err);
    res.status(500).json({ error: "Server error while registering admin" });
  }
});

// ✅ Admin Login
app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Admin logged in successfully",
      admin,
      token,
    });
  } catch (err) {
    console.error("❌ Error during admin login:", err);
    res.status(500).json({ error: "Server error while logging in admin" });
  }
});


// ================================================
// ✅ SERVER START
// ================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
