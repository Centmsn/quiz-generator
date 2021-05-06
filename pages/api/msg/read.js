import { getSession } from "next-auth/client";
import mongoose from "mongoose";

import { connectToDb } from "utils/connectToDb";
import User from "models/user";
import Message from "models/message";

const handler = async (req, res) => {
  // connect to db
  await connectToDb();

  const session = await getSession({ req });

  const currentUser = await User.findOne({
    email: session.user.email,
  });

  if (!currentUser) {
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    await Message.updateMany({ recipient: currentUser }, { isRead: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  res.status(200).json({ message: "OK" });
};

export default handler;
