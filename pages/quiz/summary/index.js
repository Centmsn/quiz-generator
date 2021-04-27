import styles from "./index.module.scss";

import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import GameContext from "../../../context/GameContext";

import Button from "../../../components/Button";

const Summary = () => {
  const { summary, correctAnswers, resetStore } = useContext(GameContext);
  const router = useRouter();

  //reset game context when on component unmount
  useEffect(() => {
    return () => {
      resetStore();
    };
  });

  return (
    <div>
      <div>
        <p>
          {correctAnswers} of {router.query.length}
        </p>
      </div>
      <Link href={`/Quiz/${router.query.id}`}>
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
