const { queryResults } = require("../config/connection");

exports.topSpendingDays = async (req, res) => {
  try {
    const result = await queryResults(`
      SELECT e.user_id as userid, u.name as name, e.date as date, SUM(e.amount) as total_spent
      FROM expenses e INNER JOIN users u on e.user_id = u.id
      GROUP BY e.user_id, e.date
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
WITH monthly_expenses AS (
    SELECT
        e.user_id as user_id,
        u.name as name,
        DATE_FORMAT(e.date, '%Y-%m') AS month,
        SUM(e.amount) AS total_expenditure,
        MIN(STR_TO_DATE(CONCAT(DATE_FORMAT(e.date, '%Y-%m'), '-01'), '%Y-%m-%d')) AS month_date
    FROM expenses e INNER JOIN users u on e.user_id = u.id
    GROUP BY user_id, DATE_FORMAT(date, '%Y-%m')
)
SELECT
    m.user_id,
    m.month,
    m.total_expenditure,
    m.name,
    p.total_expenditure AS previous_total,
    CASE
        WHEN p.total_expenditure IS NULL OR p.total_expenditure = 0 THEN NULL
        ELSE ((m.total_expenditure - p.total_expenditure) / p.total_expenditure) * 100
    END AS percentage_change
FROM monthly_expenses m
LEFT JOIN monthly_expenses p
    ON m.user_id = p.user_id
    AND p.month_date = DATE_SUB(m.month_date, INTERVAL 1 MONTH)
ORDER BY m.user_id, m.month;


    `);
    const resultData = result.map((item) => {
      return {
        ...item,
        previous_total:
          item.previous_total === null ? "0" : item.previous_total,
        percentage_change:
          item.percentage_change === null ? "0" : item.percentage_change,
      };
    });
    res.json(resultData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.predictNextMonthSpending = async (req, res) => {
  try {
    const result = await queryResults(`
      WITH monthly_expenses AS (
    SELECT
        e.user_id as user_id,
        u.name as name,
        DATE_FORMAT(e.date, '%Y-%m') AS month,
        SUM(e.amount) AS total_expenditure
    FROM expenses e INNER JOIN users u on e.user_id = u.id
    GROUP BY user_id, DATE_FORMAT(date, '%Y-%m')
),
ranked_expenses AS (
    SELECT
        user_id,
        name,
        month,
        total_expenditure,
        ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY month DESC) AS rn
    FROM monthly_expenses
)
SELECT
    user_id,
    name,
    AVG(total_expenditure) AS predicted_next_month_expenditure
FROM ranked_expenses
WHERE rn <= 3
GROUP BY user_id;

    `);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
