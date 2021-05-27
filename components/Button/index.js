import styles from "./index.module.scss";
import PropTypes from "prop-types";

/**
 * enum for button size
 * @enum
 * @readonly
 */
const BUTTON_SIZE_ENUM = {
  xsmall: "15%",
  small: "30%",
  medium: "60%",
  large: "75%",
  xlarge: "90%",
};

/**
 * enum for button font size
 * @enum
 * @readonly
 */
const BUTTON_FONT_SIZE_ENUM = {
  small: "1.25rem",
  medium: "1.5rem",
  large: "1.75rem",
};

/**
 * Functional React component - renders button
 * @param {Object} props - React props
 * @returns {JSX.Element}
 */
const Button = ({
  children,
  onClick = () => {},
  disabled = false,
  style = 0,
  fontSize = "medium",
  size = "medium",
}) => {
  const handleOnClick = e => {
    if (disabled) return;

    // event is passed to the callback function
    onClick(e);
  };

  // button size
  const font =
    BUTTON_FONT_SIZE_ENUM[fontSize] || BUTTON_FONT_SIZE_ENUM["medium"];
  // button text size
  const btnSize = BUTTON_SIZE_ENUM[size] || BUTTON_SIZE_ENUM["medium"];

  return (
    <button
      onClick={handleOnClick}
      className={[
        styles.button,
        styles[style],
        disabled ? styles.disabled : "",
      ].join(" ")}
      style={{
        fontSize: font,
        flexBasis: btnSize,
      }}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

Button.propTypes = {
  /**
   * Text displayed inside the button
   */
  text: PropTypes.string,

  /**
   * Function - called on every button click
   */
  onClick: PropTypes.func,

  /**
   * Button style
   */
  style: PropTypes.oneOf(["primary", "danger", "important", "confirm"]),

  /**
   * Marks the button as disabled. Can be set together with danger / important.
   */
  disabled: PropTypes.bool,

  /**
   * Button font size; Use "small" | "medium" | "large"
   */
  fontSize: PropTypes.oneOf(["small", "medium", "large"]),

  /**
   * Button size; Use "xsmall" | "small" | "medium" | "large | "xlarge"
   */
  size: PropTypes.oneOf(["xsmall", "small", "medium", "large", "xlarge"]),
};

export default Button;
