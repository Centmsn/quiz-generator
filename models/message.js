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
});

export default mongoose.models?.message || mongoose.model("message", message);
