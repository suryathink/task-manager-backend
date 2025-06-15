import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  dueDate: Joi.date().optional(),
  completed: Joi.boolean().optional(), // <-- updated from status
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  completed: Joi.boolean().optional(),
});

export const completeTaskSchema = Joi.object({});

export const paginationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  completed: Joi.boolean().optional(), // <-- updated from status
  dueDate: Joi.date().optional(),
});
