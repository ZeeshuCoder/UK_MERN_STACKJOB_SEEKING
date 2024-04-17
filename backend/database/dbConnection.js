import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "FREELANCING_MERN_STACK_JOB_PORTAL",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
