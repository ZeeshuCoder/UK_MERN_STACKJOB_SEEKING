import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";
import { User } from "../models/userSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { content, receiver } = req.body;
  const sender = req.user._id;
  if (!content) {
    return next(new ErrorHandler("Message Can't be Empty!", 400));
  }
  const message = await Message.create({ content, receiver, sender });
  res.status(200).json({
    success: true,
    message,
  });
});

export const getMyChatWithUser = catchAsyncErrors(async (req, res, next) => {
  const { receiverId } = req.params;
  const senderId = req.user._id;
  const messages = await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  });
  res.status(200).json({
    success: true,
    messages,
  });
});

export const getUserForInbox = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;
  // Find all unique sender and receiver IDs for messages involving the user
  const senderIds = await Message.distinct("sender", { receiver: userId });
  const receiverIds = await Message.distinct("receiver", { sender: userId });

  // Combine sender and receiver IDs and remove duplicates
  const allUserIds = [...new Set([...senderIds, ...receiverIds])];

  // Query your user database to fetch user details for the found IDs
  // Assuming you have a User model and want to fetch details like name
  const users = await User.find({ _id: { $in: allUserIds } }, "name");
  res.status(200).json({
    success: true,
    users,
  });
});
