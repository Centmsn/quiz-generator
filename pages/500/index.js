import styles from "./500.module.scss";

import Link from "next/link";

import Button from "components/Button";

const InternalServerError = () => {
  return (
    <div className={styles.container}>
      <h1>500 internal server error</h1>
      <h3>Something went really wrong...</h3>
      <Link href="/">
        <a>
          <Button danger>Take me back to home page</Button>
        </a>
      </Link>
    </div>
  );
};

export default InternalServerError;
