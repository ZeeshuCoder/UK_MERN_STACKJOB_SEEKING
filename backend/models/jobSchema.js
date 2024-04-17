import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
