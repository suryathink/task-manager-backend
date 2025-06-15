import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
});

export const completeTaskSchema = Joi.object({});

export const paginationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
  dueDate: Joi.date().optional(),
});
