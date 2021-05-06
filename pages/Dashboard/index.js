import styles from "./index.module.scss";

import gsap from "gsap";
import { getSession } from "next-auth/client";
import { useState, useRef, useEffect } from "react";

// backend
import { connectToDb } from "utils/connectToDb";
import User from "models/user";
import "models/quiz";
import "models/message";
// frontend
import Settings from "components/Dashboard/Settings";
import UserPanel from "components/Dashboard/UserPanel";
import QuizList from "components/Dashboard/QuizList";
import Inbox from "components/Dashboard/Inbox";
import { useThrottle } from "hooks/useThrottle";

const Dashboard = ({ quizList, messages }) => {
  const [dashboardView, setDashboardView] = useState(1);
  const containerRef = useRef(null);
  const { throttle } = useThrottle();

  useEffect(() => {
    gsap.set(containerRef.current.children[1], { y: 0 });
  }, []);

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
      <UserPanel setDashboardView={handleDashboardView} index={dashboardView} />
      <QuizList list={JSON.parse(quizList)} />
      <Settings />
      <Inbox messages={messages} />
    </div>
  );
};

export const getServerSideProps = connectToDb(async context => {
  const session = await getSession({ req: context.req });

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

  return {
    props: {
      messages: JSON.stringify(existingUser.inbox),
      quizList: JSON.stringify(existingUser.quizes),
    },
  };
});

export default Dashboard;
