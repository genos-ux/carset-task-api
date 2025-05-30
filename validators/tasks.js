import Joi from "joi";

const categoriesEnum = ["Fleet", "Support", "Marketing"];

const statusEnum = ["pending", "in_progress","completed","cancelled"];

const priorityLevelEnum = ["High","Low","Medium"]

const statusCompleteEnum = ["completed"]

export const taskValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  categories: Joi.string()
    .valid(...categoriesEnum)
    .required(),
  priorityLevel: Joi.string()
    .valid(...priorityLevelEnum)
    .required(),
  status: Joi.string()
    .valid(...statusEnum)
    .default("pending"),
  dueDate: Joi.date()
});

export const markTaskCompleted = Joi.object({
  status: Joi.string().valid(...statusCompleteEnum).required()
})
