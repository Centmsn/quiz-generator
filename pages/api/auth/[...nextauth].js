import Providers from "next-auth/providers";
import NextAuth from "next-auth";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      Providers.Credentials({
        async authorize(credentials) {
          await mongoose.connect(process.env.DB_URI, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
          });
          const User = mongoose.model("user");

          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User does not exist.");
          }

          const isValid = await bcrypt.compare(
            req.body.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Password is incorrect.");
          }

          return { email: user.email, _id: user.id };
        },
      }),
    ],
    session: {
      jwt: true,
    },

    database: process.env.DB_URI,
  });
