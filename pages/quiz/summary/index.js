import styles from "./index.module.scss";

import Link from "next/link";

import Button from "../../../components/Button";

const Summary = () => {
  return (
    <div>
      Quiz summary
      <Link href="">
        <a>
          <Button>Play again</Button>
        </a>
      </Link>
      <Link href="/">
        <a>
          <Button>Home page</Button>
        </a>
      </Link>
    </div>
  );
};

export default Summary;
