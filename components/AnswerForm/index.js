import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

/**
 * Letters to mark answers
 * @enum
 * @readonly
 */
const ANSWERS_LETTERS = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};

const AnswerForm = () => {
  const [isCorrect, setIsCorrect] = useState(0);

  const handleSetCorrectAnswer = index => {
    setIsCorrect(index);
  };

  const renderAnswerForms = () => {
    const answers = [];

    for (let i = 0; i < 4; i++) {
      const isAnswerCorrect = i === isCorrect;

      answers.push(
        <div className={styles.answerContainer}>
          <span className={styles.answerNumber}>{ANSWERS_LETTERS[i]}</span>
          <textarea type="text" className={styles.answerInput}></textarea>
          <span
            onClick={() => handleSetCorrectAnswer(i)}
            className={[
              isAnswerCorrect ? styles.correct : styles.incorrect,
              styles.toggleCorrectAnswer,
            ].join(" ")}
          >
            <FontAwesomeIcon icon={isAnswerCorrect ? faCheck : faTimes} />
          </span>
        </div>
      );
    }

    return answers;
  };

  return <div className={styles.container}>{renderAnswerForms()}</div>;
};

export default AnswerForm;
