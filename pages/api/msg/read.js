import { getSession } from "next-auth/client";

import { connectToDb } from "utils/connectToDb";
import User from "models/user";
import Message from "models/message";

const handler = async (req, res) => {
  // connect to db
  await connectToDb();

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "401 Unathorized" });
  }

  const currentUser = await User.findOne({
    email: session.user.email,
  }).populate("inbox");

  if (!currentUser) {
    return res.status(500).json({ message: "Internal server error" });
  }

  if (currentUser.email !== session.user.email) {
    return res.status(403).json({ messsage: "403 Forbidden" });
  }

  try {
    await Message.updateMany({ recipient: currentUser.id }, { isRead: true });
  } catch (err) {
    return res.status(500).json({ message: "500 Internal server error" });
  }

  res.status(200).json({ message: "OK" });
};

export default handler;
