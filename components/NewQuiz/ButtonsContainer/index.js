import styles from "./index.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";

import Button from "components/Button";
import QuizContext from "context/QuizContext";
import { validateString } from "utils/validateString";

const ButtonsContainer = ({
  fillForms,
  handleQuestion,
  handleModal,
  currentQuestion,
  currentAnswers,
  correctAnswer,
}) => {
  const { questions, current } = useContext(QuizContext);

  // add question btn is disabled if validation failed
  const addBtnDisabled = !(
    validateString(currentQuestion, { trim: true, minLength: 5 }) &&
    validateString(Object.values(currentAnswers), {
      minLength: 1,
      trim: true,
    })
  );

  // update btn is disabled when nothing has changed
  const updateBtnDisabled =
    (currentQuestion === questions[current]?.question &&
      currentAnswers[0] === questions[current]?.answers[0] &&
      currentAnswers[1] === questions[current]?.answers[1] &&
      currentAnswers[2] === questions[current]?.answers[2] &&
      currentAnswers[3] === questions[current]?.answers[3] &&
      correctAnswer === questions[current]?.correct) ||
    addBtnDisabled;

  return (
    <div className={styles.btnContainer}>
      <Button
        size="xsmall"
        onClick={() => fillForms(current - 1)}
        disabled={current - 1 < 0}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Previous
      </Button>

      <Button
        size="small"
        onClick={handleQuestion}
        disabled={
          current === questions.length ? addBtnDisabled : updateBtnDisabled
        }
      >
        {current === questions.length ? "Add question" : "Update question"}
      </Button>

      <Button
        size="small"
        style="primary"
        onClick={handleModal}
        disabled={!questions.length}
      >
        Finish
      </Button>

      <Button
        size="xsmall"
        onClick={() => fillForms(current + 1)}
        disabled={current + 1 > questions.length}
      >
        Next <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
};

export default ButtonsContainer;
