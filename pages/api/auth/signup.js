import { connectToDb } from "../../../utils/connectToDb";
import User from "../../../models/user";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    console.log("User already exists");
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
  } catch (err) {
    console.log(err);
    return;
  }
};

export default connectToDb(handler);
