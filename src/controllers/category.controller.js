const { queryResults } = require("../config/connection");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await queryResults(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );
    res.status(201).json({
      message: "Category created successfully",
      categoryId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: true, errors: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await queryResults("SELECT * FROM categories");
    res.json({ error: false, data: categories });
  } catch (error) {
    res.status(500).json({ error: true, errors: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await queryResults(
      "SELECT * FROM categories WHERE id = ?",
      [req.params.id]
    );
    if (category.length === 0)
      return res.status(404).json({ error: true, errors: "Category not found" });
    res.json({ error: false, data: category[0] });
  } catch (error) {
    res.status(500).json({ error: true, errors: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await queryResults(
      "UPDATE categories SET name=? WHERE id=?",
      [name, req.params.id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: true, errors: "Category not found" });
    res.json({ error: false, message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: true, errors: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const result = await queryResults("DELETE FROM categories WHERE id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: true, errors: "Category not found" });
    res.json({ error: false, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: true, errors: error.message });
  }
};
