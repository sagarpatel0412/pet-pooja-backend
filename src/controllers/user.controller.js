const { queryResults } = require("../config/connection");
const validateUser = require("../validators/user.validator");

exports.createUser = async (req, res) => {
  const { name, email, status } = req.body;

  const { error } = validateUser({ name, email, status });

  if (error) {
    return res.status(400).json({
      error: error.details.map((err) => err.message),
    });
  }

  try {
    const result = await queryResults(
      "INSERT INTO users (name, email, status) VALUES (?, ?, ?)",
      [name, email, status]
    );
    res
      .status(201)
      .json({ message: "User created successfully", userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await queryResults("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await queryResults("SELECT * FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (user.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, status } = req.body;

  const { error } = validateUser({ name, email, status });

  if (error) {
    return res.status(400).json({
      error: error.details.map((err) => err.message),
    });
  }

  try {
    const result = await queryResults(
      "UPDATE users SET name=?, email=?, status=? WHERE id=?",
      [name, email, status, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await queryResults("DELETE FROM users WHERE id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
