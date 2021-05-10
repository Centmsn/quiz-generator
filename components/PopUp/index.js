import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * Functional react component - renders popup
 * @param {object} props - react props
 * @returns {JSX.Element}
 */
const PopUp = ({ children, error, important, onClose = () => {} }) => {
  return (
    <div
      className={[
        styles.container,
        error ? styles.error : "",
        important ? styles.important : "",
      ].join(" ")}
    >
      <button className={styles.closeBtn} onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      {children}
    </div>
  );
};

PopUp.propTypes = {
  /**
   * Popup looks like error alert
   */
  error: PropTypes.bool,

  /**
   * Popup style is changed to be more visible
   */
  important: PropTypes.bool,

  /**
   * Function which is triggered on close button click
   */
  onClose: PropTypes.bool.isRequired,
};

export default PopUp;
