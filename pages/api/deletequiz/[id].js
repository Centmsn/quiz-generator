import { getSession } from "next-auth/client";
import mongoose from "mongoose";

import { connectToDb } from "utils/connectToDb";
import User from "models/user";
import Quiz from "models/quiz";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    // connect to db
    await connectToDb();

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({
        message: "401 Forbidden",
      });
    }

    const currentUser = await User.findOne({ email: session.user.email });
    const currentQuiz = await Quiz.findById(req.query.id);

    if (!currentQuiz || !currentUser) {
      res.status(500).json({
        message: "500 internal server error",
      });
    }

    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      await currentUser.quizes.pull(currentQuiz);
      await currentUser.save({ session });
      await Quiz.deleteOne({ _id: currentQuiz }, { session });

      await session.commitTransaction();
    } catch (error) {
      res.status(500).json({
        message: "500 internal server error",
      });
    }

    res.status(200).json({ message: "OK" });
  }
};

export default handler;
