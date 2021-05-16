import styles from "./index.module.scss";

import { useContext } from "react";

import Container from "components/Dashboard/Container";
import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import SettingsContext from "context/SettingsContext";

const Settings = () => {
  const { fontSize, darkmode, setFontSize, setDarkmode } =
    useContext(SettingsContext);

  const handleFontSize = value => {
    setFontSize(value);
  };

  const handleDarkmode = () => {
    setDarkmode(!darkmode);
  };

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
        <Checkbox
          label="Darkmode"
          isChecked={false}
          onClick={handleDarkmode}
          disabled
        />
      </section>

      <section className={styles.settingsSection}>
        <p>
          You will receive message after one of Your quizes has been solved.
          Result will be included
        </p>
        <Checkbox label="Feedback" onClick={() => {}} isChecked disabled />
      </section>

      <section className={styles.settingsSection}>
        <p>Adjust font size to Your needs</p>
        <Radio
          label="small"
          onClick={() => handleFontSize(1)}
          active={fontSize === 12}
          value={"placeholder"}
        />
        <Radio
          label="medium"
          onClick={() => handleFontSize(2)}
          active={fontSize === 16}
          value={"placeholder"}
        />
        <Radio
          label="large"
          onClick={() => handleFontSize(3)}
          active={fontSize === 20}
          value={"placeholder"}
        />
      </section>
    </Container>
  );
};

export default Settings;
