import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Message } from "../models/messageschema.js";
import ErrorHandler from "../middlewares/error.js";

/**
 * Sends a message from the contact/message form.
 * @param {Object} req - Request object containing message details.
 * @param {Object} res - Response object.
 */
export const sendMessage = catchAsyncErrors(async (req, res, next) => {

  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Sent!",
  });
});


/**
 * Retrieves all messages from the database. (Admin only typically)
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 */
export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});