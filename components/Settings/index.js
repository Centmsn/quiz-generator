import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

import Button from "components/Button";
import Checkbox from "components/Checkbox";

const Settings = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Settings</h2>

      <section className={styles.settingsSection}>
        Switch between dark / light mode
        <Checkbox label="Darkmode" />
      </section>

      <section className={styles.settingsSection}>
        Switch between dark / light mode
        <Checkbox label="cokolwiek" />
      </section>
    </div>
  );
};

export default Settings;
