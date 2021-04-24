import styles from "./index.module.scss";

import { useContext, useState } from "react";

import QuizContext from "../../../context/QuizContext";
import AnswerForm from "../../../components/AnswerForm";
import QuestionForm from "../../../components/QuestionForm";
import Button from "../../../components/Button";

const newQuiz = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const quizContext = useContext(QuizContext);

  const handleSetQuestion = value => {
    setQuestion(value);
  };

  const handleSetAnswer = (value, index) => {
    setAnswers(prev => ({
      ...prev,
      [index]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div class={styles.questionNumber}>Question number: 2</div>
      <QuestionForm value={question} setQuestion={handleSetQuestion} />
      <AnswerForm value={answers} setQuestion={handleSetAnswer} />

      <div className={styles.btnContainer}>
        <Button size="small">Add question</Button>
        <Button size="small" danger>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default newQuiz;
