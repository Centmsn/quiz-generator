import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/GameContext";

import Button from "../../components/Button";

const Summary = () => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const { summary, correctAnswers, resetStore } = useContext(GameContext);
  const router = useRouter();

  //reset game context when on component unmount
  useEffect(() => {
    return () => {
      resetStore();
    };
  }, []);

  const result = Math.floor((correctAnswers / router.query.length) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <h1 className={styles.title}>Quiz summary</h1>
        <h2>Your result: {result}%</h2>
        <p>Questions total: {router.query.length}</p>
        <p>Correct answers: {correctAnswers}</p>
      </div>

      <div className={styles.buttonsContainer}>
        <Button important size="small">
          <FontAwesomeIcon icon={faAlignCenter} /> Show details
        </Button>
        <Link href={`/Quiz/${router.query.id}`}>
          <a>
            <Button>
              <FontAwesomeIcon icon={faRedo} /> Play again
            </Button>
          </a>
        </Link>
        <Link href="/">
          <a>
            <Button danger>
              <FontAwesomeIcon icon={faHome} /> Home page
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Summary;
