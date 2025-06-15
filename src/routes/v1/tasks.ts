import express from "express";
// import { UserController } from "../../controllers/user.controller";

import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  markTaskComplete,
  deleteTask,
} from '../../controllers/task.controller';
import  {authenticate, AuthRequest} from '../../middlewares/auth';

const router = Router();

router.post('/', authenticate as unknown as AuthRequest, createTask); // Create new task
router.get('/', authenticate, getTasks); // List tasks (with filters & pagination)
router.get('/:id', authenticate, getTaskById); // Get task by ID
router.put('/:id', authenticate, updateTask); // Update task
router.patch('/:id/complete', authenticate, markTaskComplete); // Mark task complete
router.delete('/:id', authenticate, deleteTask); // Delete task



export default router;