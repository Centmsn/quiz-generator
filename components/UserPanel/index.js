import styles from "./index.module.scss";
import { signout } from "next-auth/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";

const UserPanel = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <Button fontSize="large" important>
        <FontAwesomeIcon icon={faPlus} /> New Quiz
      </Button>
      <Button>
        <FontAwesomeIcon icon={faCog} /> Settings
      </Button>
      <Button onClick={signout} danger>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </Button>
    </div>
  );
};

export default UserPanel;
