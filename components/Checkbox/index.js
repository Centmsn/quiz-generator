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
  disabled = true,
  label = "",
}) => {
  const handleOnClick = () => {
    onClick(!isChecked);
  };

  return (
    <div>
      {label}
      <div
        onClick={handleOnClick}
        className={[styles.checkbox, disabled ? styles.disabled : ""].join(" ")}
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
