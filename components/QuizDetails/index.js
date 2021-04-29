import styles from "./index.module.scss";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const QuizDetails = ({ details }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.to(containerRef.current, { delay: 0, y: 0 });
  }, []);

  const rendersDetails = () => {
    return details.map((el, index) => {
      const correctClass = el.isCorrect ? styles.correct : "";

      return (
        <div key={index} className={styles.card}>
          <div className={[styles.number, correctClass].join(" ")}>
            {index + 1}
          </div>

          <div className={styles.questionContainer}>
            <h3 className={[styles.question, correctClass].join(" ")}>
              {el.question}
            </h3>

            <div className={styles.answer}>
              <p>
                <span>Correct answer</span> {el.correctAnswer}
              </p>
            </div>
            <div className={styles.answer}>
              <p>
                <span>Your answer</span> {el.userAnswer}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {rendersDetails()}
    </div>
  );
};

export default QuizDetails;
