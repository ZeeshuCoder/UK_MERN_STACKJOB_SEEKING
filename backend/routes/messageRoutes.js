import express from "express";
import {
  sendMessage,
  getMyChatWithUser,
  getUserForInbox,
} from "../controllers/messgeController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", isAuthenticated, sendMessage);
router.get("/getmychats/:receiverId", isAuthenticated, getMyChatWithUser);
router.get("/inbox", isAuthenticated, getUserForInbox);

export default router;
