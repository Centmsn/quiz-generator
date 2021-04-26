import styles from "./index.module.scss";

import { useContext, useState } from "react";

import QuizContext from "../../../context/QuizContext";
import AnswerForm from "../../../components/AnswerForm";
import QuestionForm from "../../../components/QuestionForm";
import Button from "../../../components/Button";

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
  const { questions, addQuestion } = useContext(QuizContext);

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

  const handleAddQuiz = async () => {
    console.log(questions);

    try {
      await fetch("/api/addquiz", {
        method: "POST",
        body: JSON.stringify(questions),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
    console.log("OK");
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
        <Button size="small" danger onClick={handleAddQuiz}>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default newQuiz;
