import { Request, Response } from "express";
import httpStatus from "http-status";
import { logApiError } from "../helpers/logApiError";
import { loginUser, registerUser, getUserProfile} from "../services/user.service";
import { AuthRequest } from '../middlewares/auth';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res
      .status(httpStatus.OK)
      .json({
        message: "User created",
        user: { id: user.id, email: user.email },
      });
  } catch (err: any) {
    logApiError(req, err);
    res.status(httpStatus.BAD_REQUEST).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res
      .status(httpStatus.OK)
      .json({
        message: "Login successful",
        token,
      });
      return
  } catch (err: any) {
    logApiError(req, err);
    res.status(httpStatus.UNAUTHORIZED).json({ error: err.message });
  }
};


export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getUserProfile(req.user.id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
    }
    return res.status(httpStatus.OK).json(user);
  } catch (err:any) {
    logApiError(req, err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching profile' });
  }
};