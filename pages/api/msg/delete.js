import { getSession } from "next-auth/client";
import mongoose from "mongoose";

import { connectToDb } from "utils/connectToDb";
import Message from "models/message";
import User from "models/user";

const handler = async (req, res) => {
  await connectToDb();

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "401 unathorized" });
  }

  let currentUser;

  try {
    currentUser = await User.findOne({
      email: session.user.email,
    }).populate("inbox");
  } catch (error) {
    return res.status(500).json({
      message: "403 unathorized. Please try to login again.",
    });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await Message.deleteMany({ recipient: currentUser.id }, { session });
    currentUser.inbox = [];
    await currentUser.save({ session });

    await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({
      message: "Could not delete messages. Please try again later.",
    });
  }

  res.status(200).json({ message: "OK" });
};

export default handler;
