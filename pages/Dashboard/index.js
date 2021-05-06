import styles from "./index.module.scss";

// backend
import { connectToDb } from "utils/connectToDb";
import mongoose from "mongoose";
// frontend
import gsap from "gsap";
import { getSession, useSession } from "next-auth/client";
import { useState, useRef, useEffect } from "react";

import Settings from "components/Dashboard/Settings";
import UserPanel from "components/Dashboard/UserPanel";
import QuizList from "components/Dashboard/QuizList";
import Inbox from "components/Dashboard/Inbox";
import { useThrottle } from "hooks/useThrottle";

const Dashboard = ({ quizList, messages, unreadMessages }) => {
  const [dashboardView, setDashboardView] = useState(1);
  const containerRef = useRef(null);
  const [session, loading] = useSession();
  const { throttle } = useThrottle();

  useEffect(() => {
    gsap.set(containerRef.current.children[1], { y: 0 });
  }, []);

  useEffect(() => {
    if (!session) return;

    if (dashboardView === 3 && unreadMessages > 0) {
      fetch("/api/msg/read", {
        method: "PATCH",
      });
    }
  }, [dashboardView]);

  const handleDashboardView = throttle(index => {
    //if this component is already visible
    if (index === dashboardView) return;

    setDashboardView(index);

    const container = containerRef.current.children;
    // removes from the array index which is currently visible
    const hiddenComponents = [1, 2, 3].filter(el => el !== dashboardView);

    // move invisible components to the bottom of the screen
    gsap.set(container[hiddenComponents[0]], { y: "100vh" });
    gsap.set(container[hiddenComponents[1]], { y: "100vh" });

    // show clicked component
    gsap.to(container[index], { y: 0 });
    // hide current component
    gsap.to(container[dashboardView], { y: "-100vh" });
  }, 500);

  return (
    <div className={styles.container} ref={containerRef}>
      <UserPanel
        setDashboardView={handleDashboardView}
        index={dashboardView}
        unreadMessages={unreadMessages}
      />
      <QuizList list={JSON.parse(quizList)} />
      <Settings />
      <Inbox messages={messages} />
    </div>
  );
};

export const getServerSideProps = connectToDb(async context => {
  const session = await getSession({ req: context.req });
  const User = mongoose.model("user");

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const existingUser = await User.findOne({
    email: session.user.email,
  })
    .populate("quizes")
    .populate("inbox");

  const quizList = JSON.stringify(existingUser.quizes);
  const messages = existingUser.inbox;

  const unreadMessages = JSON.stringify(
    [...messages.filter(msg => !msg.isRead)].length
  );

  return {
    props: {
      messages: JSON.stringify(messages),
      unreadMessages,
      quizList,
    },
  };
});

export default Dashboard;
