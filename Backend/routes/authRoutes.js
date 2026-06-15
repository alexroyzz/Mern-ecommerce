import express from "express";
import { signupUser, LoginUser } from "../controller/authControl.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", LoginUser);

export default router;
