const express = require("express");
const router = express.Router();

const statisticsController = require("../controllers/statistics.controller");

router.get("/stats/top-spending-days", statisticsController.topSpendingDays);
router.get("/stats/percentage-change", statisticsController.percentageChange);
router.get(
  "/stats/predict-next-month",
  statisticsController.predictNextMonthSpending
);

module.exports = router;
