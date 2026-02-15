const express = require("express");
const cors = require("cors");
const usersSeed = require("../data/users.json");
const classrooms = require("../data/classrooms.json");
const { generateSubmission } = require("./ai");

const app = express();
const PORT = process.env.PORT || 5000;

let users = [...usersSeed];

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "autoclass-ai" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};
  const found = users.find(
    (entry) => entry.email === email && entry.password === password
  );

  if (!found) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const { password: hidden, ...safeUser } = found;
  res.json({ user: safeUser });
});

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  if (users.some((entry) => entry.email === email)) {
    res.status(409).json({ message: "Email already registered" });
    return;
  }

  const nextId = users.reduce((max, entry) => Math.max(max, entry.id), 0) + 1;
  const newUser = { id: nextId, name, email, password };
  users.push(newUser);
  const { password: hidden, ...safeUser } = newUser;
  res.status(201).json({ user: safeUser });
});

app.get("/api/classrooms/:code", (req, res) => {
  const code = String(req.params.code || "").toUpperCase();
  const classroom = classrooms.find(
    (entry) => entry.classroomCode.toUpperCase() === code
  );

  if (!classroom) {
    res.status(404).json({ message: "Classroom not found" });
    return;
  }

  res.json(classroom);
});

app.post("/api/ai/generate", (req, res) => {
  const { title, description } = req.body || {};
  const text = generateSubmission({ title, description });
  res.json({ text });
});

app.post("/api/assignments/:id/submit", (req, res) => {
  res.json({ status: "submitted", assignmentId: req.params.id });
});

app.listen(PORT, () => {
  console.log(`AutoClass AI server running on port ${PORT}`);
});
