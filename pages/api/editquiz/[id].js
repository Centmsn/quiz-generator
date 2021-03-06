import { getSession } from "next-auth/client";

import QuizModel from "models/quiz";
import UserModel from "models/user";
import { connectToDb } from "utils/connectToDb";
import { validateQuizObject } from "utils/validateQuizObject";

const handler = async (req, res) => {
  if (req.method === "PATCH") {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: "401 unathorized",
      });
    }

    //connect to DB
    await connectToDb();

    const { title, timeLimit, questions, isPublic } = req.body;

    let quizToUpdate;

    try {
      quizToUpdate = await QuizModel.findById(req.query.id).populate("creator");
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Could not find the quiz. Please try again later" });
    }

    let quizOwner;
    try {
      quizOwner = await UserModel.findOne({
        email: quizToUpdate.creator.email,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Uuppss... something went wrong. Please try again later",
      });
    }

    // if logged user is not a quiz owner
    if (quizOwner.email !== session.user.email) {
      return res.status(403).json({ message: "403 forbidden" });
    }

    const quizObject = {
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

    // update quiz
    quizToUpdate.title = title;
    quizToUpdate.timeLimit = timeLimit;
    quizToUpdate.questions = questions;
    quizToUpdate.isPublic = isPublic;

    try {
      await quizToUpdate.save();
    } catch (error) {
      return res.status(500).json({
        message: "Could not update the quiz. Please try again later",
      });
    }

    res.json({ message: "OK" });
  }
};

export default handler;
