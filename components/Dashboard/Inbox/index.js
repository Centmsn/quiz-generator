import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEnvelopeOpen,
  faKiwiBird,
} from "@fortawesome/free-solid-svg-icons";

import Container from "components/Dashboard/Container";

const Inbox = ({ messages }) => {
  const parsedMessages = JSON.parse(messages);

  const renderMessages = () => {
    if (!parsedMessages.length) {
      return (
        <div className={styles.tooltip}>
          <h3>Your mailbox is empty</h3>
          <p>Here is a Kiwi bird to compensate lack of messages</p>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faKiwiBird} />
          </span>
        </div>
      );
    }

    return parsedMessages.map(
      ({ username, result, quizName, isRead }, index) => (
        <div key={index} className={styles.message}>
          <span className={styles.info}>
            <FontAwesomeIcon icon={isRead ? faEnvelopeOpen : faEnvelope} />
          </span>
          <p className={styles.title}>
            <span>{username}</span> has solved Your quiz:{" "}
            <span>{quizName}</span>
          </p>
          <span className={styles.info}>{result}%</span>
        </div>
      )
    );
  };

  return (
    <Container title="Inbox" light>
      <div className={styles.inbox}>{renderMessages()}</div>
    </Container>
  );
};

export default Inbox;
