import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const { city } = req.query;
  let jobs = await Job.find({ category: req.user.specialization });
  if (city) {
    jobs = await Job.find({ category: req.user.specialization, city });
  }
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Trade Person") {
    return next(
      new ErrorHandler("Trade Person not allowed to access this resource.", 400)
    );
  }
  const { title, description, category, city } = req.body;

  if (!title || !description || !category || !city) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    city,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Trade Person") {
    return next(
      new ErrorHandler("Trade Person not allowed to access this resource.", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Trade Person") {
    return next(
      new ErrorHandler("Trade Person not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

export const getASingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  res.status(200).json({
    success: true,
    job,
  });
});
