import express from "express";

const app = express();
app.use(express.json());

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!password || password.length < 8) {
    return res.status(400).json({ error: "Password too short" });
  }
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }
  next();
};

// POST /users/
app.post("/users", validateUser, (req, res) => {
  const { name, email } = req.body;

  res.status(201).json({ message: "user created successfully", name, email });
});

// PUT /users/
app.put("/users", validateUser, (req, res) => {
  const { name, email } = req.body;

  res.json({ message: "user updated successfully", name, email });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// refactoring is important because it improves code readability, maintainability, and reduces redundancy. By extracting common validation logic into a middleware function, we avoid duplicating code in multiple route handlers, making it easier to manage and update in the future.
