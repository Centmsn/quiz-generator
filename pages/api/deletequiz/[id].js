import { getSession } from "next-auth/client";
import mongoose from "mongoose";

import { connectToDb } from "utils/connectToDb";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const session = await getSession({ req });
    const User = mongoose.model("user");
    const Quiz = mongoose.model("quiz");

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

export default connectToDb(handler);
