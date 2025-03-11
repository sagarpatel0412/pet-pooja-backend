const express = require("express");
const router = express.Router();
const userRouter = require("./routes/user.routes");
const categoryRouter = require("./routes/catergory.routes");
const expenseRouter = require("./routes/expense.controller");
const statsRouter = require("./routes/statistics.controller");

router.use("/v1", userRouter);
router.use("/v1", categoryRouter);
router.use("/v1", expenseRouter);
router.use("/v1", statsRouter);

module.exports = router;
