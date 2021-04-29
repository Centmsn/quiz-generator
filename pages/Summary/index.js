import styles from "./index.module.scss";

import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState, useRef } from "react";

import GameContext from "../../context/GameContext";
import Button from "../../components/Button";
import QuizDetails from "../../components/QuizDetails";

const Summary = () => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const { summary, correctAnswers, resetStore } = useContext(GameContext);
  const navRef = useRef(null);
  const summaryRef = useRef(null);
  const router = useRouter();

  //reset game context when on component unmount
  useEffect(() => {
    return () => {
      resetStore();
    };
  }, []);

  const handleShowDetails = () => {
    const summary = summaryRef.current;
    const nav = navRef.current;
    setIsDetailsVisible(prev => !prev);

    if (!isDetailsVisible) {
      gsap.to(summary, {
        y: "-50vh",
      });

      gsap.to(nav, {
        y: "-48vh",
      });

      return;
    }

    gsap.to(nav, { y: 0 });
    gsap.to(summary, { y: 0 });
  };

  const result = Math.floor((correctAnswers / router.query.length) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.summary} ref={summaryRef}>
        <h1 className={styles.title}>Quiz summary</h1>
        <h2>Your result: {result}%</h2>
        <p>Questions total: {router.query.length}</p>
        <p>Correct answers: {correctAnswers}</p>
      </div>

      <div className={styles.buttonsContainer} ref={navRef}>
        <Button important size="small" onClick={handleShowDetails}>
          <FontAwesomeIcon icon={faAlignCenter} />{" "}
          {isDetailsVisible ? "Hide details" : "Show details"}
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

      {isDetailsVisible && <QuizDetails />}
    </div>
  );
};

export default Summary;