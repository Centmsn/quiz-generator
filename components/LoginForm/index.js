import styles from "./index.module.scss";
import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect, useState } from "react";

import Button from "../Button";

const Navigation = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [session, loading] = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const handleSignIn = async () => {
    await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: userPassword,
    });
  };

  const handleSignup = async () => {
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className={styles.loginContainer}>
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
      <Button onClick={handleSignup} danger>
        Signup
      </Button>
    </div>
  );
};

export default Navigation;
