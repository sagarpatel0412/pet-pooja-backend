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
    const expenses = await queryResults("SELECT * FROM expenses");
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
