import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Settings</h2>

      <h3 className={styles.temporaryTitle}>Site under construction</h3>
      <h3 className={styles.temporaryTitle}>Please be patient</h3>
      <h4 className={styles.temporaryTitle}>
        <FontAwesomeIcon icon={faTools} />
      </h4>
    </div>
  );
};

export default Settings;
