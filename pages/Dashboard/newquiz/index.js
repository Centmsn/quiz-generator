import styles from "./index.module.scss";

import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import QuizContext from "context/QuizContext";
import AnswerForm from "components/NewQuiz/AnswerForm";
import QuestionForm from "components/NewQuiz/QuestionForm";
import Button from "components/Button";
import QuizSettingsForm from "components/NewQuiz/QuizSettingsForm";
import Spinner from "components/Spinner";
import PopUp from "components/PopUp";
import { useHttpRequest } from "hooks/useHttpRequest";
import { validateString } from "utils/validateString";

const INITIAL_ANSWERS = {
  0: "",
  1: "",
  2: "",
  3: "",
};

const newQuiz = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [correct, setCorrect] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    questions,
    current,
    timeControl,
    isPublic,
    reset,
    manageQuestion,
    setCurrentQuestion,
    toggleIsPublic,
  } = useContext(QuizContext);
  const { loading, error, sendRequest, clearError } = useHttpRequest();

  const router = useRouter();

  const handleQuestion = () => {
    const questionObject = {
      answers,
      question,
      correct,
    };

    // if current question is not last question
    if (current !== questions.length) {
      manageQuestion(questionObject, current);
      return;
    }

    setCurrentQuestion(questions.length + 1);

    // add question
    manageQuestion(questionObject);

    //reset forms after the question is submitted
    setAnswers(INITIAL_ANSWERS);
    setQuestion("");
    setCorrect(0);
  };

  const handleFillForms = index => {
    if (index < 0 || index > questions.length) {
      return;
    }
    setCurrentQuestion(index);

    // fill question and answer forms
    const answers = questions[index]?.answers || INITIAL_ANSWERS;

    setAnswers(answers);
    setCorrect(questions[index]?.correct || 0);
    setQuestion(questions[index]?.question || "");
  };

  const handleSetCorrect = index => {
    setCorrect(index);
  };

  const handleSetQuestion = value => {
    setQuestion(value);
  };

  const handleSetAnswer = (value, index) => {
    setAnswers(prev => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleToggleModal = () => {
    setIsModalVisible(prev => !prev);
  };

  const handleAddQuiz = async title => {
    const response = await sendRequest(
      "/api/addquiz",
      "POST",
      JSON.stringify({
        title,
        isPublic,
        timeControl: {
          limit: timeControl.limit * 60,
          limitType: timeControl.limitType,
        },
        questions,
      }),
      {
        "Content-Type": "application/json",
      }
    );

    if (!response) return;

    router.replace("/Dashboard");
    // resets questions form
    reset();
  };

  // add question btn is disabled if validation failed
  const addBtnDisabled = !(
    validateString(question, { trim: true, minLength: 5 }) &&
    validateString(Object.values(answers), {
      minLength: 1,
      trim: true,
    })
  );

  // update btn is disabled when nothing has changed
  const updateBtnDisabled =
    (question === questions[current]?.question &&
      answers[0] === questions[current]?.answers[0] &&
      answers[1] === questions[current]?.answers[1] &&
      answers[2] === questions[current]?.answers[2] &&
      answers[3] === questions[current]?.answers[3] &&
      correct === questions[current]?.correct) ||
    addBtnDisabled;

  return (
    <div className={styles.container}>
      {error && (
        <PopUp onClose={clearError} error>
          {error}
        </PopUp>
      )}

      {loading && <Spinner overlay />}
      <Link href="/Dashboard">
        <a className={styles.closeBtn}>
          <FontAwesomeIcon icon={faTimes} />
        </a>
      </Link>

      <div className={styles.questionNumber}>
        Question number: {current + 1}
      </div>
      <QuestionForm value={question} setQuestion={handleSetQuestion} />
      <AnswerForm
        isCorrect={correct}
        value={answers}
        setQuestion={handleSetAnswer}
        setCorrect={handleSetCorrect}
      />

      <div className={styles.btnContainer}>
        <Button
          size="xsmall"
          onClick={() => handleFillForms(current - 1)}
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
          danger
          onClick={handleToggleModal}
          disabled={!questions.length}
        >
          Finish
        </Button>

        <Button
          size="xsmall"
          onClick={() => handleFillForms(current + 1)}
          disabled={current + 1 > questions.length}
        >
          Next <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>

      {isModalVisible && (
        <QuizSettingsForm
          closeModal={handleToggleModal}
          addQuiz={handleAddQuiz}
          isPublic={isPublic}
          toggleIsPublic={toggleIsPublic}
        />
      )}
    </div>
  );
};

export default newQuiz;
