import express from "express";
import { getUser, updateUser, vendorRegistration } from "../controllers/user-controllers.js";
const router = express.Router();

router.post('/vendor-registration',vendorRegistration);
router.get('/get-user/:userId',getUser);
router.patch('/update-user/:userId',updateUser);

export default router;
