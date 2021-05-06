import mongoose, { Schema } from "mongoose";

const message = new Schema({
  recipient: {
    type: String,
    ref: "user",
    required: true,
  },
  quizName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Message = mongoose.models?.message || mongoose.model("message", message);
module.exports = Message;
