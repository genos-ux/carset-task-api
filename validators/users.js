import Joi from "joi";

const roles = ["admin", "manager", "staff"];

export const registerUserValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(...roles)
    .default("staff"),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");
