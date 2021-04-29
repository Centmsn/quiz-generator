import styles from "./index.module.scss";
import { signIn } from "next-auth/client";
import { useState } from "react";

import Button from "components/Button";
import Spinner from "components/Spinner";
import { useHttpRequest } from "hooks/useHttpRequest";

const Navigation = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { loading, error, sendRequest } = useHttpRequest();

  const handleSignIn = async () => {
    await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: userPassword,
    });
  };

  const handleSignup = async () => {
    await sendRequest(
      "/api/auth/signup",
      "POST",
      JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
      {
        "Content-Type": "application/json",
      }
    );

    handleSignIn();
  };

  return (
    <div className={styles.loginContainer}>
      {loading && <Spinner overlay />}

      <h2 className={styles.title}>Login</h2>

      <section>
        <label className={styles.label}>
          Email
          <input
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
            type="email"
          />
        </label>

        <label className={styles.label}>
          Password
          <input
            value={userPassword}
            onChange={e => setUserPassword(e.target.value)}
            type="password"
          />
        </label>
      </section>

      <Button onClick={handleSignIn}>Login</Button>
      <Button onClick={() => signIn("google")} important>
        Login with Google
      </Button>
      <span className={styles.span}>or</span>
      <Button onClick={handleSignup}>Signup</Button>
    </div>
  );
};

export default Navigation;
