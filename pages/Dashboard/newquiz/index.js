import styles from "./index.module.scss";

import { useContext } from "react";

import QuizContext from "../../../context/QuizContext";
import AnswerForm from "../../../components/AnswerForm";
import QuestionForm from "../../../components/QuestionForm";
import Button from "../../../components/Button";

const newQuiz = () => {
  const quizContext = useContext(QuizContext);

  return (
    <div className={styles.container}>
      <QuestionForm />
      <AnswerForm />

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
