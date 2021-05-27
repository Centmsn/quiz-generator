import styles from "./index.module.scss";

import PropTypes from "prop-types";

/**
 * Functional react component - renders radio input
 * @param {object} props - react props
 * @returns
 */
const Radio = ({
  label = "",
  onClick = () => {},
  active = false,
  value = null,
  disabled = false,
}) => {
  const handleChange = e => {
    // do not execute callback if active or disabled
    if (disabled || active) return;

    if (e.keyCode && ![13, 32].includes(e.keyCode)) return;

    onClick(value);
  };

  return (
    <div className={styles.radioContainer}>
      <span>{label}</span>
      <div
        className={[
          styles.radio,
          disabled ? styles.disabled : "",
          active ? styles.active : "",
        ].join(" ")}
        onClick={handleChange}
        onKeyDown={handleChange}
        tabIndex="0"
      ></div>
    </div>
  );
};

Radio.propTypes = {
  /**
   * Radio description
   */
  label: PropTypes.string,

  /**
   * Callback function which is triggered on click
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Radio will be displayed as active
   */
  active: PropTypes.bool.isRequired,

  /**
   * Value which is passed to the callback function as an argument
   */
  value: PropTypes.any.isRequired,

  /**
   * Radio will be displayed as disabled, callback function will not be triggered
   */
  disabled: PropTypes.bool,
};

export default Radio;
