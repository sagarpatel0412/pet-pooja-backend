const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name must not exceed 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  status: Joi.string().valid("active", "inactive").required().messages({
    "string.empty": "Status is required",
    "any.only": "Status must be either 'active' or 'inactive'",
  }),
});

const validateUser = (user) => {
  return userSchema.validate(user, { abortEarly: false });
};

module.exports = validateUser;
