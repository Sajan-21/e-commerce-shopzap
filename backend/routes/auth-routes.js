import express from "express";
import { adminLogin, login, signUp } from "../controllers/auth-controllers.js";
const router = express.Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/admin-login', adminLogin);

export default router;
