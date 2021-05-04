import styles from "./index.module.scss";

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
  const handleOnClick = () => {
    if (disabled) return;
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
        onClick={handleOnClick}
        tabIndex="0"
      ></div>
    </div>
  );
};

export default Radio;
