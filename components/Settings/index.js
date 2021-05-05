import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";

import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Radio from "components/Radio";

const Settings = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Settings</h2>

      <section
        className={[styles.settingsSection, styles.temporaryImportant].join(
          " "
        )}
      >
        <h3>Settings will be available soon. Sorry for the inconvenience.</h3>
      </section>

      <section className={styles.settingsSection}>
        <p>Switch between dark / light mode</p>
        <Checkbox label="Darkmode" disabled />
      </section>

      <section className={styles.settingsSection}>
        <p>
          You will receive message after one of Your quizes has been solved.
          Result will be included
        </p>
        <Checkbox label="Feedback" disabled />
      </section>

      <section className={styles.settingsSection}>
        <p>Adjust font size to Your needs</p>
        <Radio label="small" disabled />
        <Radio label="medium" disabled />
        <Radio label="large" disabled />
      </section>
    </div>
  );
};

export default Settings;
