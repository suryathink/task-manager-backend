import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  dueDate: Joi.date().optional(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().allow('').optional(),
  completed: Joi.boolean().optional(),
  dueDate: Joi.date().optional(),
});
