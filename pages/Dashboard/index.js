import styles from "./index.module.scss";

import { getSession } from "next-auth/client";
import User from "../../models/user";
import Quiz from "../../models/quiz";

import UserPanel from "../../components/UserPanel";
import QuizList from "../../components/QuizList";
import mongoose from "mongoose";

const Dashboard = ({ quizList }) => {
  return (
    <div className={styles.container}>
      <UserPanel />
      <QuizList list={JSON.parse(quizList)} />
    </div>
  );
};

export const getServerSideProps = async context => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await mongoose.connect(process.env.DB_URI);

  const existingUser = await User.findOne({
    email: session.user.email,
  }).populate("quizes");

  return {
    props: {
      quizList: JSON.stringify(existingUser.quizes),
    },
  };
};

export default Dashboard;
