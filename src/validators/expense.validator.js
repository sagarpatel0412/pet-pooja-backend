const Joi = require("joi");

const expenseSchema = Joi.object({
  user_id: Joi.alternatives()
    .try(Joi.number().integer(), Joi.string().allow(""))
    .required()
    .messages({
      "alternatives.types": "User ID must be a number or a valid string",
      "any.required": "User ID is required",
    }),
  category_id: Joi.alternatives()
    .try(Joi.number().integer(), Joi.string().allow(""))
    .required()
    .messages({
      "alternatives.types": "Category ID must be a number or a valid string",
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
