import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEnvelopeOpen,
  faTrashAlt,
  faRedo,
  faKiwiBird,
} from "@fortawesome/free-solid-svg-icons";

import Button from "components/Button";
import Container from "components/Dashboard/Container";
import PopUp from "components/PopUp";

const Inbox = ({
  messages,
  fetchInbox,
  deleteInbox,
  error,
  clearError = () => {},
}) => {
  const renderMessages = () => {
    // if inbox is empty
    if (!messages.length) {
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

    // render messages
    return messages.map(({ username, result, quizName, isRead }, index) => (
      <div key={index} className={styles.message}>
        <span className={styles.info}>
          <FontAwesomeIcon icon={isRead ? faEnvelopeOpen : faEnvelope} />
        </span>
        <p className={styles.body}>
          <span>{username}</span> has solved Your quiz: <span>{quizName}</span>
        </p>
        <span className={styles.info}>{result}%</span>
      </div>
    ));
  };

  return (
    <Container title="Inbox" light>
      {error && (
        <PopUp onClose={clearError} error>
          {error}
        </PopUp>
      )}

      <div className={styles.menu}>
        <Button size="small" onClick={fetchInbox}>
          <FontAwesomeIcon icon={faRedo} /> Refresh
        </Button>
        <Button
          size="small"
          onClick={deleteInbox}
          disabled={!messages.length}
          danger
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Delete all
        </Button>
      </div>
      <div className={styles.inbox}>{renderMessages()}</div>
    </Container>
  );
};

export default Inbox;
