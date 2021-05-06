import mongoose, { Schema } from "mongoose";

const message = new Schema({
  recipient: {
    type: mongoose.Types.ObjectId,
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

// export default mongoose.models?.message || mongoose.model("message", message);
export default mongoose.model("message", message);
