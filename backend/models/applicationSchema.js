import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  coverLetter: {
    type: String,
    required: [true, "Please provide cover letter!"],
  },
  tradePersonID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Trade Person"],
      required: true,
    },
  },
  clientID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Client"],
      required: true,
    },
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export const Application = mongoose.model("Application", applicationSchema);
