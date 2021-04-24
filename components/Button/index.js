import styles from "./index.module.scss";
import PropTypes from "prop-types";

/**
 * Functional React component - renders button
 * @param {Object} props - React props
 * @returns {JSX.Element}
 */
const Button = ({
  children,
  onClick = () => {},
  danger = false,
  important = false,
  disabled = false,
  fontSize = "medium",
  size = "medium",
}) => {
  const handleOnClick = () => {
    onClick();
  };

  let font;
  if (fontSize === "small") font = "1.25rem";
  if (fontSize === "medium") font = "1.5rem";
  if (fontSize === "large") font = "1.75rem";

  let btnSize;

  if (size === "small") btnSize = "30%";
  if (size === "medium") btnSize = "60%";
  if (size === "large") btnSize = "75%";

  return (
    <button
      onClick={handleOnClick}
      className={[
        styles.button,
        danger ? styles.danger : "",
        important ? styles.important : "",
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
   * Marks the button as danger. Do not set important and danger to true concurrently
   */
  danger: PropTypes.bool,

  /**
   * Marks the button as important. Do not set important and danger to true concurrently
   */
  important: PropTypes.bool,

  /**
   * Marks the button as disabled. Can be set together with danger / important.
   */
  disabled: PropTypes.bool,

  /**
   * Button font size; Use "small" / "medium" / "large"
   */
  fontSize: PropTypes.oneOf(["small", "medium", "large"]),

  /**
   * Button size; Use "small" / "medium" / "large"
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Button;
