import mongoose, { Schema } from "mongoose";

const user = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  quizes: {
    type: [mongoose.Types.ObjectId],
    ref: "quiz",
    default: [],
  },
});

const User = mongoose.models?.user || mongoose.model("user", user);

module.exports = User;
