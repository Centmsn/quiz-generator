import styles from "./index.module.scss";

import gsap from "gsap";
import { getSession } from "next-auth/client";
import { useState, useRef } from "react";
import mongoose from "mongoose";

import Settings from "components/Settings";
import User from "models/user";
import UserPanel from "components/UserPanel";
import Quiz from "models/quiz";
import QuizList from "components/QuizList";
import { useThrottle } from "hooks/useThrottle";

const Dashboard = ({ quizList }) => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const containerRef = useRef(null);
  const { throttle } = useThrottle();

  const handleSettingsVisiblity = throttle(() => {
    const container = containerRef.current.children;
    setIsSettingsVisible(prev => !prev);

    if (!isSettingsVisible) {
      gsap.set(container[2], { y: "100vh" });

      gsap.to(container[2], { y: 0 });
      gsap.to(container[1], { y: "-100vh" });
      return;
    }

    gsap.set(container[1], { y: "100vh" });

    gsap.to(container[2], { y: "-100vh" });
    gsap.to(container[1], { y: 0 });
  }, 500);

  return (
    <div className={styles.container} ref={containerRef}>
      <UserPanel
        displaySettings={handleSettingsVisiblity}
        settingsVisible={isSettingsVisible}
      />
      <QuizList list={JSON.parse(quizList)} />
      <Settings />
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
