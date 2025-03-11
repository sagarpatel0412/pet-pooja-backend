const Joi = require("joi");

const expenseSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    "number.base": "User ID must be a number",
    "any.required": "User ID is required",
  }),
  category_id: Joi.number().integer().required().messages({
    "number.base": "Category ID must be a number",
    "any.required": "Category ID is required",
  }),
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a valid number",
    "number.positive": "Amount must be greater than zero",
    "any.required": "Amount is required",
  }),
  date: Joi.date().required().messages({
    "date.base": "Date must be a valid date",
    "any.required": "Date is required",
  }),
  description: Joi.string().allow("").optional(),
});

const validateExpense = (expense) =>
  expenseSchema.validate(expense, { abortEarly: false });

module.exports = validateExpense;
