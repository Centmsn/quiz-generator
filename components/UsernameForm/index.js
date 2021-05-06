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
    startQuiz(username);
  };

  return (
    <div className={styles.modal}>
      <form className={styles.form}>
        <h1>What's Your name?</h1>
        <input onChange={handleChangeUsername} value={username} />
        <Button
          onClick={handleStartQuiz}
          important
          disabled={username.length < 2}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UsernameForm;
