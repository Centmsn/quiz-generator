import { getSession } from "next-auth/client";

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

    // todo add mongoose session
    //! commit session if no error occured
    // ! add error handling
    await currentUser.quizes.pull(currentQuiz);
    await currentUser.save();
    await Quiz.deleteOne({ _id: currentQuiz });

    res.json({ message: "OK" });
  }
};

export default handler;
