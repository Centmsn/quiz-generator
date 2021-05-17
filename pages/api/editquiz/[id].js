import { getSession } from "next-auth/client";

import QuizModel from "models/quiz";
import UserModel from "models/user";
import { connectToDb } from "utils/connectToDb";

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

    const { title, timeControl, questions, isPublic } = req.body;

    const quizToUpdate = await QuizModel.findById(req.query.id).populate(
      "creator"
    );

    quizToUpdate.title = title;
    quizToUpdate.timeControl = timeControl;
    quizToUpdate.questions = questions;
    quizToUpdate.isPublic = isPublic;

    console.log(quizToUpdate);

    await quizToUpdate.save();

    res.json({ message: "OK" });
  }
};

export default handler;
