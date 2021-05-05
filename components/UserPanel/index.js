import styles from "./index.module.scss";
import { signout } from "next-auth/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faList,
  faCog,
  faSignOutAlt,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import Button from "components/Button";

const UserPanel = ({ displaySettings, settingsVisible }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <Link href="Dashboard/newquiz">
        <a>
          <Button fontSize="large" important>
            <FontAwesomeIcon icon={faPlus} /> New Quiz
          </Button>
        </a>
      </Link>
      <Button onClick={displaySettings}>
        <FontAwesomeIcon icon={settingsVisible ? faList : faCog} />{" "}
        {settingsVisible ? "Quiz list" : "Settings"}
      </Button>

      <Button onClick={displaySettings} disabled>
        <FontAwesomeIcon icon={faInbox} /> Inbox
      </Button>

      <Button onClick={signout} danger>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </Button>
    </div>
  );
};

export default UserPanel;
