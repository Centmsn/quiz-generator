import styles from "./index.module.scss";

import LoginForm from "../components/LoginForm";
import AppHeader from "../components/AppHeader";

const Home = () => {
  return (
    <div className={styles.container}>
      <AppHeader />
      <LoginForm />
    </div>
  );
};

export default Home;
