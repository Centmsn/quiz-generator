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
}) => {
  const handleOnClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleOnClick}
      className={`${styles.button} ${danger ? styles.danger : ""} ${
        important ? styles.important : ""
      }`}
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
};

export default Button;
