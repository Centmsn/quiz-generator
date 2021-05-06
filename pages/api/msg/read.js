import { getSession } from "next-auth/client";
import mongoose from "mongoose";

import { connectToDb } from "utils/connectToDb";
import User from "models/user";
import Message from "models/message";

const handler = async (req, res) => {
  // connect to db
  await connectToDb();

  const session = await getSession({ req });
  //! if no session

  const currentUser = await User.findOne({
    email: session.user.email,
  }).populate("inbox");

  if (!currentUser) {
    return res.status(500).json({ message: "Internal server error" });
  }

  try {
    // ! refactor
    const test = await Message.find().populate("recipient");

    const a = test.filter(el => el.recipient.id === currentUser.id);

    a.forEach(async el => {
      el.isRead = true;
      await el.save();
    });

    // await Message.updateMany({ recipient: currentUser.id }, { isRead: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  res.status(200).json({ message: "OK" });
};

export default handler;
