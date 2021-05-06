import styles from "./index.module.scss";

import Button from "components/Button";
import { useState } from "react";

const UsernameForm = ({ startQuiz }) => {
  const [username, setUsername] = useState("");

  const handleChangeUsername = e => {
    setUsername(e.target.value);
  };

  const handleStartQuiz = e => {
    e.preventDefault();

    startQuiz(username.trim());
  };

  const isValidName = username.trim().length >= 2;

  return (
    <div className={styles.modal}>
      <form className={styles.form}>
        <h1>Enter Your name</h1>
        <input
          onChange={handleChangeUsername}
          value={username}
          maxLength={25}
        />

        <span
          className={styles.tooltip}
          style={{ opacity: username && !isValidName ? 1 : 0 }}
        >
          Name must contain atleast 2 characters
        </span>

        <Button onClick={handleStartQuiz} important disabled={!isValidName}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UsernameForm;
