import express from "express";
import {  getProfile } from "../../controllers/user.controller";
import { authenticate } from "../../middlewares/auth";

const router = express.Router();

router.get('/me', authenticate as any, getProfile as any);



export default router;