import styles from "./index.module.scss";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";

/**
 * Functional react component - renders checkbox
 * @param {object} - react props
 * @returns {JSX.Element}
 */
const Checkbox = ({
  isChecked = false,
  onClick = () => {},
  disabled = false,
  label = "",
}) => {
  const handleChange = e => {
    if (disabled) return;

    if (e.keyCode && ![13, 32].includes(e.keyCode)) return;
    onClick(!isChecked);
  };

  return (
    <div className={styles.checkboxContainer}>
      <span>{label}</span>
      <div
        onClick={handleChange}
        onKeyDown={handleChange}
        className={[
          styles.checkbox,
          disabled ? styles.disabled : "",
          isChecked ? styles.checked : "",
        ].join(" ")}
        tabIndex="0"
      >
        <FontAwesomeIcon icon={isChecked ? faCheck : faTimes} />
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  /**
   * Checkbox value - used to determinate whether is checked or not
   */
  isChecked: PropTypes.bool.isRequired,

  /**
   * Function which is called on every click - true/false will be passed as an argument
   */
  onClick: PropTypes.func.isRequired,

  /**
   * If set to true - clicking does not trigger callback function
   */
  disabled: PropTypes.bool,

  /**
   * Checkbox description
   */
  label: PropTypes.string,
};

export default Checkbox;
