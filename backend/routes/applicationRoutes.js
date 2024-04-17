import express from "express";
import {
  clientGetAllApplications,
  clientDeleteApplication,
  tradePersonGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/client/getall", isAuthenticated, clientGetAllApplications);
router.get(
  "/tradeperson/getall",
  isAuthenticated,
  tradePersonGetAllApplications
);
router.delete("/delete/:id", isAuthenticated, clientDeleteApplication);

export default router;
