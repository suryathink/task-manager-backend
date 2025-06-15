import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/task.service';
import {
  createTaskSchema,
  updateTaskSchema,
  completeTaskSchema,
  paginationQuerySchema,
} from '../validations/task.validation';
import { AuthRequest } from '../middlewares/auth';
import { logApiError } from '../helpers/logApiError';
import httpStatus from "http-status"

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { error, value } = createTaskSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const task = await taskService.createTask(req.user.id, value);
    res.status(httpStatus.CREATED).json(task);
  } catch (err:any) {
    logApiError(req, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { error, value } = paginationQuerySchema.validate(req.query);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const tasks = await taskService.getTasks(req.user.id, value);
    res.status(httpStatus.OK).json(tasks);
  } catch (err:any) {
    logApiError(req, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.getTaskById(req.user.id, req.params.id);
    res.status(httpStatus.OK).json(task);
  } catch (err:any) {
    logApiError(req, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { error, value } = updateTaskSchema.validate(req.body);
    if (error) return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message });

    const task = await taskService.updateTask(req.user.id, req.params.id, value);
    res.status(200).json(task);
  } catch (err:any) {
    logApiError(req, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const markTaskComplete = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { error } = completeTaskSchema.validate(req.body);
    if (error) return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message });

    const task = await taskService.markTaskComplete(req.user.id, req.params.id);
    res.status(httpStatus.OK).json(task);
  } catch (err:any) {
    logApiError(req, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await taskService.deleteTask(req.user.id, req.params.id);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err:any) {
    logApiError(req, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};