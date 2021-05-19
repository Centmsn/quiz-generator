import { getSession } from "next-auth/client";

import { connectToDb } from "utils/connectToDb";
import User from "models/user";

// fetch all messages
const handler = async (req, res) => {
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
};

export default handler;
