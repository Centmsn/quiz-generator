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
  const [correct, setCorrect] = useState(0);
  const { questions, addQuestion } = useContext(QuizContext);

  const handleAddQuestion = () => {
    // todo add input validation

    const questionObject = {
      answers,
      question,
      correct,
    };

    addQuestion(questionObject);
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

  const isButtonDisabled = !(
    question &&
    answers[0] &&
    answers[1] &&
    answers[2] &&
    answers[3]
  );

  return (
    <div className={styles.container}>
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
        <Button size="small" danger>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default newQuiz;
