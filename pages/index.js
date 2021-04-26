import styles from "./index.module.scss";
import { useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import LoginForm from "../components/LoginForm";
import AppHeader from "../components/AppHeader";

const Home = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/Dashboard");
    }
  }, [session]);

  return (
    <div className={styles.container}>
      <AppHeader />
      <LoginForm />
    </div>
  );
};

export default Home;
