import { connectToDb } from "utils/connectToDb";
import User from "models/user";
import Quiz from "models/quiz";
import Message from "models/message";
import { getSession } from "next-auth/client";

const handler = async (req, res) => {
  // fetch all messages
  if (req.method === "GET") {
    await connectToDb();

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: "401 unauthorized" });
    }

    let currentUser;

    try {
      currentUser = await User.findOne({
        email: session.user.email,
      }).populate("inbox");
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong, pleasy try again later." });
    }

    res.status(200).json({ message: "OK", content: currentUser.inbox });
  }

  //! add error handling
  // send a message
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

  let quiz;
  try {
    quiz = await Quiz.findById(quizId).populate("creator");
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }

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

  // ! add error handling
  // update quiz owner in DB
  quizOwner.inbox.push(msg);
  await quizOwner.save();

  //update quiz in DB
  const { solved, average } = quiz.stats;
  quiz.stats.solved += 1;
  if (!solved) {
    quiz.stats.average = result;
  }

  if (solved > 0) {
    quiz.stats.average = (average + result) / 2;
  }

  await quiz.save();

  res.json({ message: "OK" });
};

export default handler;
