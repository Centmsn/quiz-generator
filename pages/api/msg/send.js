import Quiz from "models/quiz";
import Message from "models/message";
import User from "models/user";
import { connectToDb } from "utils/connectToDb";

// send a message - quiz result
const handler = async (req, res) => {
  if (req.method === "POST") {
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

    try {
      // update quiz owner in DB
      quizOwner.inbox.push(msg);
      await quizOwner.save();
    } catch (error) {
      return res.status(500).json({ message: "500 Internal server error" });
    }

    //update quiz in DB
    const { solved, average } = quiz.stats;
    quiz.stats.solved += 1;
    if (!solved) {
      quiz.stats.average = Math.round(result);
    }

    if (solved > 0) {
      quiz.stats.average = Math.round((average + result) / 2);
    }

    // TODO: use mongoose session to update quiz in DB and send msg to the user concurrently
    try {
      await quiz.save();
    } catch (error) {
      return res.status(500).json({ message: "500 Internal server error" });
    }

    res.json({ message: "OK" });
  }
};

export default handler;
