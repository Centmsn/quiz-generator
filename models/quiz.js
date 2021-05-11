import mongoose, { Schema } from "mongoose";

const quiz = new Schema({
  creator: {
    type: String,
    ref: "user",
  },
  isPublic: {
    type: Boolean,
    default: false,
    requried: true,
  },
  title: { type: String, required: true },
  timeLimit: {
    limit: {
      type: Number,
    },
    limitType: {
      type: String,
    },
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answers: {
        0: {
          type: String,
          required: true,
        },
        1: {
          type: String,
          required: true,
        },
        2: {
          type: String,
          required: true,
        },
        3: {
          type: String,
          required: true,
        },
      },
      correct: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Quiz = mongoose.models?.quiz || mongoose.model("quiz", quiz);

export default Quiz;
