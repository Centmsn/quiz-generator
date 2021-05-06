import { connectToDb } from "utils/connectToDb";

// !add error handling
const handler = async (req, res) => {
  if (req.method !== "POST") return;
  const User = mongoose.model("user");
  const Quiz = mongoose.model("quiz");
  const Message = mongoose.model("message");
  const { quizId, username, result } = req.body;

  // if no username - player is owner of this quiz
  // message will not be send
  if (!username) {
    return res.status(200);
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

export default connectToDb(handler);
