import { connectToDb } from "../../../utils/connectToDb";
import bcrypt from "bcryptjs";
import User from "../../../models/user";

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const { email, password } = req.body;

  if (password.length < 6) {
    return res
      .status(422)
      .json({ message: "Password must have atleast 6 characters." });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res
      .status(422)
      .json({ message: "Provided email is not a valid email address." });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(422).json({ message: "User already exists" });
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
