import db from "../config/db.js";

// Create user
export const createUser = (req, res) => {
  const { name, email, age } = req.body;
  const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  db.query(sql, [name, email, age], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "User created successfully", id: result.insertId });
  });
};

// Get all users
export const getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Get user by ID
export const getUserById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
};

// Update user
export const updateUser = (req, res) => {
  const { id } = req.params;
  const updates = req.body; // could be any combination of fields

  // If no fields provided
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  // Build dynamic SQL query
  const fields = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(updates);

  const sql = `UPDATE users SET ${fields} WHERE id = ?`;

  db.query(sql, [...values, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  });
};

// Delete user
export const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User deleted successfully" });
  });
};
