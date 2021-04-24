import { connectToDb } from "../../../utils/connectToDb";
import bcrypt from "bcryptjs";
import User from "../../../models/user";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(422).json({ error: "User already exists" });
    return;
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
  } catch (err) {
    res.status(500).json({ err });
    return;
  }

  res.json({ message: "OK" });
};

export default connectToDb(handler);
