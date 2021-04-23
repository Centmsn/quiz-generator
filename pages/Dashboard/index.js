import styles from "./index.module.scss";

import { signout, getSession } from "next-auth/client";

import UserPanel from "../../components/UserPanel";
import QuizList from "../../components/QuizList";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <UserPanel />
      <QuizList />
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

  return {
    props: session,
  };
};

export default Dashboard;
