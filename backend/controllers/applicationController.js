import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Client") {
    return next(
      new ErrorHandler("Client not allowed to access this resource.", 400)
    );
  }
  const { coverLetter, jobId } = req.body;
  const tradePersonID = {
    user: req.user._id,
    role: "Trade Person",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job Id Missing!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const clientID = {
    user: jobDetails.postedBy,
    role: "Client",
  };
  const isAlreadyApplied = await Application.findOne({ jobId, tradePersonID });
  if (isAlreadyApplied) {
    return next(
      new ErrorHandler("You have already applied for this job!", 400)
    );
  }
  if (jobDetails.category !== req.user.specialization) {
    return next(
      new ErrorHandler("Your Specialization Does Not Match This Job!", 400)
    );
  }
  if (!coverLetter || !tradePersonID || !clientID) {
    return next(new ErrorHandler("Coverletter is mandatory!", 400));
  }
  const application = await Application.create({
    coverLetter,
    tradePersonID,
    clientID,
    jobId,
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

export const clientGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Trade Person") {
      return next(
        new ErrorHandler(
          "Trade Person not allowed to access this resource.",
          400
        )
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "clientID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const tradePersonGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Client") {
      return next(
        new ErrorHandler("Client not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "tradePersonID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const clientDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Trade Person") {
      return next(
        new ErrorHandler(
          "Trade Person not allowed to access this resource.",
          400
        )
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);
