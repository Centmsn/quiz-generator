import styles from "./index.module.scss";

import { signout } from "next-auth/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faList,
  faCog,
  faSignOutAlt,
  faInbox,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import Button from "components/Button";

const UserPanel = ({ setDashboardView, index, unreadMessages }) => {
  return (
    <div className={styles.container}>
      <h2
        className={styles.title}
        onClick={() => {
          setDashboardView(1);
        }}
      >
        Dashboard
      </h2>

      <Link href="/Dashboard/newquiz">
        <a style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button fontSize="large" style="primary" size="large">
            <FontAwesomeIcon icon={faPlus} /> New Quiz
          </Button>
        </a>
      </Link>

      <Button
        onClick={() => setDashboardView(4)}
        disabled={index === 4}
        size="large"
      >
        <FontAwesomeIcon icon={faListAlt} /> Public quizes
      </Button>

      <Button
        onClick={() => setDashboardView(1)}
        disabled={index === 1}
        size="large"
      >
        <FontAwesomeIcon icon={faList} /> Your quizes
      </Button>

      <Button
        onClick={() => setDashboardView(2)}
        disabled={index === 2}
        size="large"
      >
        <FontAwesomeIcon icon={faCog} /> Settings
      </Button>

      <Button
        onClick={() => setDashboardView(3)}
        disabled={index === 3}
        size="large"
      >
        <FontAwesomeIcon icon={faInbox} /> Inbox{" "}
        {unreadMessages > 0 && (
          <span className={styles.test}>{unreadMessages}</span>
        )}
      </Button>

      <Button onClick={signout} style="danger" size="medium">
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout{" "}
      </Button>
    </div>
  );
};

export default UserPanel;
