import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

import Button from "components/Button";
import Checkbox from "components/Checkbox";

const Settings = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Settings</h2>

      <div className={styles.settingsContainer}>
        <Checkbox label="Darkmode" />
      </div>
    </div>
  );
};

export default Settings;
