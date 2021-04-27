import styles from "./index.module.scss";

import PropTypes from "prop-types";

/**
 * Functional React component - renders loading spinner
 * @returns {JSX.Element}
 */
const Spinner = ({ text = "", overlay = false }) => {
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.spinner}></div>
    </>
  );
};

export default Spinner;
