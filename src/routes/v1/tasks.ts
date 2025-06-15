
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

router.post('/', authenticate as any, createTask as any); 
router.get('/', authenticate as any, getTasks as any); 
router.get('/:id', authenticate as any, getTaskById as any); 
router.put('/:id', authenticate as any, updateTask as any);
router.patch('/:id/complete', authenticate as any, markTaskComplete as any); 
router.delete('/:id', authenticate as any, deleteTask); 



export default router;