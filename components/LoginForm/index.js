import styles from "./index.module.scss";
import { signIn } from "next-auth/client";
import { useState } from "react";

import Button from "components/Button";
import Spinner from "components/Spinner";
import { useHttpRequest } from "hooks/useHttpRequest";

// ! refactor required
const Navigation = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const { loading, error, sendRequest, clearError } = useHttpRequest();

  const handleSignIn = async () => {
    clearError();
    const response = await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: userPassword,
    });

    //! refactor error displaying
    if (response.error) {
      setLoginError(response.error);
    }
  };

  const handleEmailChange = e => {
    setUserEmail(e.target.value);

    if (error || loginError) {
      clearError();
      setLoginError(null);
    }
  };

  const handlePasswordChange = e => {
    setUserPassword(e.target.value);

    if (error || loginError) {
      clearError();
      setLoginError(null);
    }
  };

  const handleSignup = async () => {
    setLoginError(null);
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

    await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: userPassword,
    });
  };

  const isLoginDisabled = !userEmail || userPassword.length < 6;

  return (
    <div className={styles.loginContainer}>
      {loading && <Spinner overlay />}

      <h2 className={styles.title}>Login</h2>

      <span
        className={[
          styles.tooltip,
          error || loginError ? "" : styles.tooltipHidden,
        ].join(" ")}
      >
        Error: {error} {loginError}
      </span>

      <section>
        <label className={styles.label}>
          Email
          <input value={userEmail} onChange={handleEmailChange} type="email" />
        </label>

        <label className={styles.label}>
          Password
          <input
            value={userPassword}
            onChange={handlePasswordChange}
            type="password"
          />
        </label>
      </section>

      <Button onClick={handleSignIn} disabled={isLoginDisabled}>
        Login
      </Button>
      <Button onClick={() => signIn("google")} important>
        Login with Google
      </Button>
      <span className={styles.span}>or</span>
      <Button onClick={handleSignup} disabled={isLoginDisabled}>
        Signup
      </Button>
    </div>
  );
};

export default Navigation;
