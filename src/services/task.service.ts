import { AppDataSource } from '../configs/db';
import { Task } from '../models/Task';
import { FindOptionsWhere } from 'typeorm';

export const createTask = async (userId: string, data: Partial<Task>) => {
  const taskRepo = AppDataSource.getRepository(Task);
  const task = taskRepo.create({ ...data, user: { id: userId } });
  return await taskRepo.save(task);
};
export const getTasks = async (userId: string, query: any) => {
  const taskRepo = AppDataSource.getRepository(Task);

  const where: FindOptionsWhere<Task> = {
    user: { id: userId },
  };

  if (query.completed !== undefined) {
    where.completed = query.completed === 'true' || query.completed === true;
  }

  if (query.dueDate) where.dueDate = new Date(query.dueDate);

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const [tasks, total] = await taskRepo.findAndCount({
    where,
    skip,
    take: limit,
    order: { createdAt: 'DESC' },
  });

  return {
    page,
    limit,
    total,
    tasks,
  };
};


export const getTaskById = async (userId: string, taskId: string) => {
  const taskRepo = AppDataSource.getRepository(Task);
  const task = await taskRepo.findOne({
    where: { id: taskId, user: { id: userId } },
  });
  if (!task) throw new Error('Task not found');
  return task;
};

export const updateTask = async (userId: string, taskId: string, data: Partial<Task>) => {
  const taskRepo = AppDataSource.getRepository(Task);
  const task = await getTaskById(userId, taskId);
  Object.assign(task, data);
  return await taskRepo.save(task);
};

export const markTaskComplete = async (userId: string, taskId: string) => {
  const taskRepo = AppDataSource.getRepository(Task);
  const task = await getTaskById(userId, taskId);
  task.completed = true;
  return await taskRepo.save(task);
};

export const deleteTask = async (userId: string, taskId: string) => {
  const taskRepo = AppDataSource.getRepository(Task);
  const task = await getTaskById(userId, taskId);
  await taskRepo.remove(task);
};