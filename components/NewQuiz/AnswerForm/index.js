import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { LETTER_ENUM } from "consts";

const AnswerForm = ({ value, setQuestion, setCorrect }) => {
  const [isCorrect, setIsCorrect] = useState(0);

  const handleSetCorrectAnswer = index => {
    setIsCorrect(index);
    setCorrect(index);
  };

  const handleSetQuestion = (e, index) => {
    setQuestion(e.target.value, index);
  };

  const renderAnswerForms = () => {
    const answers = [];

    for (let i = 0; i < 4; i++) {
      const isAnswerCorrect = i === isCorrect;

      answers.push(
        <div className={styles.answerContainer} key={i}>
          <span className={styles.answerNumber}>{LETTER_ENUM[i]}</span>
          <textarea
            type="text"
            className={styles.answerInput}
            value={value[i]}
            onChange={e => handleSetQuestion(e, i)}
          ></textarea>
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
