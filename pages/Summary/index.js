import styles from "./index.module.scss";

import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRedo,
  faAlignCenter,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useContext, useState, useRef } from "react";

import GameContext from "context/GameContext";
import Button from "components/Button";
import QuizDetails from "components/QuizDetails";

const Summary = () => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [session, loading] = useSession();
  const { summary, correctAnswers, username } = useContext(GameContext);
  const navRef = useRef(null);
  const summaryRef = useRef(null);
  const containerRef = useRef(null);

  const router = useRouter();

  const handleShowDetails = () => {
    const summary = summaryRef.current;
    const nav = navRef.current;

    setTimeout(() => {
      setIsDetailsVisible(prev => !prev);
    }, 300);

    if (!isDetailsVisible) {
      gsap.to(summary, {
        y: "-50vh",
      });

      gsap.to(nav, {
        y: "-48vh",
      });

      return;
    }

    gsap.to(containerRef.current.lastChild, { y: "100vh" });
    gsap.to(nav, { y: 0 });
    gsap.to(summary, { y: 0 });
  };

  const result = Math.floor((correctAnswers / router.query.length) * 100);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.summary} ref={summaryRef}>
        <h1 className={styles.title}>Quick summary for {username}</h1>
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
        <Link href={session ? "/Dashboard" : "/"}>
          <a>
            <Button danger>
              <FontAwesomeIcon icon={faHome} /> Home page
            </Button>
          </a>
        </Link>
      </div>

      {isDetailsVisible && <QuizDetails details={summary} />}
    </div>
  );
};

export default Summary;
