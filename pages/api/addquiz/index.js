import { getSession } from "next-auth/client";

import { connectToDb } from "utils/connectToDb";
import User from "models/user";
import Quiz from "models/quiz";

const handler = async (req, res) => {
  // connect to db
  await connectToDb();

  const session = await getSession({ req });

  if (!session) return;

  if (req.method === "POST") {
    const existingUser = await User.findOne({ email: session.user.email });

    const newQuiz = new Quiz({
      creator: existingUser,
      title: req.body.title,
      timeLimit: req.body.timeControl,
      questions: [...req.body.questions],
    });

    await newQuiz.save();
    existingUser.quizes.push(newQuiz);
    await existingUser.save();

    res.json({
      message: "OK",
    });
  }
};

export default handler;
