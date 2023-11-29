import { Router } from "express";
import User from "../controllers/user.js";
const router = Router();

router.use("/user",User)

export default router;