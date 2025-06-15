import express from "express";
import { signup, login, getProfile } from "../../controllers/user.controller";
import { authenticate } from "../../middlewares/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",login);




export default router;