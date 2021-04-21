import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faShareSquare } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.scss";

const AppHeader = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz generator</h1>
      <h2 className={styles.subtitle}>
        Create a quiz and challange Your friend!
      </h2>

      <section className={styles.instruction}>
        <div className={styles.box}>
          <span className={styles.box__number}>1.</span>
          <p className={styles.description}>Login or Signup</p>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faSignInAlt} />
          </span>
        </div>

        <div className={styles.box}>
          <span className={styles.box__number}>2.</span>
          <p className={styles.description}>Create a quiz</p>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </span>
        </div>

        <div className={styles.box}>
          <span className={styles.box__number}>3.</span>
          <p className={styles.description}>Share it with the world!</p>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faShareSquare} />
          </span>
        </div>
      </section>
    </div>
  );
};

export default AppHeader;
