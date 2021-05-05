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

const UserPanel = ({ setDashboardView }) => {
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

      <Button onClick={() => setDashboardView(1)}>
        <FontAwesomeIcon icon={faList} /> Quiz list
      </Button>

      <Button onClick={() => setDashboardView(2)}>
        <FontAwesomeIcon icon={faCog} /> Settings
      </Button>

      <Button onClick={() => setDashboardView(3)}>
        <FontAwesomeIcon icon={faInbox} /> Inbox
      </Button>

      <Button onClick={signout} danger>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </Button>
    </div>
  );
};

export default UserPanel;
