import { getSession } from "next-auth/client";

import { connectToDb } from "utils/connectToDb";
import Message from "models/message";
import User from "models/user";

//! add error handling
const handler = async (req, res) => {
  await connectToDb();

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "401 unathorized" });
  }

  const currentUser = await User.findOne({
    email: session.user.email,
  }).populate("inbox");

  await Message.deleteMany({ recipient: currentUser.id });

  currentUser.inbox = [];
  await currentUser.save();
  res.json({ message: "OK" });
};

export default handler;
