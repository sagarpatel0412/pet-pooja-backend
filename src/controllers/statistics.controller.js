const { queryResults } = require("../config/connection");

exports.topSpendingDays = async (req, res) => {
  try {
    const result = await queryResults(`
      SELECT user_id, date, SUM(amount) as total_spent
      FROM expenses
      GROUP BY user_id, date
      ORDER BY total_spent DESC
      LIMIT 3
    `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.percentageChange = async (req, res) => {
  try {
    const result = await queryResults(`
      SELECT user_id,
        SUM(CASE WHEN MONTH(date) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) THEN amount ELSE 0 END) AS last_month,
        SUM(CASE WHEN MONTH(date) = MONTH(CURRENT_DATE) THEN amount ELSE 0 END) AS this_month,
        (SUM(CASE WHEN MONTH(date) = MONTH(CURRENT_DATE) THEN amount ELSE 0 END) - 
         SUM(CASE WHEN MONTH(date) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) THEN amount ELSE 0 END)) /
        SUM(CASE WHEN MONTH(date) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) THEN amount ELSE 1 END) * 100 
        AS percentage_change
      FROM expenses
      WHERE date >= DATE_SUB(CURRENT_DATE, INTERVAL 2 MONTH)
      GROUP BY user_id
    `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.predictNextMonthSpending = async (req, res) => {
  try {
    const result = await queryResults(`
      SELECT user_id,
        (SUM(CASE WHEN date >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH) THEN amount ELSE 0 END) / 3) AS predicted_next_month
      FROM expenses
      WHERE date >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)
      GROUP BY user_id
    `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
