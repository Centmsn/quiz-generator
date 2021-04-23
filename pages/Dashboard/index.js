import { signout, getSession } from "next-auth/client";

import Button from "../../components/Button";
import UserPanel from "../../components/UserPanel";
import QuizList from "../../components/QuizList";

const Dashboard = () => {
  return <Button onClick={signout}>Logout</Button>;
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
