import { getSession } from "next-auth/client";
import mongoose from "mongoose";

import { connectToDb } from "utils/connectToDb";
import User from "models/user";
import Quiz from "models/quiz";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // connect to db
    await connectToDb();

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: "401 unauthorized",
      });
    }

    let existingUser;

    try {
      existingUser = await User.findOne({ email: session.user.email });
    } catch (error) {
      return res.status(500).json({
        message: "User not found. Please try to login again.",
      });
    }

    const { title, timeControl, questions } = req.body;

    //validate request body
    if (!title.trim()) {
      return res.status(422).json({
        message: "Quiz title must contain atleast 1 character.",
      });
    }

    // time limit validation
    if (typeof timeControl.limit !== "number" || timeControl.limit < 0) {
      return res.status(422).json({
        message:
          "Time limit must be a number. Time limit must be greater than 0",
      });
    }

    // questions length validation
    if (!questions.length) {
      return res.status(422).json({
        message: "Quiz must have atleast 1 question.",
      });
    }

    let validationError = null;

    // answers validation
    questions.forEach(({ answers, question, correct }) => {
      const trimmedAnswers = Object.values(answers).map(answer =>
        answer.trim()
      );
      const trimmedQuestion = question.trim();

      if (trimmedQuestion.length < 5) {
        validationError = "Question must have atleast 5 characters.";
        return;
      }

      if (typeof correct !== "number" || correct > 3) {
        validationError = "Correct answer is not a valid data.";
        return;
      }

      if (
        !trimmedAnswers[0] ||
        !trimmedAnswers[1] ||
        !trimmedAnswers[2] ||
        !trimmedAnswers[3]
      ) {
        validationError = "Answer must have atleast 1 character.";
        return;
      }
    });

    if (validationError) {
      return res.status(422).json({ message: validationError });
    }

    const newQuiz = new Quiz({
      creator: existingUser,
      title: title,
      timeLimit: timeControl,
      questions: [...questions],
    });

    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      await newQuiz.save({ session });
      existingUser.quizes.push(newQuiz);
      await existingUser.save({ session });

      await session.commitTransaction();
    } catch (error) {
      return res.status(500).json({
        message: "Could not save the quiz in the database. Please try again.",
      });
    }

    res.json({
      message: "OK",
    });
  }
};

export default handler;
