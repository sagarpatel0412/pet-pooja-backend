const { queryResults } = require("../config/connection");
const validateExpense = require("../validators/expense.validator");

exports.addExpense = async (req, res) => {
  const { user_id, category_id, amount, date, description } = req.body;

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
      .json({ error: error.details.map((err) => err.message) });
  }

  try {
    const result = await queryResults(
      "INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES (?, ?, ?, ?, ?)",
      [user_id, category_id, amount, date, description]
    );
    res.status(201).json({
      message: "Expense added successfully",
      expenseId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await queryResults("DELETE FROM expenses WHERE id=?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const query = `
    SELECT 
    e.id AS id,
    e.user_id AS user_id, 
    e.date AS date, 
    u.name AS name, 
    u.email AS email, 
    e.category_id AS category_id, 
    c.name AS category, 
    e.description, 
    e.amount 
FROM expenses e
INNER JOIN users u ON e.user_id = u.id
INNER JOIN categories c ON e.category_id = c.id;
    `;
    const expenses = await queryResults(query);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
