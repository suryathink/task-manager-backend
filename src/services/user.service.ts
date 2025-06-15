import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AppDataSource } from '../configs/db';
import { User } from '../models/User';
import { hashPassword,comparePassword } from '../helpers/hash';

dotenv.config()

export const registerUser = async (name: string, email: string, password: string) => {
  const userRepo = AppDataSource.getRepository(User);

  const existing = await userRepo.findOne({ where: { email } });
  if (existing) throw new Error('User already exists');

  const hashed = await hashPassword(password);
  const user = userRepo.create({ name, email, password: hashed });

  await userRepo.save(user);
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error('Invalid credentials');

    const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  return { token, user };
};
