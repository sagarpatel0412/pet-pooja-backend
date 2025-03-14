const { queryResults } = require("../config/connection");
const validateExpense = require("../validators/expense.validator");

const insertUser = async (userName, email) => {
  return await queryResults(
    "INSERT INTO users (name, email, status) VALUES (?, ?, ?)",
    [userName, email, "active"]
  );
};

const insertCategory = async (categoryName) => {
  return await queryResults("INSERT INTO categories (name) VALUES (?)", [
    categoryName,
  ]);
};
exports.addExpense = async (req, res) => {
  let { user_id, category_id, amount, date, description, userName, email } =
    req.body;

  if (isNaN(Number(user_id)) || user_id === "") {
    if (!userName || !email) {
      return res.status(400).json({
        error: true,
        errors:
          "User details (userName and email) are required when user_id is not provided as a number.",
      });
    }
    try {
      let userResult = await queryResults(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [email]
      );
      if (userResult.length > 0) {
        user_id = userResult[0].id;
      } else {
        // Insert new user since not found
        const userInsertResult = await insertUser(userName, email);
        user_id = userInsertResult.insertId;
      }
    } catch (error) {
      return res.status(500).json({
        error: true,
        errors: "Error processing user: " + error.message,
      });
    }
  }

  if (isNaN(Number(category_id)) || category_id === "") {
    if (!category_id) {
      return res.status(400).json({
        error: true,
        errors:
          "Category details are required when category_id is not a valid number.",
      });
    }
    try {
      let categoryResult = await queryResults(
        "SELECT id FROM categories WHERE name = ? LIMIT 1",
        [category_id]
      );
      if (categoryResult.length > 0) {
        category_id = categoryResult[0].id;
      } else {
        const categoryInsertResult = await insertCategory(category_id);
        category_id = categoryInsertResult.insertId;
      }
    } catch (error) {
      return res.status(500).json({
        error: true,
        errors: "Error processing category: " + error.message,
      });
    }
  }

  const { error } = validateExpense({
    user_id,
    category_id,
    amount,
    date,
    description,
  });
  if (error) {
    return res
      .status(400)
      .json({ error: true, error: error.details.map((err) => err.message) });
  }

  try {
    const result = await queryResults(
      "INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES (?, ?, ?, ?, ?)",
      [user_id, category_id, amount, date, description]
    );
    res.status(201).json({
      error: false,
      message: "Expense added successfully",
      expenseId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: true, errors: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { amount, date, description } = req.body;
  const { id } = req.params;

  try {
    const result = await queryResults(
      "UPDATE expenses SET amount=?, date=?, description=? WHERE id=?",
      [amount, date, description, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: true, error: "Expense not found" });
    res.json({ error: false, message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ error: true, errors: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await queryResults("DELETE FROM expenses WHERE id=?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: true, error: "Expense not found" });
    res.json({ error: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: true, errors: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  const { user_id, category_id, startDate, endDate } = req.query;

  let query = `
    SELECT 
      e.id, 
      e.user_id, 
      u.name AS name, 
      u.email, 
      e.category_id, 
      c.name AS category, 
      e.description, 
      e.amount, 
      e.date 
    FROM expenses e
    INNER JOIN users u ON e.user_id = u.id
    INNER JOIN categories c ON e.category_id = c.id
  `;
  const conditions = [];
  const params = [];

  if (user_id) {
    conditions.push("e.user_id = ?");
    params.push(user_id);
  }

  if (category_id) {
    conditions.push("e.category_id = ?");
    params.push(category_id);
  }

  if (startDate) {
    conditions.push("e.date >= ?");
    params.push(startDate);
  }

  if (endDate) {
    conditions.push("e.date <= ?");
    params.push(endDate);
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  try {
    const expenses = await queryResults(query, params);
    res.status(200).json({ error: false, data: expenses });
  } catch (error) {
    res.status(500).json({ error: true, errors: error.message });
  }
};
