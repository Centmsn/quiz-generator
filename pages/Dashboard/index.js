import styles from "./index.module.scss";

// backend
import { connectToDb } from "utils/connectToDb";
import User from "models/user";
import Quiz from "models/quiz";
// frontend
import gsap from "gsap";
import { getSession, useSession } from "next-auth/client";
import { useState, useRef, useEffect } from "react";

import Inbox from "components/Dashboard/Inbox";
import PublicQuizList from "components/Dashboard/PublicQuizList";
import Settings from "components/Dashboard/Settings";
import Spinner from "components/Spinner";
import UserPanel from "components/Dashboard/UserPanel";
import QuizList from "components/Dashboard/QuizList";
import { useThrottle } from "hooks/useThrottle";
import { useHttpRequest } from "hooks/useHttpRequest";
import { getRandomElements } from "utils/getRandomElements";

const Dashboard = ({
  quizList = [],
  messages = [],
  unreadMessages = 0,
  publicQuizes = [],
}) => {
  const [dashboardView, setDashboardView] = useState(1);
  const [localMessages, setLocalMessages] = useState(JSON.parse(messages));
  const [unread, setUnread] = useState(unreadMessages);
  const containerRef = useRef(0);
  const [session] = useSession();
  const { throttle } = useThrottle();
  const { sendRequest, loading, error, clearError } = useHttpRequest();

  useEffect(() => {
    gsap.set(containerRef.current.children[1], { y: 0 });
  }, []);

  useEffect(() => {
    if (!session) return;

    if (dashboardView === 3 && unread > 0) {
      sendRequest("/api/msg/read", "PATCH");

      // set unread messages to null
      setUnread(0);
    }
  }, [dashboardView]);

  // fetch all user messages
  const fetchInbox = async () => {
    const data = await sendRequest("/api/msg");

    if (!data) {
      return;
    }

    setLocalMessages(data.content);
  };

  const deleteInbox = async () => {
    const response = await sendRequest("/api/msg/delete");

    if (!response) return;

    setLocalMessages([]);
  };

  const handleDashboardView = throttle(index => {
    //if this component is already visible
    if (index === dashboardView) return;

    setDashboardView(index);

    const container = containerRef.current.children;
    // removes from the array index which is currently visible
    const hiddenComponents = [1, 2, 3, 4].filter(el => el !== dashboardView);

    // move invisible components to the bottom of the screen
    gsap.set(container[hiddenComponents[0]], { y: "100vh" });
    gsap.set(container[hiddenComponents[1]], { y: "100vh" });
    gsap.set(container[hiddenComponents[2]], { y: "100vh" });

    // show clicked component
    gsap.to(container[index], { y: 0 });
    // hide current component
    gsap.to(container[dashboardView], { y: "-100vh" });
  }, 500);

  return (
    <div className={styles.container} ref={containerRef}>
      {loading && <Spinner text="loading..." overlay />}
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
        error={error}
        clearError={clearError}
      />
      <PublicQuizList publicQuizList={JSON.parse(publicQuizes)} />
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

  if (!existingUser) {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }

  //! fetches all public quizes - might be inefficient for greater numbers
  const publicQuizList = await Quiz.find({ isPublic: true }).select(["title"]);
  const randomPublicQuizes = JSON.stringify(
    getRandomElements(publicQuizList, 10)
  );

  const quizList = JSON.stringify(existingUser.quizes);
  const messages = existingUser.inbox;

  const unreadMessages = JSON.stringify(
    [...messages.filter(msg => !msg.isRead)].length
  );

  return {
    props: {
      messages: JSON.stringify(messages),
      publicQuizes: randomPublicQuizes,
      unreadMessages,
      quizList,
    },
  };
};

export default Dashboard;
