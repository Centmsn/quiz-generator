import styles from "./index.module.scss";

import { useContext, useState } from "react";
import { useRouter } from "next/router";

import QuizContext from "context/QuizContext";
import AnswerForm from "components/AnswerForm";
import QuestionForm from "components/QuestionForm";
import Button from "components/Button";
import QuizNameForm from "components/QuizNameForm";
import Spinner from "components/Spinner";
import { useHttpRequest } from "hooks/useHttpRequest";

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
  const { questions, addQuestion, reset } = useContext(QuizContext);
  const { loading, error, sendRequest } = useHttpRequest();

  const router = useRouter();

  const handleAddQuestion = () => {
    const questionObject = {
      answers,
      question,
      correct,
    };

    // add question
    addQuestion(questionObject);

    //reset forms after the question is submitted
    setAnswers(INITIAL_ANSWERS);
    setQuestion("");
    setCorrect(0);
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

  const handleAddQuiz = async name => {
    await sendRequest(
      "/api/addquiz",
      "POST",
      JSON.stringify({ title: name, questions: questions }),
      {
        "Content-Type": "application/json",
      }
    );

    router.replace("/Dashboard");
    // resets questions form
    reset();
  };

  const isButtonDisabled = !(
    question.length > 4 &&
    answers[0] &&
    answers[1] &&
    answers[2] &&
    answers[3]
  );

  return (
    <div className={styles.container}>
      {loading && <Spinner overlay />}

      <div className={styles.questionNumber}>
        Question number: {questions.length + 1}
      </div>
      <QuestionForm value={question} setQuestion={handleSetQuestion} />
      <AnswerForm
        value={answers}
        setQuestion={handleSetAnswer}
        setCorrect={handleSetCorrect}
      />

      <div className={styles.btnContainer}>
        <Button
          size="small"
          onClick={handleAddQuestion}
          disabled={isButtonDisabled}
        >
          Add question
        </Button>
        <Button
          size="small"
          danger
          onClick={handleToggleModal}
          disabled={!questions.length}
        >
          Finish
        </Button>
      </div>

      {isModalVisible && (
        <QuizNameForm closeModal={handleToggleModal} addQuiz={handleAddQuiz} />
      )}
    </div>
  );
};

export default newQuiz;
