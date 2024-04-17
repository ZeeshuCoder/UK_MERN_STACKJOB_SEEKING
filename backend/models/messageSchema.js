import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    minLength: [1, "Message can't be empty!"],
  },
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model("Message", messageSchema);
