import Providers from "next-auth/providers";
import NextAuth from "next-auth";
import mongoose from "mongoose";
import User from "../../../models/user";

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      Providers.Credentials({
        async authorize(credentials) {
          const client = await mongoose.connect(process.env.DB_URI, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
          });

          const user = await client.models.user.findOne({
            email: credentials.email,
          });

          // const client = await MongoClient.connect(process.env.DB_URI);
          // const collection = client.db().collection("users");

          // const user = await collection.findOne({ email: credentials.email });

          if (!user) {
            return;
          }

          // todo add bcrypt validation

          return { user };
        },
      }),
    ],
    session: {
      jwt: true,
    },

    database: process.env.DB_URI,
  });
