import styles from "./index.module.scss";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import AnswerForm from "components/NewQuiz/AnswerForm";
import Button from "components/Button";
import PopUp from "components/PopUp";
import Spinner from "components/Spinner";
import QuizModel from "models/quiz";
import QuizContext from "context/QuizContext";
import QuestionForm from "components/NewQuiz/QuestionForm";
import QuizSettingsForm from "components/NewQuiz/QuizSettingsForm";
import { connectToDb } from "utils/connectToDb";
import { useHttpRequest } from "hooks/useHttpRequest";
import { validateString } from "utils/validateString";

const INITIAL_ANSWERS = {
  0: "",
  1: "",
  2: "",
  3: "",
};

const newQuiz = ({ quizToEdit = null }) => {
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
    setStoreValue,
  } = useContext(QuizContext);
  const { loading, error, sendRequest, clearError } = useHttpRequest();

  const router = useRouter();

  // if quizToEdit is not falsy - enter edit mode
  useEffect(() => {
    if (quizToEdit) {
      const quiz = JSON.parse(quizToEdit);
      // set initial values
      setAnswers(quiz.questions[0].answers);
      setQuestion(quiz.questions[0].question);

      // replace current store value with quizToEdit object
      setStoreValue(quiz);
    }
  }, []);

  // if not in edit mode - reset quiz context store
  useEffect(() => {
    if (!quizToEdit) {
      reset();
    }
  }, []);

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
    // ! quiz is parsed 3 times
    let quizId = null;
    if (quizToEdit) {
      quizId = JSON.parse(quizToEdit)._id;
    }

    // method and url depends on current mode - edit or add quiz
    const path = quizId ? `/api/editquiz/${quizId}` : "/api/addquiz";
    const method = quizId ? "PATCH" : "POST";

    const response = await sendRequest(
      path,
      method,
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
          // disabled={!questions.length}
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
          // !refactor
          title={quizToEdit && JSON.parse(quizToEdit).title}
        />
      )}
    </div>
  );
};

export const getServerSideProps = async context => {
  const { query } = context;

  if (!query.id) {
    return {
      props: {},
    };
  }

  // connect to db
  await connectToDb();

  const quiz = JSON.stringify(await QuizModel.findById(query.id));

  return {
    props: {
      quizToEdit: quiz,
    },
  };
};

export default newQuiz;
