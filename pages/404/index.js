import styles from "./404.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import Button from "components/Button";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        404 Not found <FontAwesomeIcon icon={faSadTear} />
      </h1>

      <h3 className={styles.subTitle}>
        Button below will take You to the home page
      </h3>
      <Link href="/">
        <a>
          <Button size="small">Home</Button>
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
