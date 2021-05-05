import styles from "./index.module.scss";

import Container from "components/Dashboard/Container";
import Checkbox from "components/Checkbox";
import Radio from "components/Radio";

const Settings = () => {
  return (
    <Container title="Settings">
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
    </Container>
  );
};

export default Settings;
