import { connectToDb } from "utils/connectToDb";
import User from "models/user";
import Quiz from "models/quiz";
import Message from "models/message";

// !add error handling
const handler = async (req, res) => {
  if (req.method !== "POST") return;
  // connect to db
  await connectToDb();

  const { quizId, username, result } = req.body;

  // if no username - player is owner of this quiz
  // message will not be send
  if (!username) {
    return res.status(200).json({ message: "OK" });
  }

  const quizOwner = await User.findOne({ quizes: quizId });

  if (!quizOwner) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }

  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }

  const msg = new Message({
    recipient: quizOwner,
    result,
    quizName: quiz.title,
    username,
  });

  try {
    await msg.save();
  } catch (err) {
    return res.status(500).json({ message: "Coult not send result" });
  }

  quizOwner.inbox.push(msg);
  await quizOwner.save();

  res.json({ message: "OK" });
};

export default handler;
