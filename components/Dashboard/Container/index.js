import styles from "./index.module.scss";

const Container = ({ children, light, title }) => {
  return (
    <div
      className={styles.container}
      style={{ background: light ? "white" : "" }}
    >
      <h3 className={[styles.title, light ? styles.titleLight : ""].join(" ")}>
        {title}
      </h3>
      {children}
    </div>
  );
};

export default Container;
