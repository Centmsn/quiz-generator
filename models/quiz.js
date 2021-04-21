import mongoose from "mongoose";

const { Schema } = mongoose;

const quizSchema = new Schema({
  questions: {
    type: [
      {
        question: {
          type: String,
          required: true,
        },
        correctAnswerIndex: {
          type: Number,
          required: true,
        },
        answers: [String],
      },
    ],
  },
});

const Quiz = mongoose.model("quiz", quizSchema);
export default Quiz;
