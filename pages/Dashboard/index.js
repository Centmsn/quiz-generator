import styles from "./index.module.scss";

// backend
import { connectToDb } from "utils/connectToDb";
import User from "models/user";
// frontend
import gsap from "gsap";
import { getSession, useSession } from "next-auth/client";
import { useState, useRef, useEffect } from "react";

import Settings from "components/Dashboard/Settings";
import UserPanel from "components/Dashboard/UserPanel";
import QuizList from "components/Dashboard/QuizList";
import Inbox from "components/Dashboard/Inbox";
import Spinner from "components/Spinner";
import { useThrottle } from "hooks/useThrottle";
import { useHttpRequest } from "hooks/useHttpRequest";

const Dashboard = ({ quizList, messages = [], unreadMessages = 0 }) => {
  const [dashboardView, setDashboardView] = useState(1);
  const [localMessages, setLocalMessages] = useState(JSON.parse(messages));
  const [unread, setUnread] = useState(unreadMessages);
  const containerRef = useRef(null);
  const [session] = useSession();
  const { throttle } = useThrottle();
  const { sendRequest, loading } = useHttpRequest();

  useEffect(() => {
    gsap.set(containerRef.current.children[1], { y: 0 });
  }, []);

  useEffect(() => {
    if (!session) return;

    if (dashboardView === 3 && unreadMessages > 0) {
      //! refactor to http hook
      fetch("/api/msg/read", {
        method: "PATCH",
      });

      // set unread messages to null
      setUnread(null);
    }
  }, [dashboardView]);

  // fetch all user messages
  const fetchInbox = async () => {
    const data = await sendRequest("/api/msg");

    setLocalMessages(data.content);
  };

  const deleteInbox = async () => {
    //! add erro handling
    await sendRequest("/api/msg/delete");

    //TODO if no error
    setLocalMessages([]);
  };

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
      {loading && <Spinner overlay />}
      <UserPanel
        setDashboardView={handleDashboardView}
        index={dashboardView}
        unreadMessages={unread}
      />
      <QuizList list={JSON.parse(quizList)} />
      <Settings />
      <Inbox
        messages={localMessages}
        fetchInbox={fetchInbox}
        deleteInbox={deleteInbox}
      />
    </div>
  );
};

export const getServerSideProps = async context => {
  // connect to db
  await connectToDb();

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
};

export default Dashboard;
