import Joi from "joi";

const categoriesEnum = ["Fleet", "Support", "Marketing"];

const statusEnum = ["pending", "in_progress","completed","cancelled"];

const priorityLevelEnum = ["High","Low","Medium"]

const statusCompleteEnum = ["completed"]

export const createTaskValidator = Joi.object({
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

export const editTaskValidator = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  categories: Joi.string()
    .valid(...categoriesEnum)
    .optional(),
  priorityLevel: Joi.string()
    .valid(...priorityLevelEnum)
    .optional(),
  status: Joi.string()
    .valid(...statusEnum)
    .default("pending").optional(),
  dueDate: Joi.date().optional(),
});

export const markTaskCompleted = Joi.object({
  status: Joi.string().valid(...statusCompleteEnum).required()
})
