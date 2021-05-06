import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import Container from "components/Dashboard/Container";

const Inbox = ({ messages }) => {
  const parsedMessaged = JSON.parse(messages);

  const renderMessages = () => {
    return parsedMessaged.map(({ username, result, quizName }, index) => (
      <div key={index} className={styles.message}>
        <span className={styles.info}>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <p className={styles.title}>
          <span>{username}</span> has solved Your quiz: <span>{quizName}</span>
        </p>
        <span className={styles.info}>{result}%</span>
      </div>
    ));
  };

  return (
    <Container title="Inbox" light>
      <div className={styles.inbox}>{renderMessages()}</div>
    </Container>
  );
};

export default Inbox;
