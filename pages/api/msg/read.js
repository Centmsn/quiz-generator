import { getSession } from "next-auth/client";
import mongoose from "mongoose";

import { connectToDb } from "utils/connectToDb";

const handler = async (req, res) => {
  const session = await getSession({ req });
  const User = mongoose.model("user");
  const Message = mongoose.model("message");

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
  }

  res.status(200).json({ message: "OK" });
};

export default connectToDb(handler);
