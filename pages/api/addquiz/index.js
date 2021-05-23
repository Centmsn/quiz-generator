import { getSession } from "next-auth/client";
import mongoose from "mongoose";

import { connectToDb } from "utils/connectToDb";
import { validateQuizObject } from "utils/validateQuizObject";
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

    const { title, timeLimit, questions, isPublic } = req.body;

    const quizObject = {
      creator: existingUser,
      title,
      timeLimit,
      questions,
      isPublic,
    };

    // validates quiz object
    const errors = validateQuizObject(quizObject);
    const errorMessages = Object.values(errors).join(" ");

    if (errorMessages.length) {
      return res.status(422).json({ message: errorMessages });
    }

    const newQuiz = new Quiz(quizObject);

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
