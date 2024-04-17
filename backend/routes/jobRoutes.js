import express from "express";
import {
  deleteJob,
  getASingleJob,
  getAllJobs,
  getMyJobs,
  postJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", isAuthenticated, getAllJobs);
router.post("/post", isAuthenticated, postJob);
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.get("/get/:id", isAuthenticated, getASingleJob);

export default router;
